import { useState, useEffect, useRef } from 'react';
import { useFavorites } from '../../hooks/useFavorites';
import FilterPanelHeader from './FilterPanelHeader';
import SearchFilter from './SearchFilter';
import VisibilityFilter from './VisibilityFilter';
import StatusFilter from './StatusFilter';
import AccessibilityFilter from './AccessibilityFilter';
import DistrictsFilter from './DistrictsFilter';

const FilterPanel = ({ onFilterChange, onClose }) => {
  const { favorites } = useFavorites();
  const filterPanelRef = useRef(null);

  const [filters, setFilters] = useState({
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
  });

  useEffect(() => {
    onFilterChange(filters);
  }, [filters]);

  const handleFilterChange = (key, value) => {
    setFilters(prev => {
      let newFilters = { ...prev, [key]: value };

      if (key === 'showAll' && value) {
        newFilters = {
          ...newFilters,
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
          showUnknownAccessible: true
        };
      }

      if (key === 'showFavoritesOnly' && value) {
        newFilters = {
          ...newFilters,
          showAll: false
        };
      }

      if (key === 'showAll' && !value) {
        newFilters = {
          ...newFilters,
          showAll: false
        };
      }

      return newFilters;
    });
  };

  const handleSearchChange = searchText => {
    handleFilterChange('searchText', searchText);
  };

  const clearAllFilters = () => {
    setFilters({
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
    });
  };

  const allRegionsSelected =
    filters.showBaluty &&
    filters.showWidzew &&
    filters.showSrodmiescie &&
    filters.showPolesie &&
    filters.showGorna;

  const allStatusesSelected =
    filters.showWorking &&
    filters.showNotWorking &&
    filters.showUnknownWorking &&
    filters.showAccessible &&
    filters.showNotAccessible &&
    filters.showUnknownAccessible;

  return (
    <div
      ref={filterPanelRef}
      id="filter-panel"
      className="transition-a absolute top-16 right-4 z-[1002] max-h-[calc(100vh-8rem)] w-80 overflow-y-auto rounded-lg bg-blue-50 p-4 shadow-xl duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] dark:bg-gray-800"
      role="dialog"
      aria-labelledby="filter-panel-title"
      aria-modal="true"
      aria-describedby="filter-panel-description">
      <FilterPanelHeader onClearAll={clearAllFilters} />

      <div id="filter-panel-description" className="sr-only">
        Panel filtrów mapy punktów wody pitnej. Użyj Tab aby nawigować między
        opcjami filtrowania. Filtry są stosowane automatycznie po zmianie.
        Naciśnij Escape aby zamknąć panel.
      </div>

      <SearchFilter
        searchText={filters.searchText}
        onSearchChange={handleSearchChange}
      />

      <VisibilityFilter
        showAll={filters.showAll}
        showFavoritesOnly={filters.showFavoritesOnly}
        favoritesCount={favorites.length}
        allRegionsSelected={allRegionsSelected}
        allStatusesSelected={allStatusesSelected}
        onFilterChange={handleFilterChange}
      />

      <StatusFilter
        showWorking={filters.showWorking}
        showNotWorking={filters.showNotWorking}
        showUnknownWorking={filters.showUnknownWorking}
        onFilterChange={handleFilterChange}
      />

      <AccessibilityFilter
        showAccessible={filters.showAccessible}
        showNotAccessible={filters.showNotAccessible}
        showUnknownAccessible={filters.showUnknownAccessible}
        onFilterChange={handleFilterChange}
      />

      <DistrictsFilter
        showBaluty={filters.showBaluty}
        showWidzew={filters.showWidzew}
        showSrodmiescie={filters.showSrodmiescie}
        showPolesie={filters.showPolesie}
        showGorna={filters.showGorna}
        onFilterChange={handleFilterChange}
      />

      <div className="flex gap-2 pt-2">
        <button
          onClick={onClose}
          tabIndex={18}
          className="flex-1 cursor-pointer rounded-md bg-blue-100 px-4 py-2 text-sm font-medium text-blue-800 transition-colors duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] hover:bg-blue-200 focus-visible:ring-3 focus-visible:ring-blue-800 focus-visible:outline-none dark:bg-gray-600 dark:text-gray-300 dark:hover:bg-gray-500 dark:focus-visible:ring-3 dark:focus-visible:ring-yellow-400"
          aria-label="Zamknij panel filtrów i wróć do mapy">
          Zamknij
        </button>
      </div>

      <div
        className="mt-2 text-center text-xs text-gray-500 transition-colors duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] dark:text-gray-400"
        aria-live="polite">
        Aktywne filtry będą zastosowane automatycznie
      </div>
    </div>
  );
};

export default FilterPanel;
