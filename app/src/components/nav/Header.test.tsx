import { render, screen, fireEvent } from '@testing-library/react';
import Header from './nav/Header';

it('toggles mobile menu', () => {
  render(<Header />);
  const toggle = screen.getByRole('button', { name: /toggle menu/i });
  expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  fireEvent.click(toggle);
  expect(screen.getByRole('menu')).toBeInTheDocument();
  fireEvent.click(toggle);
  expect(screen.queryByRole('menu')).not.toBeInTheDocument();
});
