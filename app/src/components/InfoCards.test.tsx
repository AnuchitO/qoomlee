import { render, screen } from '@testing-library/react';
import InfoCards from './InfoCards';

it('renders info cards', () => {
  render(<InfoCards />);
  expect(screen.getByText(/flight status/i)).toBeInTheDocument();
  expect(screen.getByText(/baggage rules/i)).toBeInTheDocument();
});
