import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CheckinForm from './CheckinForm';

it('submits with uppercase booking ref and validates fields', async () => {
  const user = userEvent.setup();
  const onSubmit = vi.fn();
  render(<CheckinForm onSubmit={onSubmit} />);

  const lastName = screen.getByLabelText(/last name/i);
  const bookingRef = screen.getByLabelText(/booking reference/i);
  const button = screen.getByRole('button', { name: /retrieve booking/i });

  // Initially disabled
  expect(button).toBeDisabled();

  await user.type(lastName, 'Huum');
  await user.type(bookingRef, 'abc123');

  await waitFor(() => {
    expect(button).not.toBeDisabled();
  });

  await user.click(button);

  await waitFor(() => {
    expect(onSubmit).toHaveBeenCalledWith({ lastName: 'HUUM', bookingRef: 'ABC123' });
  });
});
