-- SCHEMA MIGRATION: Update airport table to replace is_domestic boolean with flight_type enum
-- This provides more meaningful values instead of TRUE/FALSE

-- Step 1: Add the new flight_type column
ALTER TABLE airports ADD COLUMN flight_type VARCHAR(20);

-- Step 2: Populate the new column based on the existing is_domestic values
UPDATE airports
SET flight_type = CASE
    WHEN is_domestic = TRUE THEN 'domestic'
    WHEN is_domestic = FALSE THEN 'international'
    ELSE 'mixed'
END;

-- Step 3: Make the new column NOT NULL and add a check constraint
ALTER TABLE airports ALTER COLUMN flight_type SET NOT NULL;
ALTER TABLE airports ADD CONSTRAINT chk_flight_type
CHECK (flight_type IN ('domestic', 'international', 'mixed'));

-- Step 4: Drop the old is_domestic column
ALTER TABLE airports DROP COLUMN is_domestic;

-- Verification query to confirm the changes
-- SELECT iata_code, name_en, flight_type FROM airports ORDER BY iata_code;