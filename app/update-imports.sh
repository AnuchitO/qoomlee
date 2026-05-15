#!/bin/bash

# Update imports in files
find src -type f \( -name "*.tsx" -o -name "*.ts" \) -exec sed -i '' 's|from "\.\./components/CheckinForm"|from "../components/CheckinFlow/CheckinForm"|g' {} \;
find src -type f \( -name "*.tsx" -o -name "*.ts" \) -exec sed -i '' 's|from "\.\./components/PassengerCard"|from "../components/PassengerDetails/PassengerCard"|g' {} \;
find src -type f \( -name "*.tsx" -o -name "*.ts" \) -exec sed -i '' 's|from "\.\./components/ModalProvider"|from "../components/Layout/ModalProvider"|g' {} \;
find src -type f \( -name "*.tsx" -o -name "*.ts" \) -exec sed -i '' 's|from "\.\./components/TravelTipsSidebar"|from "../components/CheckinFlow/TravelTipsSidebar"|g' {} \;
find src -type f \( -name "*.tsx" -o -name "*.ts" \) -exec sed -i '' 's|from "\.\./components/PhoneInput"|from "../components/PassengerDetails/PhoneInput/PhoneInput"|g' {} \;
find src -type f \( -name "*.tsx" -o -name "*.ts" \) -exec sed -i '' 's|from "\.\./components/nav/|from "../components/Layout/nav/|g' {} \;
