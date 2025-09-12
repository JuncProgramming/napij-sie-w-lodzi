import { render, screen } from '@testing-library/react';
import Map from '../../src/components/Map';
import { ThemeProvider } from '../../src/contexts/ThemeContext';
import { FavoritesProvider } from '../../src/contexts/FavoritesContext';
import { SearchProvider } from '../../src/contexts/SearchContext';
import { expect } from 'vitest';

describe('Map Component', () => {
  it('should render the map and the control buttons', () => {
    render(
      <ThemeProvider>
        <FavoritesProvider>
          <SearchProvider>
            <Map></Map>
          </SearchProvider>
        </FavoritesProvider>
      </ThemeProvider>
    );

    const zoomInButton = screen.getByRole('button', { name: /Zoom in/i });
    expect(zoomInButton).toBeInTheDocument();
    expect(zoomInButton).toBeVisible();
    expect(zoomInButton).toBeEnabled();

    const zoomOutButton = screen.getByRole('button', { name: /Zoom out/i });
    expect(zoomOutButton).toBeInTheDocument();
    expect(zoomOutButton).toBeVisible();
    expect(zoomOutButton).toBeEnabled();

    const filterButton = screen.getByRole('button', { name: /Otwórz|Zamknij panel filtrów/i });
    expect(filterButton).toBeInTheDocument();
    expect(filterButton).toBeVisible();
    expect(filterButton).toBeEnabled();
  });
});
