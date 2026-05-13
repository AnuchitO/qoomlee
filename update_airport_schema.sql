-- Update airport table schema to replace is_domestic boolean with flight_type enum
-- This script transforms the existing data to use meaningful values instead of TRUE/FALSE

-- First, let's create a backup of the original structure for reference
/*
Original structure:
INSERT INTO airports (iata_code, name_en, name_th, city_en, country_code, timezone, terminal, is_domestic, is_active) VALUES
  ('KKC','Khon Kaen Airport','ท่าอากาศยานขอนแก่น','Khon Kaen','TH','Asia/Bangkok','1',TRUE,TRUE),
  ('BKK','Suvarnabhumi Airport','ท่าอากาศยานสุวรรณภูมิ','Bangkok','TH','Asia/Bangkok','Qoomlee-T2',FALSE,TRUE),
  ('DMK','Don Mueang International Airport','ท่าอากาศยานดอนเมือง','Bangkok','TH','Asia/Bangkok','1',FALSE,TRUE),
*/

-- Updated structure with meaningful flight_type column
-- Drop and recreate the airports table with the new schema
DROP TABLE IF EXISTS airports_new;

CREATE TABLE airports_new (
    iata_code VARCHAR(10) PRIMARY KEY,
    name_en VARCHAR(255),
    name_th VARCHAR(255),
    city_en VARCHAR(255),
    country_code CHAR(2),
    timezone VARCHAR(50),
    terminal VARCHAR(50),
    flight_type VARCHAR(20) CHECK (flight_type IN ('domestic', 'international', 'mixed')), -- Replaces is_domestic boolean
    is_active BOOLEAN
);

-- Insert data with meaningful flight_type values instead of TRUE/FALSE
INSERT INTO airports_new (iata_code, name_en, name_th, city_en, country_code, timezone, terminal, flight_type, is_active) VALUES
  ('KKC','Khon Kaen Airport','ท่าอากาศยานขอนแก่น','Khon Kaen','TH','Asia/Bangkok','1','domestic',TRUE),
  ('BKK','Suvarnabhumi Airport','ท่าอากาศยานสุวรรณภูมิ','Bangkok','TH','Asia/Bangkok','Qoomlee-T2','international',TRUE),
  ('DMK','Don Mueang International Airport','ท่าอากาศยานดอนเมือง','Bangkok','TH','Asia/Bangkok','1','international',TRUE),
  ('CNX','Chiang Mai International Airport','ท่าอากาศยานเชียงใหม่','Chiang Mai','TH','Asia/Bangkok','1','mixed',TRUE),
  ('HKT','Phuket International Airport','ท่าอากาศยานภูเก็ต','Phuket','TH','Asia/Bangkok','1','mixed',TRUE),
  ('HDY','Hat Yai International Airport','ท่าอากาศยานหาดใหญ่','Hat Yai','TH','Asia/Bangkok','1','domestic',TRUE),
  ('KBV','Krabi Airport','ท่าอากาศยานกระบี่','Krabi','TH','Asia/Bangkok','1','domestic',TRUE),
  ('UTP','U-Tapao International Airport','ท่าอากาศยานอู่ตะเภา','Pattaya','TH','Asia/Bangkok','1','mixed',TRUE),
  ('CEI','Chiang Rai International Airport','ท่าอากาศยานเชียงราย','Chiang Rai','TH','Asia/Bangkok','1','domestic',TRUE),
  ('NST','Nakhon Si Thammarat Airport','ท่าอากาศยานนครศรีธรรมราช','Nakhon Si Thammarat','TH','Asia/Bangkok','1','domestic',TRUE),
  ('PER','Perth Airport','เพิร์ธแอร์พอร์ต','Perth','AU','Australia/Perth','T1','international',TRUE),
  ('MEL','Melbourne Airport','เมลเบิร์นแอร์พอร์ต','Melbourne','AU','Australia/Melbourne','T2','international',TRUE);

-- For a complete migration, you would need to:
-- 1. ALTER TABLE airports ADD COLUMN flight_type VARCHAR(20);
-- 2. UPDATE airports SET flight_type = CASE WHEN is_domestic = TRUE THEN 'domestic' ELSE 'international' END;
-- 3. ALTER TABLE airports DROP COLUMN is_domestic;
-- 4. Optionally add a check constraint: ALTER TABLE airports ADD CONSTRAINT chk_flight_type CHECK (flight_type IN ('domestic', 'international', 'mixed'));

-- Here's the migration SQL that would be used in a real scenario:
/*
ALTER TABLE airports ADD COLUMN flight_type VARCHAR(20);

UPDATE airports
SET flight_type = CASE
    WHEN is_domestic = TRUE THEN 'domestic'
    WHEN is_domestic = FALSE THEN 'international'
    ELSE 'mixed'
END;

ALTER TABLE airports DROP COLUMN is_domestic;

ALTER TABLE airports ADD CONSTRAINT chk_flight_type
CHECK (flight_type IN ('domestic', 'international', 'mixed'));
*/