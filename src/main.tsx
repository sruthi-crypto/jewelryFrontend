import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import './index.css';
import App from './App.tsx';
import { BrowserRouter } from 'react-router-dom';

// Apply saved theme on startup (default: light)
const savedTheme = localStorage.getItem('lumina_theme') || 'light';
if (savedTheme === 'dark') document.documentElement.classList.add('dark');
else document.documentElement.classList.remove('dark');

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>,
);
