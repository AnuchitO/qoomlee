import { render, screen } from '@testing-library/react';
import Hero from './Hero';

it('renders hero text', () => {
  render(<Hero />);
  expect(screen.getByText(/online check-in/i)).toBeInTheDocument();
  expect(screen.getByText(/fly smart\. fly qoomlee\./i)).toBeInTheDocument();
});
