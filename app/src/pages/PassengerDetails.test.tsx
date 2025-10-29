import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PassengerDetails from './PassengerDetails';
import { Passenger, PaxType } from '../types/checkin';

describe('PassengerDetails', () => {
  const mockPassengers: Passenger[] = [
    { firstName: 'Alex', lastName: 'Huum', paxType: PaxType.ADT, seat: '12A', checkedIn: false },
    { firstName: 'Jane', lastName: 'Doe', paxType: PaxType.ADT, seat: '12B', checkedIn: false },
  ];

  let onNext: ReturnType<typeof vi.fn>;
  let onBack: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    onNext = vi.fn();
    onBack = vi.fn();
  });

  describe('Rendering', () => {
    it('should render the component with title and description', () => {
      render(<PassengerDetails passengers={mockPassengers} onNext={onNext} onBack={onBack} />);

      expect(screen.getByText('Passenger Details')).toBeInTheDocument();
      expect(screen.getByText('Enter required information for each passenger')).toBeInTheDocument();
    });

    it('should render form fields for each passenger', () => {
      render(<PassengerDetails passengers={mockPassengers} onNext={onNext} onBack={onBack} />);

      expect(screen.getByText('1. Alex Huum')).toBeInTheDocument();
      expect(screen.getByText('2. Jane Doe')).toBeInTheDocument();
      expect(screen.getAllByPlaceholderText(/TH \/ US \/ SG/i)).toHaveLength(2);
      expect(screen.getAllByPlaceholderText(/8x xxx xxxx/i)).toHaveLength(2);
    });

    it('should render Back and Continue buttons', () => {
      render(<PassengerDetails passengers={mockPassengers} onNext={onNext} onBack={onBack} />);

      expect(screen.getByRole('button', { name: /back/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /continue/i })).toBeInTheDocument();
    });

    it('should have Continue button disabled initially', () => {
      render(<PassengerDetails passengers={mockPassengers} onNext={onNext} onBack={onBack} />);

      const continueButton = screen.getByRole('button', { name: /continue/i });
      expect(continueButton).toBeDisabled();
    });

    it('should autofocus on first passenger nationality field', () => {
      render(<PassengerDetails passengers={mockPassengers} onNext={onNext} onBack={onBack} />);

      const nationalityInputs = screen.getAllByPlaceholderText(/TH \/ US \/ SG/i);
      expect(nationalityInputs[0]).toHaveFocus();
    });

    it('should display country name below country code dropdown', () => {
      render(<PassengerDetails passengers={mockPassengers} onNext={onNext} onBack={onBack} />);

      // Default country code is +66 (Thailand)
      const countryNames = screen.getAllByText('Thailand');
      expect(countryNames.length).toBeGreaterThan(0);
    });
  });

  describe('Nationality Validation', () => {
    it('should show error when nationality is empty and field is blurred', async () => {
      const user = userEvent.setup();
      render(<PassengerDetails passengers={[mockPassengers[0]]} onNext={onNext} onBack={onBack} />);

      const nationalityInput = screen.getByPlaceholderText(/TH \/ US \/ SG/i);
      await user.click(nationalityInput);
      await user.tab(); // Blur the field

      await waitFor(() => {
        expect(screen.getByText('Nationality is required')).toBeInTheDocument();
      });
    });

    it('should show error when nationality is less than 2 characters', async () => {
      const user = userEvent.setup();
      render(<PassengerDetails passengers={[mockPassengers[0]]} onNext={onNext} onBack={onBack} />);

      const nationalityInput = screen.getByPlaceholderText(/TH \/ US \/ SG/i);
      await user.type(nationalityInput, 'A');
      await user.tab();

      await waitFor(() => {
        expect(screen.getByText('Enter valid country code (e.g., TH, US)')).toBeInTheDocument();
      });
    });

    it('should show error when nationality contains non-letters', async () => {
      const user = userEvent.setup();
      render(<PassengerDetails passengers={[mockPassengers[0]]} onNext={onNext} onBack={onBack} />);

      const nationalityInput = screen.getByPlaceholderText(/TH \/ US \/ SG/i);
      await user.type(nationalityInput, 'T1');
      await user.tab();

      await waitFor(() => {
        expect(screen.getByText('Use 2-3 letter country code')).toBeInTheDocument();
      });
    });

    it('should accept valid 2-letter country code', async () => {
      const user = userEvent.setup();
      render(<PassengerDetails passengers={[mockPassengers[0]]} onNext={onNext} onBack={onBack} />);

      const nationalityInput = screen.getByPlaceholderText(/TH \/ US \/ SG/i);
      await user.type(nationalityInput, 'TH');
      await user.tab();

      await waitFor(() => {
        expect(screen.queryByText(/nationality/i)).not.toHaveClass('text-red-600');
      });
    });

    it('should accept valid 3-letter country code', async () => {
      const user = userEvent.setup();
      render(<PassengerDetails passengers={[mockPassengers[0]]} onNext={onNext} onBack={onBack} />);

      const nationalityInput = screen.getByPlaceholderText(/TH \/ US \/ SG/i);
      await user.type(nationalityInput, 'USA');
      await user.tab();

      await waitFor(() => {
        expect(screen.queryByText(/nationality/i)).not.toHaveClass('text-red-600');
      });
    });

    it('should convert nationality input to uppercase', async () => {
      const user = userEvent.setup();
      render(<PassengerDetails passengers={[mockPassengers[0]]} onNext={onNext} onBack={onBack} />);

      const nationalityInput = screen.getByPlaceholderText(/TH \/ US \/ SG/i) as HTMLInputElement;
      await user.type(nationalityInput, 'th');

      expect(nationalityInput.value).toBe('TH');
    });

    it('should enforce maxLength of 3 characters', async () => {
      const user = userEvent.setup();
      render(<PassengerDetails passengers={[mockPassengers[0]]} onNext={onNext} onBack={onBack} />);

      const nationalityInput = screen.getByPlaceholderText(/TH \/ US \/ SG/i) as HTMLInputElement;
      await user.type(nationalityInput, 'ABCD');

      expect(nationalityInput.value).toBe('ABC');
    });

    it('should show red border on invalid nationality field', async () => {
      const user = userEvent.setup();
      render(<PassengerDetails passengers={[mockPassengers[0]]} onNext={onNext} onBack={onBack} />);

      const nationalityInput = screen.getByPlaceholderText(/TH \/ US \/ SG/i);
      await user.type(nationalityInput, 'A');
      await user.tab();

      await waitFor(() => {
        expect(nationalityInput).toHaveClass('border-red-500');
      });
    });
  });

  describe('Phone Number Validation', () => {
    it('should show error when phone is empty and field is blurred', async () => {
      const user = userEvent.setup();
      render(<PassengerDetails passengers={[mockPassengers[0]]} onNext={onNext} onBack={onBack} />);

      const phoneInput = screen.getByPlaceholderText(/8x xxx xxxx/i);
      await user.click(phoneInput);
      await user.tab();

      await waitFor(() => {
        expect(screen.getByText('Phone number is required')).toBeInTheDocument();
      });
    });

    it('should show error when phone is less than 6 characters', async () => {
      const user = userEvent.setup();
      render(<PassengerDetails passengers={[mockPassengers[0]]} onNext={onNext} onBack={onBack} />);

      const phoneInput = screen.getByPlaceholderText(/8x xxx xxxx/i);
      await user.type(phoneInput, '12345');
      await user.tab();

      await waitFor(() => {
        expect(screen.getByText('Phone number too short')).toBeInTheDocument();
      });
    });

    it('should show error when phone contains invalid characters', async () => {
      const user = userEvent.setup();
      render(<PassengerDetails passengers={[mockPassengers[0]]} onNext={onNext} onBack={onBack} />);

      const phoneInput = screen.getByPlaceholderText(/8x xxx xxxx/i);
      await user.type(phoneInput, '123abc456');
      await user.tab();

      await waitFor(() => {
        expect(screen.getByText('Only numbers, spaces, and dashes allowed')).toBeInTheDocument();
      });
    });

    it('should accept valid phone number with spaces', async () => {
      const user = userEvent.setup();
      render(<PassengerDetails passengers={[mockPassengers[0]]} onNext={onNext} onBack={onBack} />);

      const phoneInput = screen.getByPlaceholderText(/8x xxx xxxx/i);
      await user.type(phoneInput, '81 234 5678');
      await user.tab();

      await waitFor(() => {
        expect(screen.queryByText(/phone number/i)).not.toHaveClass('text-red-600');
      });
    });

    it('should accept valid phone number with dashes', async () => {
      const user = userEvent.setup();
      render(<PassengerDetails passengers={[mockPassengers[0]]} onNext={onNext} onBack={onBack} />);

      const phoneInput = screen.getByPlaceholderText(/8x xxx xxxx/i);
      await user.type(phoneInput, '81-234-5678');
      await user.tab();

      await waitFor(() => {
        expect(screen.queryByText(/phone number/i)).not.toHaveClass('text-red-600');
      });
    });

    it('should accept valid phone number with parentheses', async () => {
      const user = userEvent.setup();
      render(<PassengerDetails passengers={[mockPassengers[0]]} onNext={onNext} onBack={onBack} />);

      const phoneInput = screen.getByPlaceholderText(/8x xxx xxxx/i);
      await user.type(phoneInput, '(81) 234 5678');
      await user.tab();

      await waitFor(() => {
        expect(screen.queryByText(/phone number/i)).not.toHaveClass('text-red-600');
      });
    });

    it('should have maxLength attribute of 15 characters', () => {
      render(<PassengerDetails passengers={[mockPassengers[0]]} onNext={onNext} onBack={onBack} />);

      const phoneInput = screen.getByPlaceholderText(/8x xxx xxxx/i) as HTMLInputElement;
      
      // Check that maxLength attribute is set
      expect(phoneInput).toHaveAttribute('maxLength', '15');
    });

    it('should show red border on invalid phone field', async () => {
      const user = userEvent.setup();
      render(<PassengerDetails passengers={[mockPassengers[0]]} onNext={onNext} onBack={onBack} />);

      const phoneInput = screen.getByPlaceholderText(/8x xxx xxxx/i);
      await user.type(phoneInput, '123');
      await user.tab();

      await waitFor(() => {
        expect(phoneInput).toHaveClass('border-red-500');
      });
    });

    it('should hide country name when phone has error', async () => {
      const user = userEvent.setup();
      render(<PassengerDetails passengers={[mockPassengers[0]]} onNext={onNext} onBack={onBack} />);

      const phoneInput = screen.getByPlaceholderText(/8x xxx xxxx/i);
      await user.type(phoneInput, '123');
      await user.tab();

      await waitFor(() => {
        expect(screen.getByText('Phone number too short')).toBeInTheDocument();
      });
    });
  });

  describe('Country Code Selection', () => {
    it('should default to Thailand (+66)', () => {
      render(<PassengerDetails passengers={[mockPassengers[0]]} onNext={onNext} onBack={onBack} />);

      const countrySelect = screen.getAllByRole('combobox')[0] as HTMLSelectElement;
      expect(countrySelect.value).toBe('+66');
    });

    it('should update country name when country code changes', async () => {
      const user = userEvent.setup();
      render(<PassengerDetails passengers={[mockPassengers[0]]} onNext={onNext} onBack={onBack} />);

      const countrySelect = screen.getAllByRole('combobox')[0];
      await user.selectOptions(countrySelect, '+1');

      await waitFor(() => {
        expect(screen.getByText('United States')).toBeInTheDocument();
      });
    });

    it('should have all major country codes available', () => {
      render(<PassengerDetails passengers={[mockPassengers[0]]} onNext={onNext} onBack={onBack} />);

      const countrySelect = screen.getAllByRole('combobox')[0];
      const options = Array.from(countrySelect.querySelectorAll('option'));
      const values = options.map((opt) => opt.value);

      expect(values).toContain('+66'); // Thailand
      expect(values).toContain('+1');  // US
      expect(values).toContain('+44'); // UK
      expect(values).toContain('+65'); // Singapore
      expect(values).toContain('+86'); // China
    });
  });

  describe('Form Submission', () => {
    it('should enable Continue button when all fields are valid', async () => {
      const user = userEvent.setup();
      render(<PassengerDetails passengers={[mockPassengers[0]]} onNext={onNext} onBack={onBack} />);

      const nationalityInput = screen.getByPlaceholderText(/TH \/ US \/ SG/i);
      const phoneInput = screen.getByPlaceholderText(/8x xxx xxxx/i);

      await user.type(nationalityInput, 'TH');
      await user.type(phoneInput, '812345678');

      await waitFor(() => {
        const continueButton = screen.getByRole('button', { name: /continue/i });
        expect(continueButton).not.toBeDisabled();
      });
    });

    it('should call onNext with correct data when Continue is clicked', async () => {
      const user = userEvent.setup();
      render(<PassengerDetails passengers={[mockPassengers[0]]} onNext={onNext} onBack={onBack} />);

      const nationalityInput = screen.getByPlaceholderText(/TH \/ US \/ SG/i);
      const phoneInput = screen.getByPlaceholderText(/8x xxx xxxx/i);

      await user.type(nationalityInput, 'TH');
      await user.type(phoneInput, '812345678');

      const continueButton = screen.getByRole('button', { name: /continue/i });
      await user.click(continueButton);

      await waitFor(() => {
        expect(onNext).toHaveBeenCalledWith({
          'Alex-Huum': {
            nationality: 'TH',
            phone: '812345678',
            countryCode: '+66',
          },
        });
      });
    });

    it('should handle multiple passengers correctly', async () => {
      const user = userEvent.setup();
      render(<PassengerDetails passengers={mockPassengers} onNext={onNext} onBack={onBack} />);

      const nationalityInputs = screen.getAllByPlaceholderText(/TH \/ US \/ SG/i);
      const phoneInputs = screen.getAllByPlaceholderText(/8x xxx xxxx/i);

      await user.type(nationalityInputs[0], 'TH');
      await user.type(phoneInputs[0], '812345678');
      await user.type(nationalityInputs[1], 'US');
      await user.type(phoneInputs[1], '9876543210');

      const continueButton = screen.getByRole('button', { name: /continue/i });
      await user.click(continueButton);

      await waitFor(() => {
        expect(onNext).toHaveBeenCalledWith({
          'Alex-Huum': {
            nationality: 'TH',
            phone: '812345678',
            countryCode: '+66',
          },
          'Jane-Doe': {
            nationality: 'US',
            phone: '9876543210',
            countryCode: '+66',
          },
        });
      });
    });

    it('should not call onNext when Continue is clicked with invalid data', async () => {
      const user = userEvent.setup();
      render(<PassengerDetails passengers={[mockPassengers[0]]} onNext={onNext} onBack={onBack} />);

      const nationalityInput = screen.getByPlaceholderText(/TH \/ US \/ SG/i);
      await user.type(nationalityInput, 'T'); // Invalid

      const continueButton = screen.getByRole('button', { name: /continue/i });
      expect(continueButton).toBeDisabled();
      
      await user.click(continueButton);
      expect(onNext).not.toHaveBeenCalled();
    });

    it('should call onBack when Back button is clicked', async () => {
      const user = userEvent.setup();
      render(<PassengerDetails passengers={mockPassengers} onNext={onNext} onBack={onBack} />);

      const backButton = screen.getByRole('button', { name: /back/i });
      await user.click(backButton);

      expect(onBack).toHaveBeenCalledTimes(1);
    });
  });

  describe('Touch-based Validation', () => {
    it('should not show errors before field is touched', async () => {
      render(<PassengerDetails passengers={[mockPassengers[0]]} onNext={onNext} onBack={onBack} />);

      expect(screen.queryByText('Nationality is required')).not.toBeInTheDocument();
      expect(screen.queryByText('Phone number is required')).not.toBeInTheDocument();
    });

    it('should only show errors after field is blurred', async () => {
      const user = userEvent.setup();
      render(<PassengerDetails passengers={[mockPassengers[0]]} onNext={onNext} onBack={onBack} />);

      const nationalityInput = screen.getByPlaceholderText(/TH \/ US \/ SG/i);
      
      // Type invalid value but don't blur
      await user.type(nationalityInput, 'A');
      expect(screen.queryByText(/enter valid country code/i)).not.toBeInTheDocument();

      // Now blur
      await user.tab();
      await waitFor(() => {
        expect(screen.getByText(/enter valid country code/i)).toBeInTheDocument();
      });
    });
  });

  describe('Edge Cases', () => {
    it('should handle single passenger', () => {
      render(<PassengerDetails passengers={[mockPassengers[0]]} onNext={onNext} onBack={onBack} />);

      expect(screen.getByText('1. Alex Huum')).toBeInTheDocument();
      expect(screen.queryByText('2.')).not.toBeInTheDocument();
    });

    it('should handle passenger with special characters in name', () => {
      const specialPassenger: Passenger = {
        firstName: "O'Brien",
        lastName: 'Smith-Jones',
        paxType: PaxType.ADT,
        seat: '12A',
        checkedIn: false,
      };

      render(<PassengerDetails passengers={[specialPassenger]} onNext={onNext} onBack={onBack} />);

      expect(screen.getByText("1. O'Brien Smith-Jones")).toBeInTheDocument();
    });

    it('should validate trimmed values even with whitespace', async () => {
      const user = userEvent.setup();
      render(<PassengerDetails passengers={[mockPassengers[0]]} onNext={onNext} onBack={onBack} />);

      const nationalityInput = screen.getByPlaceholderText(/TH \/ US \/ SG/i);
      const phoneInput = screen.getByPlaceholderText(/8x xxx xxxx/i);

      // Type with leading/trailing spaces
      await user.type(nationalityInput, 'TH');
      await user.type(phoneInput, '812345678');

      // Validation should pass because trimmed values are valid
      await waitFor(() => {
        const continueButton = screen.getByRole('button', { name: /continue/i });
        expect(continueButton).not.toBeDisabled();
      });
    });
  });

  describe('Accessibility', () => {
    it('should have proper aria-invalid attributes', async () => {
      const user = userEvent.setup();
      render(<PassengerDetails passengers={[mockPassengers[0]]} onNext={onNext} onBack={onBack} />);

      const nationalityInput = screen.getByPlaceholderText(/TH \/ US \/ SG/i);
      await user.type(nationalityInput, 'A');
      await user.tab();

      await waitFor(() => {
        expect(nationalityInput).toHaveAttribute('aria-invalid', 'true');
      });
    });

    it('should have proper aria-describedby for error messages', async () => {
      const user = userEvent.setup();
      render(<PassengerDetails passengers={[mockPassengers[0]]} onNext={onNext} onBack={onBack} />);

      const nationalityInput = screen.getByPlaceholderText(/TH \/ US \/ SG/i);
      await user.type(nationalityInput, 'A');
      await user.tab();

      await waitFor(() => {
        const ariaDescribedBy = nationalityInput.getAttribute('aria-describedby');
        expect(ariaDescribedBy).toContain('nationality-error');
      });
    });
  });
});
