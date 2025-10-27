import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import MobileBottomNav from './MobileBottomNav';

it('renders bottom nav items', () => {
  render(
    <BrowserRouter>
      <MobileBottomNav />
    </BrowserRouter>
  );
  expect(screen.getByText(/home/i)).toBeInTheDocument();
  expect(screen.getByText(/flights/i)).toBeInTheDocument();
  expect(screen.getByText(/check-in/i)).toBeInTheDocument();
  expect(screen.getByText(/booking/i)).toBeInTheDocument();
  expect(screen.getByText(/contact/i)).toBeInTheDocument();
});
