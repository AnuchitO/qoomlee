import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CheckinForm from './CheckinForm';

describe('CheckinForm', () => {
  describe('Default State', () => {
    it('should render form fields with correct initial state', () => {
      const onSubmit = vi.fn();
      render(<CheckinForm onSubmit={onSubmit} />);

      const lastName = screen.getByLabelText(/last name/i);
      const bookingRef = screen.getByLabelText(/booking reference/i);
      const button = screen.getByRole('button', { name: /retrieve booking/i });

      // Fields should be empty
      expect(lastName).toHaveValue('');
      expect(bookingRef).toHaveValue('');

      // Button should be disabled initially
      expect(button).toBeDisabled();
    });

    it('should enable submit button when both fields are filled', async () => {
      const user = userEvent.setup();
      const onSubmit = vi.fn();
      render(<CheckinForm onSubmit={onSubmit} />);

      const lastName = screen.getByLabelText(/last name/i);
      const bookingRef = screen.getByLabelText(/booking reference/i);
      const button = screen.getByRole('button', { name: /retrieve booking/i });

      await user.type(lastName, 'Huum');
      await user.type(bookingRef, 'abc123');

      await waitFor(() => {
        expect(button).not.toBeDisabled();
      });
    });

    it('should disable submit button when pnr is short than 6 characters', async () => {
      const user = userEvent.setup();
      const onSubmit = vi.fn();
      render(<CheckinForm onSubmit={onSubmit} />);

      const lastName = screen.getByLabelText(/last name/i);
      const bookingRef = screen.getByLabelText(/booking reference/i);
      const button = screen.getByRole('button', { name: /retrieve booking/i });

      await user.type(lastName, 'Huum');
      await user.type(bookingRef, 'abc12');

      await waitFor(() => {
        expect(button).toBeDisabled();
      });
    });

    it('should disable submit button when last name is less than 2 characters', async () => {
      const user = userEvent.setup();
      const onSubmit = vi.fn();
      render(<CheckinForm onSubmit={onSubmit} />);

      const lastName = screen.getByLabelText(/last name/i);
      const bookingRef = screen.getByLabelText(/booking reference/i);
      const button = screen.getByRole('button', { name: /retrieve booking/i });

      await user.type(lastName, 'H');
      await user.type(bookingRef, 'abc123');

      await waitFor(() => {
        expect(button).toBeDisabled();
      });
    });

    it('should disable submit button when last name is empty', async () => {
      const user = userEvent.setup();
      const onSubmit = vi.fn();
      render(<CheckinForm onSubmit={onSubmit} />);

      const lastName = screen.getByLabelText(/last name/i);
      const bookingRef = screen.getByLabelText(/booking reference/i);
      const button = screen.getByRole('button', { name: /retrieve booking/i });

      await user.type(lastName, ' ');
      await user.type(bookingRef, 'abc123');

      await waitFor(() => {
        expect(button).toBeDisabled();
      });
    });

    it('should disable submit button when pnr is empty', async () => {
      const user = userEvent.setup();
      const onSubmit = vi.fn();
      render(<CheckinForm onSubmit={onSubmit} />);

      const lastName = screen.getByLabelText(/last name/i);
      const bookingRef = screen.getByLabelText(/booking reference/i);
      const button = screen.getByRole('button', { name: /retrieve booking/i });

      await user.type(lastName, 'Huum');
      await user.type(bookingRef, ' ');

      await waitFor(() => {
        expect(button).toBeDisabled();
      });
    });
  });

  describe('Form Submission', () => {
    it('should submit with uppercase booking ref and last name', async () => {
      const user = userEvent.setup();
      const onSubmit = vi.fn();
      render(<CheckinForm onSubmit={onSubmit} />);

      const lastName = screen.getByLabelText(/last name/i);
      const bookingRef = screen.getByLabelText(/booking reference/i);
      const button = screen.getByRole('button', { name: /retrieve booking/i });

      await user.type(lastName, 'Huum');
      await user.type(bookingRef, 'abc123');

      await user.click(button);

      await waitFor(() => {
        expect(onSubmit).toHaveBeenCalledTimes(1);
        expect(onSubmit).toHaveBeenCalledWith({
          lastName: 'HUUM',
          bookingRef: 'ABC123'
        });
      });
    });

    it('should not submit when fields are empty', () => {
      const onSubmit = vi.fn();
      render(<CheckinForm onSubmit={onSubmit} />);

      const button = screen.getByRole('button', { name: /retrieve booking/i });

      expect(button).toBeDisabled();

      expect(onSubmit).not.toHaveBeenCalled();
    });
  });
});
