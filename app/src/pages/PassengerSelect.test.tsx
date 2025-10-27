import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PassengerSelect from './PassengerSelect';
import type { Passenger } from '../types/checkin';
import { PaxType } from '../types/checkin';

const mockPassengers: Passenger[] = [
    { firstName: 'Alex', lastName: 'Huum', paxType: PaxType.ADT, seat: '12A', checkedIn: false },
    { firstName: 'John', lastName: 'Smith', paxType: PaxType.INF, seat: '12B', checkedIn: false },
    { firstName: 'Sarah', lastName: 'Lee', paxType: PaxType.CHD, seat: '12C', checkedIn: false },
];

describe('PassengerSelect', () => {
    describe('Default State', () => {
        it('should render passenger list with correct initial state', () => {
            const onNext = vi.fn();
            const onBack = vi.fn();
            render(<PassengerSelect passengers={mockPassengers} onNext={onNext} onBack={onBack} />);

            expect(screen.getByText('Select Passengers')).toBeInTheDocument();
            expect(screen.getByText('Choose passengers for check-in')).toBeInTheDocument();

            expect(screen.getByText('Alex Huum')).toBeInTheDocument();
            expect(screen.getByText('John Smith')).toBeInTheDocument();
            expect(screen.getByText('Sarah Lee')).toBeInTheDocument();
        });

        it('should display passenger details correctly', () => {
            const onNext = vi.fn();
            const onBack = vi.fn();
            render(<PassengerSelect passengers={mockPassengers} onNext={onNext} onBack={onBack} />);

            expect(screen.getByText(PaxType.ADT)).toBeInTheDocument();
            expect(screen.getByText(PaxType.CHD)).toBeInTheDocument();
            expect(screen.getByText(PaxType.INF)).toBeInTheDocument();
            expect(screen.getByText('Seat 12A')).toBeInTheDocument();
            expect(screen.getByText('Seat 12B')).toBeInTheDocument();
            expect(screen.getByText('Seat 12C')).toBeInTheDocument();
        });

        it('should have Continue button disabled when no passengers selected', () => {
            const onNext = vi.fn();
            const onBack = vi.fn();
            render(<PassengerSelect passengers={mockPassengers} onNext={onNext} onBack={onBack} />);

            const continueButton = screen.getByRole('button', { name: /continue/i });
            expect(continueButton).toBeDisabled();
        });

        it('should render Back button when onBack is provided', () => {
            const onNext = vi.fn();
            const onBack = vi.fn();
            render(<PassengerSelect passengers={mockPassengers} onNext={onNext} onBack={onBack} />);

            expect(screen.getByRole('button', { name: /back/i })).toBeInTheDocument();
        });
    });

    describe('Passenger Selection', () => {
        it('should select passenger when card is clicked', async () => {
            const user = userEvent.setup();
            const onNext = vi.fn();
            const onBack = vi.fn();
            render(<PassengerSelect passengers={mockPassengers} onNext={onNext} onBack={onBack} />);

            const alexCard = screen.getByText('Alex Huum').closest('button');
            await user.click(alexCard!);

            await waitFor(() => {
                expect(screen.getByRole('button', { name: /continue/i })).not.toBeDisabled();
            });
        });

        it('should deselect passenger when selected card is clicked again', async () => {
            const user = userEvent.setup();
            const onNext = vi.fn();
            const onBack = vi.fn();
            render(<PassengerSelect passengers={mockPassengers} onNext={onNext} onBack={onBack} />);

            const alexCard = screen.getByText('Alex Huum').closest('button');

            await user.click(alexCard!);
            await waitFor(() => {
                expect(screen.getByRole('button', { name: /continue/i })).not.toBeDisabled();
            });

            await user.click(alexCard!);
            await waitFor(() => {
                expect(screen.getByRole('button', { name: /continue/i })).toBeDisabled();
            });
        });

        it('should select multiple passengers', async () => {
            const user = userEvent.setup();
            const onNext = vi.fn();
            const onBack = vi.fn();
            render(<PassengerSelect passengers={mockPassengers} onNext={onNext} onBack={onBack} />);

            const alexCard = screen.getByText('Alex Huum').closest('button');
            const johnCard = screen.getByText('John Smith').closest('button');

            await user.click(alexCard!);
            await user.click(johnCard!);

            await waitFor(() => {
                expect(screen.getByRole('button', { name: /continue/i })).not.toBeDisabled();
            });
        });
    });

    describe('Select All Functionality', () => {
        it('should show Select All button initially', () => {
            const onNext = vi.fn();
            const onBack = vi.fn();
            render(<PassengerSelect passengers={mockPassengers} onNext={onNext} onBack={onBack} />);

            expect(screen.getByRole('button', { name: /select all/i })).toBeInTheDocument();
        });

        it('should select all passengers when Select All is clicked', async () => {
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

        it('should display "No seat assigned" for passengers without seats', () => {
            const onNext = vi.fn();
            const onBack = vi.fn();
            const passengersWithoutSeats: Passenger[] = [
                { firstName: 'Alex', lastName: 'Huum', paxType: PaxType.ADT, seat: null, checkedIn: false },
            ];

            render(<PassengerSelect passengers={passengersWithoutSeats} onNext={onNext} onBack={onBack} />);

            expect(screen.getByText('No seat assigned')).toBeInTheDocument();
        });
    });
});
