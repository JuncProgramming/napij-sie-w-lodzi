import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { FavoritesProvider } from './contexts/FavoritesContext.jsx';
import { ThemeProvider } from './contexts/ThemeContext.jsx';
import { SearchProvider } from './contexts/SearchContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <FavoritesProvider>
        <SearchProvider>
          <App />
        </SearchProvider>
      </FavoritesProvider>
    </ThemeProvider>
  </StrictMode>
);
