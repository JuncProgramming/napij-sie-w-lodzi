import { render, screen } from '@testing-library/react';
import Map from '../../src/components/Map';
import { ThemeProvider } from '../../src/contexts/ThemeContext';
import { FavoritesProvider } from '../../src/contexts/FavoritesContext';
import { SearchProvider } from '../../src/contexts/SearchContext';

describe('Map Component', () => {
  it('should render the map control buttons', () => {
    render(
      <ThemeProvider>
        <FavoritesProvider>
          <SearchProvider>
            <Map />
          </SearchProvider>
        </FavoritesProvider>
      </ThemeProvider>
    );

    const zoomInButton = screen.getByRole('button', { name: /zoom in/i });
    expect(zoomInButton).toBeInTheDocument();
    expect(zoomInButton).toBeVisible();
    expect(zoomInButton).toBeEnabled();

    const zoomOutButton = screen.getByRole('button', { name: /zoom out/i });
    expect(zoomOutButton).toBeInTheDocument();
    expect(zoomOutButton).toBeVisible();
    expect(zoomOutButton).toBeEnabled();

    const filterButton = screen.getByRole('button', {
      name: /otwórz|zamknij panel filtr/i
    });
    expect(filterButton).toBeInTheDocument();
    expect(filterButton).toBeVisible();
    expect(filterButton).toBeEnabled();
  });
});
