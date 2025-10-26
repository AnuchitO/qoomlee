import { render, screen, fireEvent } from '@testing-library/react';
import CheckinForm from './CheckinForm';

it('submits with uppercase booking ref and validates fields', async () => {
  const onSubmit = vi.fn();
  render(<CheckinForm onSubmit={onSubmit} />);

  const lastName = screen.getByLabelText(/last name/i);
  const bookingRef = screen.getByLabelText(/booking reference/i);
  const button = screen.getByRole('button', { name: /find my booking/i });

  // Initially disabled
  expect(button).toBeDisabled();

  fireEvent.change(lastName, { target: { value: 'Doe' } });
  fireEvent.change(bookingRef, { target: { value: 'abc123' } });

  expect(button).not.toBeDisabled();

  fireEvent.click(button);

  expect(onSubmit).toHaveBeenCalledWith({ lastName: 'Doe', bookingRef: 'ABC123' });
});
