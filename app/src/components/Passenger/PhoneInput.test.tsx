import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { PhoneInput } from './PhoneInput';
import { CountryCode } from '../../constants/countryCodes';

describe('PhoneInput', () => {
  const mockCountryCodes: CountryCode[] = [
    { code: '+1', country: 'US', name: 'United States', flag: '🇺🇸' },
    { code: '+44', country: 'GB', name: 'United Kingdom', flag: '🇬🇧' },
    { code: '+66', country: 'TH', name: 'Thailand', flag: '🇹🇭' },
  ];

  const defaultProps = {
    value: '',
    countryCode: '+66',
    countryCodes: mockCountryCodes,
    onChange: vi.fn(),
    onCountryCodeChange: vi.fn(),
    onBlur: vi.fn(),
    error: null,
    'data-testid': 'phone-input',
  };

  const renderComponent = (props = {}) => {
    return render(<PhoneInput {...defaultProps} {...props} />);
  };

  it('renders with default values', () => {
    renderComponent();

    const phoneInput = screen.getByTestId('phone-input');
    const countrySelect = screen.getByTestId('phone-input-country');

    expect(phoneInput).toHaveValue('');
    expect(countrySelect).toHaveValue('+66');
    expect(countrySelect).toHaveTextContent('🇹🇭 +66');
  });

  it('displays all country code options', () => {
    renderComponent();

    const options = screen.getAllByRole('option');
    expect(options).toHaveLength(mockCountryCodes.length);

    mockCountryCodes.forEach((country, index) => {
      expect(options[index]).toHaveValue(country.code);
      expect(options[index]).toHaveTextContent(`${country.flag} ${country.code}`);
    });
  });

  it('calls onChange when phone number is entered', () => {
    renderComponent();

    const phoneInput = screen.getByTestId('phone-input');
    fireEvent.change(phoneInput, { target: { value: '1234567890' } });

    expect(defaultProps.onChange).toHaveBeenCalledWith('1234567890');
  });

  it('calls onCountryCodeChange when country is selected', () => {
    renderComponent();

    const countrySelect = screen.getByTestId('phone-input-country');
    fireEvent.change(countrySelect, { target: { value: '+1' } });

    expect(defaultProps.onCountryCodeChange).toHaveBeenCalledWith('+1');
  });

  it('applies error styles and shows error message when error is present', () => {
    const errorMessage = 'Invalid phone number';
    renderComponent({ error: errorMessage });

    const phoneInput = screen.getByTestId('phone-input');
    const errorElement = screen.getByText(errorMessage);

    expect(phoneInput).toHaveClass('border-red-500');
    expect(phoneInput).toHaveAttribute('aria-invalid', 'true');
    expect(errorElement).toBeInTheDocument();
  });

  it('calls onBlur when input loses focus', () => {
    renderComponent();

    const phoneInput = screen.getByTestId('phone-input');
    fireEvent.blur(phoneInput);

    expect(defaultProps.onBlur).toHaveBeenCalledTimes(1);
  });

  it('respects maxLength attribute', () => {
    renderComponent();

    const phoneInput = screen.getByTestId('phone-input');
    expect(phoneInput).toHaveAttribute('maxLength', '15');
  });

  it('associates error message with input for accessibility', () => {
    const errorMessage = 'Invalid phone number';
    const id = 'phone-field';

    renderComponent({
      error: errorMessage,
      id,
    });

    const phoneInput = screen.getByTestId('phone-input');
    const errorElement = screen.getByText(errorMessage);

    expect(phoneInput).toHaveAttribute('aria-describedby', `${id}-error`);
    expect(errorElement).toHaveAttribute('id', `${id}-error`);
  });
});
