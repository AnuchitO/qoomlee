import { useState, useCallback } from 'react';

type PassengerExtraDetails = {
  nationality: string;
  phone: string;
  countryCode: string;
};

type Passenger = {
  firstName: string;
  lastName: string;
};

export const usePassengerForm = (passengers: Passenger[]) => {
  const [details, setDetails] = useState<Record<string, PassengerExtraDetails>>(
    () =>
      Object.fromEntries(
        passengers.map((passenger) => [
          `${passenger.firstName}-${passenger.lastName}`,
          { nationality: '', phone: '', countryCode: '+66' },
        ])
      )
  );

  const [touched, setTouched] = useState<Record<string, { nationality: boolean; phone: boolean }>>(
    {}
  );

  const validateNationality = useCallback((value: string): string | null => {
    const trimmed = value.trim();
    if (trimmed.length === 0) return 'Nationality is required';
    if (trimmed.length < 2) return 'Enter valid country code (e.g., TH, US)';
    if (!/^[A-Z]{2,3}$/.test(trimmed)) return 'Use 2-3 letter country code';
    return null;
  }, []);

  const validatePhone = useCallback((value: string): string | null => {
    const trimmed = value.trim();
    if (trimmed.length === 0) return 'Phone number is required';
    if (trimmed.length < 6) return 'Phone number too short';
    if (trimmed.length > 15) return 'Phone number too long';
    if (!/^[0-9\s\-()]+$/.test(trimmed)) return 'Only numbers, spaces, and dashes allowed';
    return null;
  }, []);

  const getFieldError = useCallback(
    (passengerKey: string, field: 'nationality' | 'phone'): string | null => {
      if (!touched[passengerKey]?.[field]) return null;
      const d = details[passengerKey];
      if (!d) return null;
      return field === 'nationality' ? validateNationality(d.nationality) : validatePhone(d.phone);
    },
    [details, touched, validateNationality, validatePhone]
  );

  const isFormValid = useCallback(() => {
    return passengers.every((passenger) => {
      const key = `${passenger.firstName}-${passenger.lastName}`;
      const d = details[key];
      return d && validateNationality(d.nationality) === null && validatePhone(d.phone) === null;
    });
  }, [details, passengers, validateNationality, validatePhone]);

  const updateDetail = useCallback(
    (passengerKey: string, field: keyof PassengerExtraDetails, value: string) => {
      setDetails((prev) => ({
        ...prev,
        [passengerKey]: {
          ...prev[passengerKey],
          [field]: field === 'nationality' ? value.toUpperCase() : value,
        },
      }));
    },
    []
  );

  const setFieldTouched = useCallback((passengerKey: string, field: 'nationality' | 'phone') => {
    setTouched((prev) => ({
      ...prev,
      [passengerKey]: { ...(prev[passengerKey] || {}), [field]: true },
    }));
  }, []);

  const getPassengerKey = useCallback(
    (passenger: Passenger) => `${passenger.firstName}-${passenger.lastName}`,
    []
  );

  return {
    details,
    touched,
    getFieldError,
    isFormValid: isFormValid(),
    updateDetail,
    setFieldTouched,
    getPassengerKey,
  };
};
