import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ToastContainer } from 'react-toastify';
import { AppProviders } from './AppProviders.jsx';
import ErrorBoundary from './ErrorBoundary.jsx';
import App from './App.jsx'
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
      <AppProviders>
        <ToastContainer />
        <App />
      </AppProviders>
    </ErrorBoundary>
  </StrictMode>,
);
