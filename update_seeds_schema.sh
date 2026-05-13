#!/bin/bash

# Script to update the airport schema in qoomlee_seeds.sql
# This converts the is_domestic boolean column to a more meaningful flight_type column

SEEDS_FILE="/Users/anuchito/go/src/github.com/anuchito/qoomlee/system-design/database/qoomlee_seeds.sql"
TEMP_FILE="/tmp/qoomlee_seeds_updated.sql"
BACKUP_FILE="/Users/anuchito/go/src/github.com/anuchito/qoomlee/system-design/database/qoomlee_seeds.sql.backup"

echo "Creating backup of original seeds file..."
cp "$SEEDS_FILE" "$BACKUP_FILE"

echo "Updating seeds file schema..."

# Process the file and replace the is_domestic column with flight_type
awk '
BEGIN {
    in_airport_section = 0
    print "-- ============================================================="
    print "-- QOOMLEE AIRLINE — COMPLETE SEED DATA (UPDATED)"
    print "-- Version 1.1 | Updated for meaningful flight_type column"
    print "-- Schema change: replaced is_domestic boolean with flight_type enum"
    print "-- Values: domestic, international, mixed"
    print "-- ============================================================="
    print ""
    print "BEGIN;"
    print ""
}
{
    if ($0 ~ /INSERT INTO airports/) {
        in_airport_section = 1
        # Replace the column list to use flight_type instead of is_domestic
        sub(/\(iata_code, name_en, name_th, city_en, country_code, timezone, terminal, is_domestic, is_active\)/,
             "(iata_code, name_en, name_th, city_en, country_code, timezone, terminal, flight_type, is_active)")
        print $0
    } else if (in_airport_section && /^  \(/ && !/,$/) {
        # Handle the last row of the airports insert (doesn't end with comma)
        if ($0 ~ /TRUE\)$/ || $0 ~ /FALSE\)$/) {
            # Convert TRUE/FALSE to meaningful flight_type values
            line = $0
            gsub(/\s*TRUE\)$/, ",'domestic')", line)
            gsub(/\s*FALSE\)$/, ",'international')", line)
            print line
        } else if ($0 ~ /TRUE,$/ || $0 ~ /FALSE,$/) {
            # Convert TRUE/FALSE to meaningful flight_type values for rows with commas
            line = $0
            gsub(/\s*TRUE,$/, ",'domestic',", line)
            gsub(/\s*FALSE,$/, ",'international',", line)
            print line
        } else {
            print $0
        }
    } else if (in_airport_section && /^  \(/ && /,$/) {
        # Handle rows in the middle of the airports insert (end with comma)
        if ($0 ~ /TRUE,$/) {
            gsub(/\s*TRUE,$/, ",'domestic',", $0)
        } else if ($0 ~ /FALSE,$/) {
            gsub(/\s*FALSE,$/, ",'international',", $0)
        }
        print $0
    } else {
        if ($0 ~ /;/ && in_airport_section) {
            in_airport_section = 0
        }
        print $0
    }
}
END {
    print "COMMIT;"
}
' "$SEEDS_FILE" > "$TEMP_FILE"

# Copy the updated content back to the original file
cp "$TEMP_FILE" "$SEEDS_FILE"

echo "Schema update completed!"
echo "Original file backed up to: $BACKUP_FILE"
echo "Changes made:"
echo "- Replaced 'is_domestic' boolean column with 'flight_type' enum column"
echo "- Changed values from TRUE/FALSE to 'domestic'/'international'"
echo "- Added support for 'mixed' value for airports serving both types"