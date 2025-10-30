import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { CheckinFlow } from './CheckinFlow';
import { CheckinProvider } from '../context/CheckinContext';
import { ModalProvider } from '../components/ModalProvider';
import { findBooking } from '../services/checkin';
import { PaxType } from '../types/checkin';

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


  it('submits booking and navigates to passenger select', async () => {
    const user = userEvent.setup();
    const mockBooking = {
      checkinKey: 'test-key-123',
      isEligible: true,
      bookingRef: 'ABC123',
      passengers: [
        { firstName: 'Alex', lastName: 'Huum', paxType: PaxType.ADT, seat: '12A', checkedIn: false },
        { firstName: 'John', lastName: 'Smith', paxType: PaxType.ADT, seat: '12B', checkedIn: false },
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
      expect(screen.getByRole('heading', { name: /select passengers/i })).toBeInTheDocument();
    });
  });

  it('renders check-in header with cancel button', () => {
    renderWithProviders('/checkin/start');

    expect(screen.getByText('Check-in')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /cancel check-in/i })).toBeInTheDocument();
  });

  it('displays current step information in header', () => {
    renderWithProviders('/checkin/start');

    expect(screen.getByText('Find Booking')).toBeInTheDocument();
    expect(screen.getByText(/step 1 of 5/i)).toBeInTheDocument();
  });

  it('renders checkin form on start route', () => {
    renderWithProviders('/checkin/start');

    expect(screen.getByLabelText(/last name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/booking reference/i)).toBeInTheDocument();
  });

  it('shows error modal when booking not found', async () => {
    const user = userEvent.setup();
    const errorMessage = 'Booking not found';

    vi.mocked(findBooking).mockRejectedValueOnce(new Error(errorMessage));

    renderWithProviders('/checkin/start');

    const lastNameInput = screen.getByLabelText(/last name/i);
    const bookingRefInput = screen.getByLabelText(/booking reference/i);
    const submitButton = screen.getByRole('button', { name: /retrieve booking/i });

    await user.type(lastNameInput, 'Invalid');
    await user.type(bookingRefInput, 'INVALID');
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Check-in Error')).toBeInTheDocument();
      expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });
  });

  it('shows error modal with ApiError message', async () => {
    const user = userEvent.setup();
    const errorMessage = 'Invalid booking reference format';

    const apiError = new Error(errorMessage);
    apiError.name = 'ApiError';
    vi.mocked(findBooking).mockRejectedValueOnce(apiError);

    renderWithProviders('/checkin/start');

    const lastNameInput = screen.getByLabelText(/last name/i);
    const bookingRefInput = screen.getByLabelText(/booking reference/i);
    const submitButton = screen.getByRole('button', { name: /retrieve booking/i });

    await user.type(lastNameInput, 'Test');
    await user.type(bookingRefInput, 'INVALID');
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Check-in Error')).toBeInTheDocument();
      expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });
  });

  it('opens cancel confirmation modal when cancel button is clicked', async () => {
    const user = userEvent.setup();
    renderWithProviders('/checkin/start');

    const cancelButton = screen.getByRole('button', { name: /cancel check-in/i });
    await user.click(cancelButton);

    await waitFor(() => {
      expect(screen.getByText('Cancel Check-in?')).toBeInTheDocument();
      expect(screen.getByText(/your progress will be lost/i)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /yes, cancel/i })).toBeInTheDocument();
    });
  });

  it('shows cancel confirmation modal with action buttons', async () => {
    const user = userEvent.setup();
    renderWithProviders('/checkin/start');

    const cancelButton = screen.getByRole('button', { name: /cancel check-in/i });
    await user.click(cancelButton);

    await waitFor(() => {
      expect(screen.getByText('Cancel Check-in?')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /yes, cancel/i })).toBeInTheDocument();
    });
  });

  it('redirects to start if accessing select without booking', () => {
    renderWithProviders('/checkin/select');

    // Should redirect back to start
    expect(screen.getByLabelText(/last name/i)).toBeInTheDocument();
    expect(screen.getByText('Find Booking')).toBeInTheDocument();
  });

  it('redirects to select if accessing details without selected passengers', () => {
    // Accessing details without booking or selected passengers should redirect
    renderWithProviders('/checkin/details');

    // Should redirect to select, which then redirects to start
    expect(screen.getByLabelText(/last name/i)).toBeInTheDocument();
    expect(screen.getByText('Find Booking')).toBeInTheDocument();
  });


  it('displays progress bar with correct percentage', () => {
    const { container } = renderWithProviders('/checkin/start');

    // Step 1 of 5 = 20%
    const progressBar = container.querySelector('[style*="width: 20%"]');
    expect(progressBar).toBeInTheDocument();
  });

  it('navigates from start to passenger select', async () => {
    const user = userEvent.setup();
    const mockBooking = {
      checkinKey: 'test-key-123',
      isEligible: true,
      bookingRef: 'ABC123',
      passengers: [
        { firstName: 'Alex', lastName: 'Huum', paxType: PaxType.ADT, seat: '12A', checkedIn: false },
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

    // Step 1: Submit booking
    const lastNameInput = screen.getByLabelText(/last name/i);
    const bookingRefInput = screen.getByLabelText(/booking reference/i);
    const submitButton = screen.getByRole('button', { name: /retrieve booking/i });

    await user.type(lastNameInput, 'Huum');
    await user.type(bookingRefInput, 'ABC123');
    await user.click(submitButton);

    // Step 2: Should navigate to select passengers
    await waitFor(() => {
      expect(screen.getByRole('heading', { name: /select passengers/i })).toBeInTheDocument();
    });

    // Verify passenger is shown
    expect(screen.getByText('Alex Huum')).toBeInTheDocument();
  });

  it('allows navigation back through the flow', async () => {
    const user = userEvent.setup();
    const mockBooking = {
      checkinKey: 'test-key-123',
      isEligible: true,
      bookingRef: 'ABC123',
      passengers: [
        { firstName: 'Alex', lastName: 'Huum', paxType: PaxType.ADT, seat: '12A', checkedIn: false },
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

    // Navigate to select
    const lastNameInput = screen.getByLabelText(/last name/i);
    const bookingRefInput = screen.getByLabelText(/booking reference/i);
    const submitButton = screen.getByRole('button', { name: /retrieve booking/i });

    await user.type(lastNameInput, 'Huum');
    await user.type(bookingRefInput, 'ABC123');
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: /select passengers/i })).toBeInTheDocument();
    });

    // Go back to start
    const backButton = screen.getByRole('button', { name: /back/i });
    await user.click(backButton);

    await waitFor(() => {
      expect(screen.getByLabelText(/last name/i)).toBeInTheDocument();
      expect(screen.getByText('Find Booking')).toBeInTheDocument();
    });
  });

  it('handles unknown routes by redirecting to start', () => {
    renderWithProviders('/checkin/unknown-route');

    expect(screen.getByLabelText(/last name/i)).toBeInTheDocument();
    expect(screen.getByText('Find Booking')).toBeInTheDocument();
  });

  it('updates step information when navigating', async () => {
    const user = userEvent.setup();
    const mockBooking = {
      checkinKey: 'test-key-123',
      isEligible: true,
      bookingRef: 'ABC123',
      passengers: [
        { firstName: 'Alex', lastName: 'Huum', paxType: PaxType.ADT, seat: '12A', checkedIn: false },
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

    expect(screen.getByText(/step 1 of 5/i)).toBeInTheDocument();
    expect(screen.getByText('Find Booking')).toBeInTheDocument();

    // Navigate to select
    const lastNameInput = screen.getByLabelText(/last name/i);
    const bookingRefInput = screen.getByLabelText(/booking reference/i);
    const submitButton = screen.getByRole('button', { name: /retrieve booking/i });

    await user.type(lastNameInput, 'Huum');
    await user.type(bookingRefInput, 'ABC123');
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: /select passengers/i })).toBeInTheDocument();
    });

    // Verify step updated
    expect(screen.getByText(/step 2 of 5/i)).toBeInTheDocument();
  });
});
