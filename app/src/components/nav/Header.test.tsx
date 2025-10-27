import { render, screen, fireEvent } from '@testing-library/react';
import Header from './Header';

it('toggles mobile menu', () => {
  render(<Header />);
  const toggle = screen.getByRole('button', { name: /profile menu/i });
  expect(screen.queryByRole('link', { name: /profile/i })).not.toBeInTheDocument();
  fireEvent.click(toggle);
  expect(screen.getByRole('link', { name: /profile/i })).toBeInTheDocument();
  fireEvent.click(toggle);
  expect(screen.queryByRole('link', { name: /profile/i })).not.toBeInTheDocument();
});
