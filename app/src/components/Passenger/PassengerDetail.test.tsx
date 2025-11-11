import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { PassengerDetail } from './PassengerDetail';
import { Passenger, PaxType } from '../../types/checkin';

describe('PassengerDetail', () => {
  const mockPassenger: Passenger = {
    firstName: 'John',
    lastName: 'Doe',
    paxType: PaxType.ADT,
    seat: '10A',
    checkedIn: false,
  };

  const mockDetail = {
    nationality: 'TH',
    phone: '1234567890',
    countryCode: '+66',
  };

  const mockHandlers = {
    onNationalityChange: vi.fn(),
    onPhoneChange: vi.fn(),
    onCountryCodeChange: vi.fn(),
    onNationalityBlur: vi.fn(),
    onPhoneBlur: vi.fn(),
  };

  const renderComponent = (props = {}) => {
    return render(
      <PassengerDetail
        passenger={mockPassenger}
        index={0}
        detail={mockDetail}
        nationalityError={null}
        phoneError={null}
        {...mockHandlers}
        {...props}
      />
    );
  };

  it('renders passenger name and details', () => {
    renderComponent();

    expect(screen.getByText('1. John Doe')).toBeInTheDocument();
    expect(screen.getByTestId('nationality-0')).toHaveValue('TH');
    expect(screen.getByTestId('phone-0')).toHaveValue('1234567890');
    expect(screen.getByTestId('countryCode-0')).toHaveValue('+66');
  });

  it('calls onNationalityChange when nationality input changes', () => {
    renderComponent();
    const nationalityInput = screen.getByTestId('nationality-0');

    fireEvent.change(nationalityInput, { target: { value: 'US' } });
    expect(mockHandlers.onNationalityChange).toHaveBeenCalledWith('US');
  });

  it('calls onPhoneChange when phone input changes', () => {
    renderComponent();
    const phoneInput = screen.getByTestId('phone-0');

    fireEvent.change(phoneInput, { target: { value: '9876543210' } });
    expect(mockHandlers.onPhoneChange).toHaveBeenCalledWith('9876543210');
  });

  it('calls onCountryCodeChange when country code changes', () => {
    renderComponent();
    const countryCodeSelect = screen.getByTestId('countryCode-0');

    fireEvent.change(countryCodeSelect, { target: { value: '+1' } });
    expect(mockHandlers.onCountryCodeChange).toHaveBeenCalledWith('+1');
  });

  it('shows error styles when there are errors', () => {
    renderComponent({
      nationalityError: 'Invalid nationality',
      phoneError: 'Invalid phone number',
    });

    const nationalityInput = screen.getByTestId('nationality-0');
    const phoneInput = screen.getByTestId('phone-0');

    expect(nationalityInput).toHaveClass('border-red-500');
    expect(phoneInput).toHaveClass('border-red-500');
  });

  it('calls blur handlers when fields lose focus', () => {
    renderComponent();

    const nationalityInput = screen.getByTestId('nationality-0');
    const phoneInput = screen.getByTestId('phone-0');

    fireEvent.blur(nationalityInput);
    fireEvent.blur(phoneInput);

    expect(mockHandlers.onNationalityBlur).toHaveBeenCalled();
    expect(mockHandlers.onPhoneBlur).toHaveBeenCalled();
  });

  it('auto-focuses the nationality input for the first passenger', () => {
    renderComponent({ index: 0 });
    const nationalityInput = screen.getByTestId('nationality-0');

    expect(nationalityInput).toHaveFocus();
  });

  it('does not auto-focus for non-first passengers', () => {
    renderComponent({ index: 1 });
    const nationalityInput = screen.getByTestId('nationality-1');

    expect(nationalityInput).not.toHaveFocus();
  });
});
