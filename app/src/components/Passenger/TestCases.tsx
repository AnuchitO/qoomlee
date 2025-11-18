import { useState } from 'react';
import type { Passenger, PassengerExtraDetails } from '../../types/checkin';

type TestCase = {
  name: string;
  nationality: string;
  phone: string;
  countryCode: string;
};

type TestCasesProps = {
  passengers: Passenger[];
  getPassengerKey: (passenger: Passenger) => string;
  updateDetail: (passengerKey: string, field: keyof PassengerExtraDetails, value: string) => void;
};

export const TestCases = ({
  passengers,
  getPassengerKey,
  updateDetail,
}: TestCasesProps) => {
  const testCases: TestCase[] = [
    { name: 'Case 1: Thailand', nationality: 'TH', phone: '811234567', countryCode: '+66' },
    { name: 'Case 2: United States', nationality: 'US', phone: '5551234567', countryCode: '+1' },
    { name: 'Case 3: Singapore', nationality: 'SG', phone: '91234567', countryCode: '+65' },
  ];

  const [selectedIndices, setSelectedIndices] = useState<Record<string, number>>({});

  const handleSelect = (passengerKey: string, index: number) => {
    setSelectedIndices(prev => ({
      ...prev,
      [passengerKey]: index
    }));

    const testCase = testCases[index];
    updateDetail(passengerKey, 'nationality', testCase.nationality);
    updateDetail(passengerKey, 'phone', testCase.phone);
    updateDetail(passengerKey, 'countryCode', testCase.countryCode);
  };

  return (
    <div className="bg-amber-50 p-2 rounded-lg border border-amber-100">
      <p className="text-xs text-amber-800 font-medium mb-1">Test Cases</p>
      <div className="flex space-x-2">
        {passengers.map((passenger) => {
          const key = getPassengerKey(passenger);
          return (
            <div key={key} className="flex flex-col items-center">
              <span className="text-2xs text-amber-700">
                {passenger.firstName[0]}{passenger.lastName[0]}
              </span>
              <div className="flex space-x-1">
                {testCases.map((testCase, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => handleSelect(key, index)}
                    className={`px-1.5 py-0.5 text-xs font-medium rounded-md transition-colors ${
                      selectedIndices[key] === index
                        ? 'bg-amber-500 text-white hover:bg-amber-600'
                        : 'bg-amber-100 text-amber-800 hover:bg-amber-200'
                    }`}
                    title={testCase.name}
                  >
                    {testCase.nationality}
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// This component is only for development and will be tree-shaken in production
export default process.env.NODE_ENV === 'development' ? TestCases : () => null;
