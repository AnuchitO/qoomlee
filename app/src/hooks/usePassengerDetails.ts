import { useState } from 'react';
import type { Passenger, PassengerExtraDetails } from '../types/checkin';
import { DEFAULT_COUNTRY_CODE } from '../constants/countryCodes';

export const usePassengerDetails = (passengers: Passenger[]) => {
  const [details, setDetails] = useState<Record<string, PassengerExtraDetails>>(
    Object.fromEntries(
      passengers.map((p) => [getPassengerKey(p), { 
        nationality: '', 
        phone: '', 
        countryCode: DEFAULT_COUNTRY_CODE 
      }])
    )
  );

  const [touched, setTouched] = useState<Record<string, { nationality: boolean; phone: boolean }>>({});

  const validateNationality = (value: string): string | null => {
    const trimmed = value.trim();
    if (trimmed.length === 0) return 'Nationality is required';
    if (trimmed.length < 2) return 'Enter valid country code (e.g., TH, US)';
    if (!/^[A-Z]{2,3}$/.test(trimmed)) return 'Use 2-3 letter country code';
    return null;
  };

  const validatePhone = (value: string): string | null => {
    const trimmed = value.trim();
    if (trimmed.length === 0) return 'Phone number is required';
    if (trimmed.length < 6) return 'Phone number too short';
    if (trimmed.length > 15) return 'Phone number too long';
    if (!/^[0-9\s\-()]+$/.test(trimmed)) return 'Only numbers, spaces, and dashes allowed';
    return null;
  };

  const getFieldError = (passengerKey: string, field: 'nationality' | 'phone'): string | null => {
    if (!touched[passengerKey]?.[field]) return null;
    const d = details[passengerKey];
    if (!d) return null;
    return field === 'nationality' 
      ? validateNationality(d.nationality) 
      : validatePhone(d.phone);
  };

  const isFormValid = passengers.every((p) => {
    const k = getPassengerKey(p);
    const d = details[k];
    return d && validateNationality(d.nationality) === null && validatePhone(d.phone) === null;
  });

  const updateDetail = (passengerKey: string, field: keyof PassengerExtraDetails, value: string) => {
    setDetails(prev => ({
      ...prev,
      [passengerKey]: { ...prev[passengerKey], [field]: value }
    }));
  };

  const setFieldTouched = (passengerKey: string, field: 'nationality' | 'phone') => {
    setTouched(prev => ({
      ...prev,
      [passengerKey]: { ...prev[passengerKey], [field]: true }
    }));
  };

  return {
    details,
    touched,
    isFormValid,
    getFieldError,
    updateDetail,
    setFieldTouched,
  };
};

export const getPassengerKey = (p: Passenger) => `${p.firstName}-${p.lastName}`;
