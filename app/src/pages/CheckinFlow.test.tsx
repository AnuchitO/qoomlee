import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { CheckinFlow } from './CheckinFlow';
import { CheckinProvider } from '../context/CheckinContext';
import { ModalProvider } from '../components/ModalProvider';
import { findBooking } from '../services/checkin';
import { vi } from 'vitest';

// Mock the services
vi.mock('../services/checkin', () => ({
  findBooking: vi.fn(),
  ApiError: class ApiError extends Error {
    constructor(message: string) {
      super(message);
      this.name = 'ApiError';
    }
  },
}));

const renderWithProviders = (initialRoute = '/checkin/start') => {
  return render(
    <MemoryRouter initialEntries={[initialRoute]}>
      <ModalProvider>
        <CheckinProvider>
          <CheckinFlow />
        </CheckinProvider>
      </ModalProvider>
    </MemoryRouter>
  );
};

describe('CheckinFlow', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

//   it('renders check-in header with cancel button', () => {
//     renderWithProviders();
    
//     expect(screen.getByText('Check-in')).toBeInTheDocument();
//     expect(screen.getByRole('button', { name: /cancel/i })).toBeInTheDocument();
//   });

//   it('renders checkin form on start route', () => {
//     renderWithProviders('/checkin/start');
    
//     expect(screen.getByLabelText(/last name/i)).toBeInTheDocument();
//     expect(screen.getByLabelText(/booking reference/i)).toBeInTheDocument();
//   });

  it('submits booking and navigates to passenger select', async () => {
    const user = userEvent.setup();
    const mockBooking = {
      checkinKey: 'test-key-123',
      isEligible: true,
      bookingRef: 'ABC123',
      passengers: [
        { firstName: 'Alex', lastName: 'Huum', paxType: 'ADT' as const, seat: '12A', checkedIn: false },
        { firstName: 'John', lastName: 'Smith', paxType: 'ADT' as const, seat: '12B', checkedIn: false },
      ],
      journeys: [
        {
          flightNumber: 'QM123',
          departure: { airport: 'BKK', time: '2024-01-01T10:00:00Z' },
          arrival: { airport: 'SIN', time: '2024-01-01T13:00:00Z' },
          segmentStatus: 'CHECKIN_OPEN' as const,
          marketingCarrier: 'QM',
          operatingCarrier: 'QM',
        },
      ],
    };

    vi.mocked(findBooking).mockResolvedValueOnce(mockBooking);

    renderWithProviders('/checkin/start');

    const lastNameInput = screen.getByLabelText(/last name/i);
    const bookingRefInput = screen.getByLabelText(/booking reference/i);
    const submitButton = screen.getByRole('button', { name: /retrieve booking/i });

    await user.type(lastNameInput, 'Huum');
    await user.type(bookingRefInput, 'ABC123');
    await user.click(submitButton);

    await waitFor(() => {
      expect(findBooking).toHaveBeenCalledWith({
        lastName: 'HUUM',
        bookingRef: 'ABC123',
      });
    });

    await waitFor(() => {
      expect(screen.getByText('Select Passengers')).toBeInTheDocument();
    });
  });

//   it('shows error modal when booking not found', async () => {
//     const user = userEvent.setup();
//     const errorMessage = 'Booking not found';
    
//     vi.mocked(findBooking).mockRejectedValueOnce(new Error(errorMessage));

//     renderWithProviders('/checkin/start');

//     const lastNameInput = screen.getByLabelText(/last name/i);
//     const bookingRefInput = screen.getByLabelText(/booking reference/i);
//     const submitButton = screen.getByRole('button', { name: /retrieve booking/i });

//     await user.type(lastNameInput, 'Invalid');
//     await user.type(bookingRefInput, 'INVALID');
//     await user.click(submitButton);

//     await waitFor(() => {
//       expect(screen.getByText('Check-in Error')).toBeInTheDocument();
//       expect(screen.getByText(errorMessage)).toBeInTheDocument();
//     });
//   });

//   it('navigates back to home when cancel is clicked', async () => {
//     const user = userEvent.setup();
//     renderWithProviders('/checkin/start');

//     const cancelButton = screen.getByRole('button', { name: /cancel/i });
//     await user.click(cancelButton);

//     // Should navigate back to home - check that checkin form is no longer visible
//     await waitFor(() => {
//       expect(screen.queryByLabelText(/last name/i)).not.toBeInTheDocument();
//     });
//   });

//   it('redirects to start if accessing select without booking', () => {
//     renderWithProviders('/checkin/select');
    
//     // Should redirect back to start
//     expect(screen.getByLabelText(/last name/i)).toBeInTheDocument();
//   });

//   it('renders mobile bottom navigation', () => {
//     renderWithProviders();
    
//     // MobileBottomNav should be rendered
//     expect(screen.getByText(/home/i)).toBeInTheDocument();
//     expect(screen.getByText(/flights/i)).toBeInTheDocument();
//   });
});
