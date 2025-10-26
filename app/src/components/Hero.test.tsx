import { render, screen } from '@testing-library/react';
import Motto from './Motto';

it('renders hero text', () => {
  render(<Motto />);
  expect(screen.getByText(/online check-in/i)).toBeInTheDocument();
  expect(screen.getByText(/fly smart\. fly qoomlee\./i)).toBeInTheDocument();
});
