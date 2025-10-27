import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { ModalProvider } from './components/ModalProvider';
import { BrowserRouter } from 'react-router-dom';
import { CheckinProvider } from './context/CheckinContext';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ModalProvider>
        <CheckinProvider>
          <App />
        </CheckinProvider>
      </ModalProvider>
    </BrowserRouter>
  </StrictMode>
);

