#!/usr/bin/env bash
# ═══════════════════════════════════════════════════════════════════════
#  Tourism Intelligence & Trusted Local Services Platform — AUTORUN
#  Vallikavu / Kerala Hub
#
#  Usage:  ./autorun.sh            (starts everything)
#          ./autorun.sh --seed     (re-run database seed)
#          ./autorun.sh --stop     (stop backend + frontend)
#          ./autorun.sh --logs     (tail all logs)
#          ./autorun.sh --install  (first-time: deps + db setup)
#
#  This is a RE-RUN script: it starts each service only if it isn't
#  already listening, so it is safe to run repeatedly.
# ═══════════════════════════════════════════════════════════════════════
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
CLIENT="$ROOT/client"
LOGDIR="${LOGDIR:-$ROOT/.autorun}"
mkdir -p "$LOGDIR"

BACKEND_PORT="${BACKEND_PORT:-3001}"
FRONTEND_PORT="${FRONTEND_PORT:-5173}"
PG_SERVICE="postgresql"

BACKEND_LOG="$LOGDIR/backend.log"
FRONTEND_LOG="$LOGDIR/frontend.log"

GREEN='\033[0;32m'; YELLOW='\033[1;33m'; RED='\033[0;31m'; BOLD='\033[1m'; NC='\033[0m'
ok()   { echo -e "${GREEN}✔${NC} $1"; }
info() { echo -e "${YELLOW}➜${NC} $1"; }
fail() { echo -e "${RED}✘${NC} $1"; }

health_ok() { # $1 = url
  curl -sf --max-time 5 "$1" >/dev/null 2>&1
}

port_in_use() { # $1 = port
  (command -v ss >/dev/null && ss -tln 2>/dev/null | grep -q ":$1 ") || \
  (command -v fuser >/dev/null && fuser "$1/tcp" >/dev/null 2>&1)
}

# ────────────────────────────────────────────────────────────────────────
# 1. POSTGRESQL + POSTGIS
# ────────────────────────────────────────────────────────────────────────
start_postgres() {
  echo -e "\n${BOLD}[1/3] PostgreSQL + PostGIS (database)${NC}"
  local ok_pg=0
  if systemctl is-active --quiet "$PG_SERVICE" 2>/dev/null; then
    ok_pg=1
  elif pg_isready -q 2>/dev/null; then
    ok_pg=1
  else
    info "PostgreSQL not running — attempting start..."
    if sudo systemctl start "$PG_SERVICE" 2>/dev/null; then
      ok_pg=1
    else
      info "sudo start failed; trying without sudo..."
      if systemctl start "$PG_SERVICE" 2>/dev/null || pg_isready -q 2>/dev/null; then
        ok_pg=1
      fi
    fi
  fi
  if [ "$ok_pg" = "1" ]; then
    ok "PostgreSQL active ($PG_SERVICE)"
  else
    fail "Could not start PostgreSQL. Run manually:  sudo systemctl start postgresql"
  fi
}

# ────────────────────────────────────────────────────────────────────────
# 2. BACKEND  (Fastify, :3001)
# ────────────────────────────────────────────────────────────────────────
start_backend() {
  echo -e "\n${BOLD}[2/3] Backend API (Fastify, :${BACKEND_PORT})${NC}"

  if health_ok "http://localhost:${BACKEND_PORT}/health"; then
    ok "Backend already healthy on :${BACKEND_PORT}"
    return 0
  fi
  if port_in_use "$BACKEND_PORT"; then
    info "Port :${BACKEND_PORT} busy but unhealthy — killing stale process..."
    fuser -k "${BACKEND_PORT}/tcp" 2>/dev/null || true
    sleep 1
  fi

  if [ ! -f "$ROOT/dist/server.js" ]; then
    info "dist/ missing — running  npm run build ..."
    (cd "$ROOT" && npm run build)
  fi

  info "Starting backend →  $BACKEND_LOG"
  (cd "$ROOT" && nohup npm run start >> "$BACKEND_LOG" 2>&1 &)

  for i in $(seq 1 20); do
    health_ok "http://localhost:${BACKEND_PORT}/health" && { ok "Backend healthy on :${BACKEND_PORT}"; return 0; }
    sleep 1
  done

  fail "Backend not healthy within 20s. Log: $BACKEND_LOG"
  tail -20 "$BACKEND_LOG" || true
  return 1
}

