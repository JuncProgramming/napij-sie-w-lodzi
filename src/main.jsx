import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { SidebarProvider } from './contexts/SidebarContext';
import { FavoritesProvider } from './contexts/FavoritesContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SidebarProvider>
      <FavoritesProvider>
        <App />
      </FavoritesProvider>
    </SidebarProvider>
  </StrictMode>
);
