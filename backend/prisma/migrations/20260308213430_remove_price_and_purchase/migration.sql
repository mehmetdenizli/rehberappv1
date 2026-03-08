-- Drop purchases table
DROP TABLE IF EXISTS "purchases";

-- Remove price column from routes
ALTER TABLE "routes" DROP COLUMN IF EXISTS "price";
