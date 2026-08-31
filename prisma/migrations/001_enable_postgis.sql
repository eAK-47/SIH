-- PostGIS extension setup (run before Prisma migrate)
-- Execute: psql -d tourism_intelligence -f prisma/migrations/001_enable_postgis.sql

CREATE EXTENSION IF NOT EXISTS postgis;

-- Spatial index on the location column
-- This runs AFTER Prisma creates the Place table
CREATE INDEX IF NOT EXISTS "Place_location_gist" ON "Place" USING GIST (location);