# ────────────────────────────────────────────────────────────────────────
# 3. FRONTEND  (Vite, :5173)
# ────────────────────────────────────────────────────────────────────────
start_frontend() {
  echo -e "\n${BOLD}[3/4] Frontend (Vite + React, :${FRONTEND_PORT})${NC}"

  if [ ! -d "$CLIENT/node_modules" ]; then
    info "client/node_modules missing — installing..."
    (cd "$CLIENT" && npm install)
  fi

  if port_in_use "$FRONTEND_PORT"; then
    ok "Frontend already live on :${FRONTEND_PORT} (skipping)"
    return 0
  fi

  info "Starting frontend →  $FRONTEND_LOG"
  (cd "$CLIENT" && nohup npm run dev >> "$FRONTEND_LOG" 2>&1 &)

  for i in $(seq 1 20); do
    curl -sf -o /dev/null --max-time 5 "http://localhost:${FRONTEND_PORT}" && { ok "Frontend live :${FRONTEND_PORT}"; return 0; }
    sleep 1
  done

  fail "Frontend not responding within 20s. Log: $FRONTEND_LOG"
  tail -20 "$FRONTEND_LOG" || true
  return 1
}

# ────────────────────────────────────────────────────────────────────────
# ────────────────────────────────────────────────────────────────────────
# 4. Summary
# ────────────────────────────────────────────────────────────────────────
summary() {
  echo -e "\n${BOLD}[4/4] Summary${NC}"
  if systemctl is-active --quiet "$PG_SERVICE" 2>/dev/null || pg_isready -q 2>/dev/null; then
    ok "PostgreSQL + PostGIS"
  else
    fail "PostgreSQL"
  fi
  if health_ok "http://localhost:${BACKEND_PORT}/health"; then
    ok "Backend  →  http://localhost:${BACKEND_PORT}  (Swagger: /docs)"
  else
    fail "Backend"
  fi
  if curl -sf -o /dev/null --max-time 5 "http://localhost:${FRONTEND_PORT}"; then
    ok "Frontend →  http://localhost:${FRONTEND_PORT}"
  else
    fail "Frontend"
  fi
  echo -e "\n${GREEN}${BOLD}🎉 Platform ready!  Open:  http://localhost:${FRONTEND_PORT}${NC}"
}

# ────────────────────────────────────────────────────────────────────────
# Flags / main
# ────────────────────────────────────────────────────────────────────────
case "${1:-}" in
  --seed)
    if pg_isready -q; then (cd "$ROOT" && npm run seed 2>&1 | tail -6); else fail "DB not running — start it first."; fi
    ;;
  --stop)
    fuser -k "${BACKEND_PORT}/tcp" 2>/dev/null || true
    fuser -k "${FRONTEND_PORT}/tcp" 2>/dev/null || true
    pkill -f 'dist/server.js' 2>/dev/null || true
    pkill -f 'vite' 2>/dev/null || true
    echo "Stopped backend + frontend. (PostgreSQL left running.)"
    ;;
  --logs)
    echo "Backend:  $BACKEND_LOG"
    echo "Frontend: $FRONTEND_LOG"
    echo "── backend (tail 15) ──"; tail -15 "$BACKEND_LOG" 2>/dev/null || echo "(none)"
    echo "── frontend (tail 15) ──"; tail -15 "$FRONTEND_LOG" 2>/dev/null || echo "(none)"
    ;;
  --install)
    info "Installing root deps + DB setup + seed..."
    (cd "$ROOT" && npm install && npm run db:push && npm run db:generate && npm run seed)
    info "Installing client deps + build..."
    (cd "$CLIENT" && npm install && npm run build)
    echo -e "${GREEN}Install complete. Run  ./autorun.sh  to start everything.${NC}"
    ;;
  *)
    start_postgres
    start_backend
    start_frontend
    summary
    ;;
esac

exit 0
