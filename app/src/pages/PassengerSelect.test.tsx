import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import PassengerSelect from './PassengerSelect';
import type { Passenger } from '../types/checkin';

// Helper to create test passengers with required fields
const createTestPassenger = (
  firstName: string,
  lastName: string,
  paxType: string,
  seat?: string
): Passenger => ({
  id: `p-${Math.random().toString(36).substr(2, 9)}`,
  firstName,
  lastName,
  paxType: paxType as any,
  seat,
  checkedIn: false,
});

// Test data
const mockPassengers = [
  createTestPassenger('Alex', 'Huum', 'ADT', '12A'),
  createTestPassenger('John', 'Smith', 'INF', '12B'),
  createTestPassenger('Sarah', 'Lee', 'CHD', '12C'),
];

describe('PassengerSelect', () => {
  describe('Default State', () => {
    it('should render passenger list with correct initial state', () => {
      const onNext = vi.fn();
      const onBack = vi.fn();

      render(<PassengerSelect passengers={mockPassengers} onNext={onNext} onBack={onBack} />);

      // Check header
      expect(screen.getByText('Select Passengers')).toBeInTheDocument();
      expect(screen.getByText('Choose passengers for check-in')).toBeInTheDocument();

      // Verify all passengers are rendered with correct details
      mockPassengers.forEach(passenger => {
        const fullName = `${passenger.firstName} ${passenger.lastName}`;
        expect(screen.getByText(fullName)).toBeInTheDocument();
        expect(screen.getByText(passenger.paxType)).toBeInTheDocument();
        if (passenger.seat) {
          expect(screen.getByText(`Seat ${passenger.seat}`)).toBeInTheDocument();
        }
      });

      // Verify initial button states
      expect(screen.getByRole('button', { name: /continue/i })).toBeDisabled();
      expect(screen.getByRole('button', { name: /back/i })).toBeEnabled();
    });

    it('should not show any passenger cards when no passengers are provided', () => {
      const onNext = vi.fn();
      const onBack = vi.fn();

      render(<PassengerSelect passengers={[]} onNext={onNext} onBack={onBack} />);

      // Verify no passenger cards are rendered
      // TODO: change it to expect(screen.getByText('No passengers found')).toBeInTheDocument();
      expect(screen.queryByTestId(/passenger-\d+/)).not.toBeInTheDocument();

      // Verify the header and description are still shown
      expect(screen.getByText('Select Passengers')).toBeInTheDocument();
      expect(screen.getByText('Choose passengers for check-in')).toBeInTheDocument();
    });
  });

  describe('Selection', () => {
    it('should toggle passenger selection when clicked', async () => {
      const onNext = vi.fn();
      const onBack = vi.fn();
      const user = userEvent.setup();

      render(<PassengerSelect passengers={mockPassengers} onNext={onNext} onBack={onBack} />);

      // Click first passenger - using testid since the name is split across multiple text nodes
      const firstPassenger = screen.getByTestId('passenger-0');
      await user.click(firstPassenger);

      // Verify selection
      expect(firstPassenger.closest('button')).toHaveClass('border-sky-500');

      // Click again to deselect
      await user.click(firstPassenger);
      expect(firstPassenger.closest('button')).not.toHaveClass('border-sky-500');
    });

    it('should select all passengers when "Select All" is clicked', async () => {
      const onNext = vi.fn();
      const onBack = vi.fn();
      const user = userEvent.setup();

      render(<PassengerSelect passengers={mockPassengers} onNext={onNext} onBack={onBack} />);

      // Click "Select All"
      const selectAllButton = screen.getByText('Select All');
      await user.click(selectAllButton);

      // Verify all passengers are selected - using testid instead of text content
      mockPassengers.forEach((_, index) => {
        const element = screen.getByTestId(`passenger-${index}`);
        expect(element).toHaveClass('border-sky-500');
      });

      // Click "Clear All"
      const clearAllButton = screen.getByText('Clear All');
      await user.click(clearAllButton);

      // Verify all passengers are deselected - using testid instead of text content
      mockPassengers.forEach((_, index) => {
        const element = screen.getByTestId(`passenger-${index}`);
        expect(element).not.toHaveClass('border-sky-500');
      });
    });
  });

  describe('Navigation', () => {
    it('should call onBack when back button is clicked', async () => {
      const onNext = vi.fn();
      const onBack = vi.fn();
      const user = userEvent.setup();

      render(<PassengerSelect passengers={mockPassengers} onNext={onNext} onBack={onBack} />);

      const backButton = screen.getByRole('button', { name: /back/i });
      await user.click(backButton);

      expect(onBack).toHaveBeenCalledTimes(1);
    });

    it('should call onNext with selected passengers when continue is clicked', async () => {
      const onNext = vi.fn();
      const onBack = vi.fn();
      const user = userEvent.setup();

      render(<PassengerSelect passengers={mockPassengers} onNext={onNext} onBack={onBack} />);

      // Select first passenger - using testid since the name is split across multiple text nodes
      const firstPassenger = screen.getByTestId('passenger-0');
      await user.click(firstPassenger);

      // Click continue
      const continueButton = screen.getByRole('button', { name: /continue/i });
      await user.click(continueButton);

      expect(onNext).toHaveBeenCalledTimes(1);
      expect(onNext).toHaveBeenCalledWith([mockPassengers[0]]);
    });

    it('should disable continue button when no passengers are selected', () => {
      const onNext = vi.fn();
      const onBack = vi.fn();

      render(<PassengerSelect passengers={mockPassengers} onNext={onNext} onBack={onBack} />);

      const continueButton = screen.getByRole('button', { name: /continue/i });
      expect(continueButton).toBeDisabled();
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty passenger list', () => {
      const onNext = vi.fn();
      const onBack = vi.fn();
      render(<PassengerSelect passengers={[]} onNext={onNext} onBack={onBack} />);

      expect(screen.getByText('Select Passengers')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /continue/i })).toBeDisabled();
    });

    it('should handle single passenger', async () => {
      const user = userEvent.setup();
      const onNext = vi.fn();
      const onBack = vi.fn();
      const singlePassenger = [mockPassengers[0]];

      render(<PassengerSelect passengers={singlePassenger} onNext={onNext} onBack={onBack} />);

      const alexCard = screen.getByText('Alex Huum').closest('button');
      await user.click(alexCard!);

      await waitFor(() => {
        expect(screen.getByRole('button', { name: /continue/i })).not.toBeDisabled();
      });
    });

    it('should handle select all functionality', async () => {
      const user = userEvent.setup();
      const onNext = vi.fn();
      const onBack = vi.fn();

      render(<PassengerSelect passengers={mockPassengers} onNext={onNext} onBack={onBack} />);

      const selectAllButton = screen.getByRole('button', { name: /select all/i });
      await user.click(selectAllButton);

      await waitFor(() => {
        expect(screen.getByRole('button', { name: /continue/i })).not.toBeDisabled();
        expect(screen.getByRole('button', { name: /clear all/i })).toBeInTheDocument();
      });
    });

    it('should deselect all passengers when Clear All is clicked', async () => {
      const user = userEvent.setup();
      const onNext = vi.fn();
      const onBack = vi.fn();
      render(<PassengerSelect passengers={mockPassengers} onNext={onNext} onBack={onBack} />);

      const selectAllButton = screen.getByRole('button', { name: /select all/i });
      await user.click(selectAllButton);

      await waitFor(() => {
        expect(screen.getByRole('button', { name: /clear all/i })).toBeInTheDocument();
      });

      const clearAllButton = screen.getByRole('button', { name: /clear all/i });
      await user.click(clearAllButton);

      await waitFor(() => {
        expect(screen.getByRole('button', { name: /select all/i })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /continue/i })).toBeDisabled();
      });
    });
  });

  describe('Navigation', () => {
    it('should call onNext with selected passengers when Continue is clicked', async () => {
      const user = userEvent.setup();
      const onNext = vi.fn();
      const onBack = vi.fn();
      render(<PassengerSelect passengers={mockPassengers} onNext={onNext} onBack={onBack} />);

      const alexCard = screen.getByText('Alex Huum').closest('button');
      await user.click(alexCard!);

      const continueButton = screen.getByRole('button', { name: /continue/i });
      await user.click(continueButton);

      await waitFor(() => {
        expect(onNext).toHaveBeenCalledTimes(1);
        expect(onNext).toHaveBeenCalledWith([mockPassengers[0]]);
      });
    });

    it('should call onNext with multiple selected passengers', async () => {
      const user = userEvent.setup();
      const onNext = vi.fn();
      const onBack = vi.fn();
      render(<PassengerSelect passengers={mockPassengers} onNext={onNext} onBack={onBack} />);

      const selectAllButton = screen.getByRole('button', { name: /select all/i });
      await user.click(selectAllButton);

      const continueButton = screen.getByRole('button', { name: /continue/i });
      await user.click(continueButton);

      await waitFor(() => {
        expect(onNext).toHaveBeenCalledTimes(1);
        expect(onNext).toHaveBeenCalledWith(mockPassengers);
      });
    });

    it('should call onBack when Back button is clicked', async () => {
      const user = userEvent.setup();
      const onNext = vi.fn();
      const onBack = vi.fn();
      render(<PassengerSelect passengers={mockPassengers} onNext={onNext} onBack={onBack} />);

      const backButton = screen.getByRole('button', { name: /back/i });
      await user.click(backButton);

      expect(onBack).toHaveBeenCalledTimes(1);
    });

    it('should not call onNext when Continue is clicked without selection', () => {
      const onNext = vi.fn();
      const onBack = vi.fn();
      render(<PassengerSelect passengers={mockPassengers} onNext={onNext} onBack={onBack} />);

      const continueButton = screen.getByRole('button', { name: /continue/i });
      expect(continueButton).toBeDisabled();
      expect(onNext).not.toHaveBeenCalled();
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty passenger list', () => {
      const onNext = vi.fn();
      const onBack = vi.fn();
      render(<PassengerSelect passengers={[]} onNext={onNext} onBack={onBack} />);

      expect(screen.getByText('Select Passengers')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /continue/i })).toBeDisabled();
    });

    it('should handle single passenger', async () => {
      const user = userEvent.setup();
      const onNext = vi.fn();
      const onBack = vi.fn();
      const singlePassenger = [mockPassengers[0]];

      render(<PassengerSelect passengers={singlePassenger} onNext={onNext} onBack={onBack} />);

      const alexCard = screen.getByText('Alex Huum').closest('button');
      await user.click(alexCard!);

      const continueButton = screen.getByRole('button', { name: /continue/i });
      await user.click(continueButton);

      await waitFor(() => {
        expect(onNext).toHaveBeenCalledWith(singlePassenger);
      });
    });

    it('should handle passengers without seats', () => {
      const onNext = vi.fn();
      const onBack = vi.fn();
      const passengersWithoutSeats = [
        createTestPassenger('Alex', 'Huum', 'ADT'), // No seat provided
        createTestPassenger('John', 'Smith', 'INF', '12B') // With seat
      ];

      render(<PassengerSelect passengers={passengersWithoutSeats} onNext={onNext} onBack={onBack} />);

      // The first passenger should not show a seat
      const alexCard = screen.getByTestId('passenger-0');
      expect(alexCard).toHaveTextContent('Alex Huum');
      expect(alexCard).toHaveTextContent('No seat assigned');

      // The second passenger should show their seat
      const johnCard = screen.getByTestId('passenger-1');
      expect(johnCard).toHaveTextContent('John Smith');
      expect(johnCard).toHaveTextContent('Seat 12B');
    });
  });
});
