import { fireEvent, render, screen } from '@testing-library/react';
import FilterPanel from '../../src/components/filters/FilterPanel';
import { FavoritesProvider } from '../../src/contexts/FavoritesContext';
import { SearchProvider } from '../../src/contexts/SearchContext';
import { expect, it, vi } from 'vitest';

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
    filterCheckboxes.forEach(checkbox => {
      expect(checkbox).toBeInTheDocument();
      expect(checkbox).toBeVisible();
      expect(checkbox).toBeEnabled();
    });

    const closeButton = screen.getByRole('button', {
      name: /zamknij/i
    });
    expect(closeButton).toBeInTheDocument();
    expect(closeButton).toBeVisible();
    expect(closeButton).toBeEnabled();
  });

  it('should render the checkboxes with correct default check state', () => {
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

    const favoritesCheckbox = screen.getByRole('checkbox', {
      name: /ulubione/i
    });
    expect(favoritesCheckbox).toBeInTheDocument();
    expect(favoritesCheckbox).toBeVisible();
    expect(favoritesCheckbox).toBeEnabled();
    expect(favoritesCheckbox).not.toBeChecked();

    const otherCheckboxes = screen
      .getAllByRole('checkbox')
      .filter(checkbox => checkbox !== favoritesCheckbox);
    otherCheckboxes.forEach(checkbox => {
      expect(checkbox).toBeInTheDocument();
      expect(checkbox).toBeVisible();
      expect(checkbox).toBeEnabled();
      expect(checkbox).toBeChecked();
    });
  });

  it('should call onFilterChange when the search text is changed', () => {
    const handleFilterChange = vi.fn();

    render(
      <FavoritesProvider>
        <SearchProvider>
          <FilterPanel
            filters={defaultFilters}
            onFilterChange={handleFilterChange}
            onClose={vi.fn()}
          />
        </SearchProvider>
      </FavoritesProvider>
    );

    const textbox = screen.getByRole('textbox');
    fireEvent.change(textbox, { target: { value: 'test' } });
    expect(handleFilterChange).toHaveBeenCalledTimes(1);
    expect(handleFilterChange).toHaveBeenCalledWith({
      ...defaultFilters,
      searchText: 'test'
    });
  });

  it('should call onFilterChange when a checkbox is toggled', () => {
    const handleFilterChange = vi.fn();

    render(
      <FavoritesProvider>
        <SearchProvider>
          <FilterPanel
            filters={defaultFilters}
            onFilterChange={handleFilterChange}
            onClose={vi.fn()}
          />
        </SearchProvider>
      </FavoritesProvider>
    );

    const checkbox = screen.getByRole('checkbox', {
      name: /wszystkie/i
    });
    fireEvent.click(checkbox);
    expect(handleFilterChange).toHaveBeenCalledTimes(1);
    expect(handleFilterChange).toHaveBeenCalledWith({
      ...defaultFilters,
      showAll: false
    });
  });

  it('should call onClose when the close button is clicked', () => {
    const handleClose = vi.fn();

    render(
      <FavoritesProvider>
        <SearchProvider>
          <FilterPanel
            filters={defaultFilters}
            onFilterChange={vi.fn()}
            onClose={handleClose}
          />
        </SearchProvider>
      </FavoritesProvider>
    );

    const closeButton = screen.getByRole('button', {
      name: /zamknij/i
    });
    fireEvent.click(closeButton);
    expect(handleClose).toHaveBeenCalledTimes(1);
  });
});
