import { renderHook, act } from '@testing-library/react-hooks';
import { usePassengerForm } from '../usePassengerForm';

describe('usePassengerForm', () => {
  const mockPassengers = [
    { id: '1', firstName: 'John', lastName: 'Doe' },
    { id: '2', firstName: 'Jane', lastName: 'Smith' },
  ];

  it('should initialize with default values', () => {
    const { result } = renderHook(() => usePassengerForm(mockPassengers));

    expect(result.current.details).toEqual({
      '1': { nationality: '', phone: '', countryCode: '+66' },
      '2': { nationality: '', phone: '', countryCode: '+66' },
    });
  });

  it('should update passenger details', () => {
    const { result } = renderHook(() => usePassengerForm(mockPassengers));

    act(() => {
      result.current.updateDetail('1', 'nationality', 'US');
    });

    expect(result.current.details['1'].nationality).toBe('US');
  });

  it('should validate nationality field', () => {
    const { result } = renderHook(() => usePassengerForm(mockPassengers));

    // Initial state - no error
    expect(result.current.getFieldError('1', 'nationality')).toBeNull();

    // Mark as touched
    act(() => {
      result.current.setFieldTouched('1', 'nationality');
    });

    // Empty value
    expect(result.current.getFieldError('1', 'nationality')).toBe('Nationality is required');

    // Too short
    act(() => {
      result.current.updateDetail('1', 'nationality', 'U');
    });
    expect(result.current.getFieldError('1', 'nationality')).toBe('Enter valid country code (e.g., TH, US)');

    // Valid
    act(() => {
      result.current.updateDetail('1', 'nationality', 'US');
    });
    expect(result.current.getFieldError('1', 'nationality')).toBeNull();
  });

  it('should validate phone field', () => {
    const { result } = renderHook(() => usePassengerForm(mockPassengers));

    // Mark as touched
    act(() => {
      result.current.setFieldTouched('1', 'phone');
    });

    // Empty value
    expect(result.current.getFieldError('1', 'phone')).toBe('Phone number is required');

    // Too short
    act(() => {
      result.current.updateDetail('1', 'phone', '123');
    });
    expect(result.current.getFieldError('1', 'phone')).toBe('Phone number too short');

    // Valid
    act(() => {
      result.current.updateDetail('1', 'phone', '1234567890');
    });
    expect(result.current.getFieldError('1', 'phone')).toBeNull();
  });

  it('should check form validity', () => {
    const { result } = renderHook(() => usePassengerForm(mockPassengers));

    // Initially invalid
    expect(result.current.isFormValid).toBe(false);

    // Update to valid values
    act(() => {
      result.current.updateDetail('1', 'nationality', 'US');
      result.current.updateDetail('1', 'phone', '1234567890');
      result.current.updateDetail('2', 'nationality', 'TH');
      result.current.updateDetail('2', 'phone', '9876543210');
    });

    // Should be valid now
    expect(result.current.isFormValid).toBe(true);
  });
});
