import { format, parseISO } from 'date-fns';

// Format currency according to locale
export const formatCurrency = (amount: number, currency: string = 'USD'): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
  }).format(amount);
};

// Format date in a human-readable format
export const formatDate = (dateString: string, dateFormat: string = 'MMM dd, yyyy'): string => {
  const date = parseISO(dateString);
  return format(date, dateFormat);
};

// Format time in HH:MM format
export const formatTime = (dateString: string): string => {
  const date = parseISO(dateString);
  return format(date, 'HH:mm');
};

// Format duration in hours and minutes
export const formatDuration = (minutes: number): string => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (hours > 0) {
    return `${hours}h ${mins}m`;
  }
  return `${mins}m`;
};

// Format flight number with airline code
export const formatFlightNumber = (flightNumber: string): string => {
  if (flightNumber.length >= 3 && !isNaN(Number(flightNumber.substring(2)))) {
    return `${flightNumber.substring(0, 2)} ${flightNumber.substring(2)}`;
  }
  return flightNumber;
};

// Convert ISO date string to YYYY-MM-DD format for date inputs
export const isoToDateInputFormat = (isoDateString: string): string => {
  const date = parseISO(isoDateString);
  return format(date, 'yyyy-MM-dd');
};

// Generate PNR (Passenger Name Record) - 6-character alphanumeric code
export const generatePNR = (): string => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < 6; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};