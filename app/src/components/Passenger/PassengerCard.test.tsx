import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import PassengerCard from './PassengerCard';
import type { Passenger } from '../../types/checkin';

describe('PassengerCard', () => {
  const mockPassenger: Passenger = {
    id: '1',
    firstName: 'John',
    lastName: 'Doe',
    paxType: 'ADT' as any,
    seat: '10A',
    checkedIn: false,
  };

  const mockOnToggle = vi.fn();

  const renderComponent = (props = {}) => {
    return render(
      <PassengerCard
        passenger={mockPassenger}
        isSelected={false}
        onToggle={mockOnToggle}
        index={0}
        {...props}
      />
    );
  };

  it('renders passenger information correctly', () => {
    renderComponent();

    expect(screen.getByTestId('passenger-0')).toBeInTheDocument();
    expect(screen.getByText('ADT')).toBeInTheDocument();
    expect(screen.getByText('Seat 10A')).toBeInTheDocument();
  });

  it('calls onToggle when clicked', () => {
    renderComponent();
    const card = screen.getByTestId('passenger-0');

    fireEvent.click(card);
    expect(mockOnToggle).toHaveBeenCalledTimes(1);
  });

  it('applies selected styles when isSelected is true', () => {
    renderComponent({ isSelected: true });
    const card = screen.getByTestId('passenger-0');

    expect(card).toHaveClass('border-sky-500');
    expect(card).toHaveClass('bg-sky-50/50');
    expect(screen.getByText('John Doe')).toHaveClass('text-sky-900');
  });

  it('applies unselected styles when isSelected is false', () => {
    renderComponent({ isSelected: false });
    const card = screen.getByTestId('passenger-0');

    expect(card).toHaveClass('border-slate-200');
    expect(card).toHaveClass('bg-white');
    expect(screen.getByText('John Doe')).toHaveClass('text-slate-900');
  });

  it('shows checkmark when selected', () => {
    renderComponent({ isSelected: true });
    const checkmark = document.querySelector('.absolute.top-0.right-0');

    expect(checkmark).toHaveClass('scale-100');
    expect(checkmark).toHaveClass('opacity-100');
  });

  it('hides checkmark when not selected', () => {
    renderComponent({ isSelected: false });
    const checkmark = document.querySelector('.absolute.top-0.right-0');

    expect(checkmark).toHaveClass('scale-50');
    expect(checkmark).toHaveClass('opacity-0');
  });

  it('shows "No seat assigned" when seat is not provided', () => {
    renderComponent({
      passenger: {
        ...mockPassenger,
        seat: undefined,
      },
    });

    expect(screen.getByText('No seat assigned')).toBeInTheDocument();
  });

  it('uses the correct test ID with index', () => {
    renderComponent({ index: 5 });
    expect(screen.getByTestId('passenger-5')).toBeInTheDocument();
  });
});
