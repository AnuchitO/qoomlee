// Email validation
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Phone number validation (basic format)
export const isValidPhoneNumber = (phone: string): boolean => {
  // Remove any spaces, hyphens, or parentheses
  const cleanedPhone = phone.replace(/[\s\-\(\)]/g, '');
  // Basic check: starts with + and followed by digits, or just digits
  const phoneRegex = /^(\+\d{1,3})?\d{8,}$/;
  return phoneRegex.test(cleanedPhone);
};

// Date validation - check if date is not in the past
export const isFutureDate = (dateString: string): boolean => {
  const inputDate = new Date(dateString);
  const today = new Date();
  // Set time to 00:00:00 for accurate comparison
  today.setHours(0, 0, 0, 0);
  inputDate.setHours(0, 0, 0, 0);
  return inputDate >= today;
};

// Date range validation - check if return date is not before departure date
export const isValidDateRange = (departureDate: string, returnDate?: string): boolean => {
  if (!returnDate) return true;

  const depDate = new Date(departureDate);
  const retDate = new Date(returnDate);

  // Set time to 00:00:00 for accurate comparison
  depDate.setHours(0, 0, 0, 0);
  retDate.setHours(0, 0, 0, 0);

  return retDate >= depDate;
};

// Age validation for passengers
export const isValidAge = (birthDateString: string, maxAge: number = 120): boolean => {
  const birthDate = new Date(birthDateString);
  const today = new Date();

  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  return age >= 0 && age <= maxAge;
};

// Credit card number validation (Luhn algorithm)
export const isValidCreditCard = (cardNumber: string): boolean => {
  // Remove spaces and other non-digit characters
  const cleanedCardNumber = cardNumber.replace(/\D/g, '');

  // Basic length check (most cards are 13-19 digits)
  if (cleanedCardNumber.length < 13 || cleanedCardNumber.length > 19) {
    return false;
  }

  // Luhn algorithm
  let sum = 0;
  let isEven = false;

  for (let i = cleanedCardNumber.length - 1; i >= 0; i--) {
    let digit = parseInt(cleanedCardNumber[i], 10);

    if (isEven) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }

    sum += digit;
    isEven = !isEven;
  }

  return sum % 10 === 0;
};

// Expiry date validation for credit cards
export const isValidExpiryDate = (month: string, year: string): boolean => {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1; // Month is 0-indexed

  const expYear = parseInt(year, 10);
  const expMonth = parseInt(month, 10);

  // Basic checks
  if (isNaN(expYear) || isNaN(expMonth)) return false;
  if (expMonth < 1 || expMonth > 12) return false;

  // Check if the card is expired
  if (expYear < currentYear) return false;
  if (expYear === currentYear && expMonth < currentMonth) return false;

  return true;
};

// CVV validation
export const isValidCVV = (cvv: string): boolean => {
  const cvvRegex = /^\d{3,4}$/; // Most cards have 3-digit CVV, American Express has 4
  return cvvRegex.test(cvv);
};

// Passport number validation (basic format check)
export const isValidPassportNumber = (passportNumber: string): boolean => {
  // Passport numbers are typically alphanumeric and 6-9 characters
  const passportRegex = /^[A-Z0-9]{6,9}$/i;
  return passportRegex.test(passportNumber);
};

// PNR validation (6-character alphanumeric)
export const isValidPNR = (pnr: string): boolean => {
  const pnrRegex = /^[A-Z0-9]{6}$/;
  return pnrRegex.test(pnr);
};