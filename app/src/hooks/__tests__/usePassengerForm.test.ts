import { renderHook, act } from '@testing-library/react-hooks';
import { usePassengerForm } from '../usePassengerForm';

describe('usePassengerForm', () => {
  const mockPassengers = [
    { firstName: 'John', lastName: 'Doe' },
    { firstName: 'Jane', lastName: 'Smith' },
  ];

  it('should initialize with default values', () => {
    const { result } = renderHook(() => usePassengerForm(mockPassengers));

    expect(result.current.details).toEqual({
      'John-Doe': { nationality: '', phone: '', countryCode: '+66' },
      'Jane-Smith': { nationality: '', phone: '', countryCode: '+66' },
    });
  });

  it('should update passenger details', () => {
    const { result } = renderHook(() => usePassengerForm(mockPassengers));

    act(() => {
      result.current.updateDetail('John-Doe', 'nationality', 'US');
    });

    expect(result.current.details['John-Doe'].nationality).toBe('US');
  });

  it('should validate nationality field', () => {
    const { result } = renderHook(() => usePassengerForm(mockPassengers));

    // Initial state - no error
    expect(result.current.getFieldError('John-Doe', 'nationality')).toBeNull();

    // Mark as touched
    act(() => {
      result.current.setFieldTouched('John-Doe', 'nationality');
    });

    // Empty value
    expect(result.current.getFieldError('John-Doe', 'nationality')).toBe('Nationality is required');

    // Too short
    act(() => {
      result.current.updateDetail('John-Doe', 'nationality', 'U');
    });
    expect(result.current.getFieldError('John-Doe', 'nationality')).toBe('Enter valid country code (e.g., TH, US)');

    // Valid
    act(() => {
      result.current.updateDetail('John-Doe', 'nationality', 'US');
    });
    expect(result.current.getFieldError('John-Doe', 'nationality')).toBeNull();
  });

  it('should validate phone field', () => {
    const { result } = renderHook(() => usePassengerForm(mockPassengers));

    // Mark as touched
    act(() => {
      result.current.setFieldTouched('John-Doe', 'phone');
    });

    // Empty value
    expect(result.current.getFieldError('John-Doe', 'phone')).toBe('Phone number is required');

    // Too short
    act(() => {
      result.current.updateDetail('John-Doe', 'phone', '123');
    });
    expect(result.current.getFieldError('John-Doe', 'phone')).toBe('Phone number too short');

    // Valid
    act(() => {
      result.current.updateDetail('John-Doe', 'phone', '1234567890');
    });
    expect(result.current.getFieldError('John-Doe', 'phone')).toBeNull();
  });

  it('should check form validity', () => {
    const { result } = renderHook(() => usePassengerForm(mockPassengers));

    // Initially invalid
    expect(result.current.isFormValid).toBe(false);

    // Update to valid values
    act(() => {
      result.current.updateDetail('John-Doe', 'nationality', 'US');
      result.current.updateDetail('John-Doe', 'phone', '1234567890');
      result.current.updateDetail('Jane-Smith', 'nationality', 'TH');
      result.current.updateDetail('Jane-Smith', 'phone', '9876543210');
    });

    // Should be valid now
    expect(result.current.isFormValid).toBe(true);
  });
});
