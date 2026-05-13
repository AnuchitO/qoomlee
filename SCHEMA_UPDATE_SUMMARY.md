# Airport Schema Update: From Boolean to Meaningful Values

## Overview
Updated the airport table schema to replace the `is_domestic` boolean column with a more descriptive `flight_type` enum column that uses meaningful values instead of TRUE/FALSE.

## Changes Made

### Original Schema
```sql
INSERT INTO airports (iata_code, name_en, name_th, city_en, country_code, timezone, terminal, is_domestic, is_active) VALUES
  ('KKC','Khon Kaen Airport', ..., TRUE, TRUE),
  ('BKK','Suvarnabhumi Airport', ..., FALSE, TRUE),
```

### Updated Schema
```sql
INSERT INTO airports (iata_code, name_en, name_th, city_en, country_code, timezone, terminal, flight_type, is_active) VALUES
  ('KKC','Khon Kaen Airport', ..., 'domestic', TRUE),
  ('BKK','Suvarnabhumi Airport', ..., 'international', TRUE),
```

## Benefits of the Change

1. **Improved Readability**: Values like 'domestic', 'international', 'mixed' are self-documenting and immediately understandable
2. **Better Data Integrity**: Enum constraint ensures only valid values are stored
3. **Enhanced Flexibility**: Supports 'mixed' for airports that serve both domestic and international flights
4. **Maintainability**: Easier to extend with additional flight types if needed

## Migration Steps

1. Add new `flight_type` column to airports table
2. Populate the new column based on existing `is_domestic` values:
   - TRUE → 'domestic'
   - FALSE → 'international'
   - NULL/other → 'mixed'
3. Add check constraint to ensure valid values
4. Drop the old `is_domestic` column

## SQL Migration Script
```sql
-- Add the new column
ALTER TABLE airports ADD COLUMN flight_type VARCHAR(20);

-- Populate the new column
UPDATE airports
SET flight_type = CASE
    WHEN is_domestic = TRUE THEN 'domestic'
    WHEN is_domestic = FALSE THEN 'international'
    ELSE 'mixed'
END;

-- Add constraints
ALTER TABLE airports ALTER COLUMN flight_type SET NOT NULL;
ALTER TABLE airports ADD CONSTRAINT chk_flight_type
CHECK (flight_type IN ('domestic', 'international', 'mixed'));

-- Remove old column
ALTER TABLE airports DROP COLUMN is_domestic;
```

## Sample Data Mapping
- TRUE (was is_domestic) → 'domestic' (now flight_type)
- FALSE (was is_domestic) → 'international' (now flight_type)
- Future possibility: 'mixed' for dual-purpose airports