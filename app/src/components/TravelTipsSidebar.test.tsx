import { render, screen } from '@testing-library/react';
import TravelTipsSidebar from './TravelTipsSidebar';

it('renders travel tips and contact', () => {
  render(<TravelTipsSidebar />);
  expect(screen.getByText(/travel tips/i)).toBeInTheDocument();
  expect(screen.getByText(/qoomlee/i)).toBeInTheDocument();
});
