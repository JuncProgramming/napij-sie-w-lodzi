import { render, screen } from '@testing-library/react';
import FilterPanel from '../../src/components/filters/FilterPanel';
import { FavoritesProvider } from '../../src/contexts/FavoritesContext';
import { SearchProvider } from '../../src/contexts/SearchContext';
import { expect } from 'vitest';

describe('FilterPanel Component', () => {
  const defaultFilters = {
    showAll: true,
    showFavoritesOnly: false,
    showBaluty: true,
    showWidzew: true,
    showSrodmiescie: true,
    showPolesie: true,
    showGorna: true,
    showWorking: true,
    showNotWorking: true,
    showUnknownWorking: true,
    showAccessible: true,
    showNotAccessible: true,
    showUnknownAccessible: true,
    searchText: ''
  };

  it('should render the filter panel', () => {
    render(
      <FavoritesProvider>
        <SearchProvider>
          <FilterPanel
            filters={defaultFilters}
            onFilterChange={vi.fn()}
            onClose={vi.fn()}
          />
        </SearchProvider>
      </FavoritesProvider>
    );

    const filterPanel = screen.getByRole('dialog');
    expect(filterPanel).toBeInTheDocument();
    expect(filterPanel).toBeVisible();

    const textbox = screen.getByRole('textbox');
    expect(textbox).toBeInTheDocument();
    expect(textbox).toBeVisible();
    expect(textbox).toBeEnabled();
    expect(textbox).toHaveValue('');

    const filterCheckboxes = screen.getAllByRole('checkbox');
    expect(filterCheckboxes.length).toBe(13);

    const closeButton = screen.getByRole('button', {
      name: /zamknij/i
    });
    expect(closeButton).toBeInTheDocument();
    expect(closeButton).toBeVisible();
    expect(closeButton).toBeEnabled();
  });
});
