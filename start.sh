#!/bin/bash
echo "Starting Backend on port 3001..."
npm run start &
BACKEND_PID=$!

echo "Starting Frontend on port 5173..."
cd client && npm run dev &
FRONTEND_PID=$!

function cleanup {
  echo "Stopping services..."
  kill $BACKEND_PID
  kill $FRONTEND_PID
  exit
}

trap cleanup EXIT

echo "Both services are running! Press Ctrl+C to stop."
wait
