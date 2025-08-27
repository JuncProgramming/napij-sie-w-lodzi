import { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMapMarkerAlt,
  faHeart,
  faCircleChevronDown,
  faCircleChevronUp,
  faCircleChevronLeft,
  faCircleChevronRight,
  faCircleDot,
  faCheckCircle,
  faTimesCircle,
  faQuestionCircle
} from '@fortawesome/free-solid-svg-icons';
import { useFavorites } from '../hooks/useFavorites';

const FilterPanel = ({ onFilterChange, onClose }) => {
  const { favorites } = useFavorites();
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
      id="filter-panel"
      className="absolute top-16 right-4 z-[1000] max-h-[calc(100vh-8rem)] w-80 overflow-y-auto rounded-lg border border-blue-100 bg-blue-50 p-4 shadow-xl transition-colors duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] dark:border-gray-700 dark:bg-gray-800"
      role="dialog"
      aria-labelledby="filter-panel-title"
      aria-modal="true"
      aria-describedby="filter-panel-description">
      <div className="mb-4 flex items-center justify-between">
        <h3
          id="filter-panel-title"
          className="text-lg font-semibold text-gray-800 transition-colors duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] dark:text-white">
          Filtry
        </h3>
        <button
          onClick={clearAllFilters}
          className="cursor-pointer text-sm text-blue-500 transition-colors hover:text-blue-600 focus-visible:ring-2 focus-visible:ring-blue-800 focus-visible:ring-offset-2 focus-visible:outline-none dark:text-blue-400 dark:hover:text-blue-500 dark:focus-visible:ring-blue-50"
          aria-label="Wyczyść wszystkie filtry">
          Wyczyść wszystkie
        </button>
      </div>

      <div id="filter-panel-description" className="sr-only">
        Panel filtrów mapy punktów wody pitnej. Użyj Tab aby nawigować między
        opcjami filtrowania. Filtry są stosowane automatycznie po zmianie.
        Naciśnij Escape aby zamknąć panel.
      </div>

      <div className="mb-4">
        <label
          htmlFor="search-input"
          className="mb-2 block text-sm font-medium text-gray-700 transition-colors duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] dark:text-gray-300">
          Szukaj
        </label>
        <input
          id="search-input"
          type="text"
          value={filters.searchText}
          onChange={e => handleFilterChange('searchText', e.target.value)}
          placeholder="Nazwa lokalizacji..."
          className="w-full rounded-md border border-blue-100 bg-blue-100 px-3 py-2 text-sm text-gray-800 transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] focus:outline-none focus-visible:border-blue-500 focus-visible:ring-1 focus-visible:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          aria-describedby="search-help"
        />
        <div id="search-help" className="sr-only">
          Wpisz nazwę, aby wyszukać konkretny punkt na mapie
        </div>
      </div>

      <fieldset className="mb-4">
        <legend
          id="visibility-legend"
          className="mb-2 block text-sm font-medium text-gray-700 transition-colors duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] dark:text-gray-300">
          Widoczność
        </legend>
        <div
          className="space-y-2"
          role="group"
          aria-labelledby="visibility-legend">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={
                filters.showAll && allRegionsSelected && allStatusesSelected
              }
              onChange={e => handleFilterChange('showAll', e.target.checked)}
              className="mr-2 h-4 w-4 cursor-pointer rounded border-2 border-blue-200 text-blue-600 transition-colors duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] dark:border-gray-600"
              aria-describedby="show-all-desc"
            />
            <FontAwesomeIcon
              icon={faMapMarkerAlt}
              className="mr-2 text-blue-600 transition-colors duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] dark:text-blue-400"
              aria-hidden="true"
            />
            <span className="text-sm text-gray-600 transition-colors duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] dark:text-gray-300">
              Wszystkie źródła
            </span>
            <span id="show-all-desc" className="sr-only">
              Pokaż wszystkie punkty wody pitnej na mapie
            </span>
          </label>

          <label className="flex items-center">
            <input
              type="checkbox"
              checked={filters.showFavoritesOnly}
              onChange={e =>
                handleFilterChange('showFavoritesOnly', e.target.checked)
              }
              className="mr-2 h-4 w-4 cursor-pointer rounded border-2 border-blue-200 text-blue-600 transition-colors duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] dark:border-gray-600"
              aria-describedby="favorites-desc"
            />
            <FontAwesomeIcon
              icon={faHeart}
              className="mr-2 text-rose-500 transition-colors duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]"
              aria-hidden="true"
            />
            <span className="text-sm text-gray-600 transition-colors duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] dark:text-gray-300">
              Tylko ulubione - {favorites.length}
            </span>
            <span id="favorites-desc" className="sr-only">
              Pokaż tylko punkty dodane do ulubionych. Obecnie masz{' '}
              {favorites.length} ulubionych punktów.
            </span>
          </label>
        </div>
      </fieldset>

      <fieldset className="mb-4">
        <legend
          id="working-status-legend"
          className="mb-2 block text-sm font-medium text-gray-700 transition-colors duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] dark:text-gray-300">
          Status działania
        </legend>
        <div
          className="space-y-2"
          role="group"
          aria-labelledby="working-status-legend">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={filters.showWorking}
              onChange={e =>
                handleFilterChange('showWorking', e.target.checked)
              }
              className="mr-2 h-4 w-4 cursor-pointer rounded border-2 border-blue-200 text-blue-600 transition-colors duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] dark:border-gray-600"
              aria-describedby="working-desc"
            />
            <FontAwesomeIcon
              icon={faCheckCircle}
              className="mr-2 text-green-600 transition-colors duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]"
              aria-hidden="true"
            />
            <span className="text-sm text-gray-600 transition-colors duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] dark:text-gray-300">
              Czynne
            </span>
            <span id="working-desc" className="sr-only">
              Pokaż punkty które działają
            </span>
          </label>

          <label className="flex items-center">
            <input
              type="checkbox"
              checked={filters.showNotWorking}
              onChange={e =>
                handleFilterChange('showNotWorking', e.target.checked)
              }
              className="mr-2 h-4 w-4 cursor-pointer rounded border-2 border-blue-200 text-blue-600 transition-colors duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] dark:border-gray-600"
              aria-describedby="not-working-desc"
            />
            <FontAwesomeIcon
              icon={faTimesCircle}
              className="mr-2 text-red-500 transition-colors duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]"
              aria-hidden="true"
            />
            <span className="text-sm text-gray-600 transition-colors duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] dark:text-gray-300">
              Nieczynne
            </span>
            <span id="not-working-desc" className="sr-only">
              Pokaż punkty które nie działają
            </span>
          </label>

          <label className="flex items-center">
            <input
              type="checkbox"
              checked={filters.showUnknownWorking}
              onChange={e =>
                handleFilterChange('showUnknownWorking', e.target.checked)
              }
              className="mr-2 h-4 w-4 cursor-pointer rounded border-2 border-blue-200 text-blue-600 transition-colors duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] dark:border-gray-600"
              aria-describedby="unknown-working-desc"
            />
            <FontAwesomeIcon
              icon={faQuestionCircle}
              className="mr-2 text-gray-400 transition-colors duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]"
              aria-hidden="true"
            />
            <span className="text-sm text-gray-600 transition-colors duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] dark:text-gray-300">
              Brak informacji
            </span>
            <span id="unknown-working-desc" className="sr-only">
              Pokaż punkty o nieznanym statusie działania
            </span>
          </label>
        </div>
      </fieldset>

      <fieldset className="mb-4">
        <legend
          id="accessibility-legend"
          className="mb-2 block text-sm font-medium text-gray-700 transition-colors duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] dark:text-gray-300">
          Dostępność dla osób z niepełnosprawnością
        </legend>
        <div
          className="space-y-2"
          role="group"
          aria-labelledby="accessibility-legend">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={filters.showAccessible}
              onChange={e =>
                handleFilterChange('showAccessible', e.target.checked)
              }
              className="mr-2 h-4 w-4 cursor-pointer rounded border-2 border-blue-200 text-blue-600 transition-colors duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] dark:border-gray-600"
              aria-describedby="accessible-desc"
            />
            <FontAwesomeIcon
              icon={faCheckCircle}
              className="mr-2 text-green-600 transition-colors duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]"
              aria-hidden="true"
            />
            <span className="text-sm text-gray-600 transition-colors duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] dark:text-gray-300">
              Dostosowane
            </span>
            <span id="accessible-desc" className="sr-only">
              Pokaż punkty dostosowane dla osób z niepełnosprawnością
            </span>
          </label>

          <label className="flex items-center">
            <input
              type="checkbox"
              checked={filters.showNotAccessible}
              onChange={e =>
                handleFilterChange('showNotAccessible', e.target.checked)
              }
              className="mr-2 h-4 w-4 cursor-pointer rounded border-2 border-blue-200 text-blue-600 transition-colors duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] dark:border-gray-600"
              aria-describedby="not-accessible-desc"
            />
            <FontAwesomeIcon
              icon={faTimesCircle}
              className="mr-2 text-red-500 transition-colors duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]"
              aria-hidden="true"
            />
            <span className="text-sm text-gray-600 transition-colors duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] dark:text-gray-300">
              Niedostosowane
            </span>
            <span id="not-accessible-desc" className="sr-only">
              Pokaż punkty niedostosowane dla osób z niepełnosprawnością
            </span>
          </label>

          <label className="flex items-center">
            <input
              type="checkbox"
              checked={filters.showUnknownAccessible}
              onChange={e =>
                handleFilterChange('showUnknownAccessible', e.target.checked)
              }
              className="mr-2 h-4 w-4 cursor-pointer rounded border-2 border-blue-200 text-blue-600 transition-colors duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] dark:border-gray-600"
              aria-describedby="unknown-accessible-desc"
            />
            <FontAwesomeIcon
              icon={faQuestionCircle}
              className="mr-2 text-gray-400 transition-colors duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]"
              aria-hidden="true"
            />
            <span className="text-sm text-gray-600 transition-colors duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] dark:text-gray-300">
              Brak informacji
            </span>
            <span id="unknown-accessible-desc" className="sr-only">
              Pokaż punkty o nieznanym statusie dostępności
            </span>
          </label>
        </div>
      </fieldset>

      <fieldset className="mb-4">
        <legend
          id="districts-legend"
          className="mb-2 block text-sm font-medium text-gray-700 transition-colors duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] dark:text-gray-300">
          Dzielnice
        </legend>
        <div
          className="space-y-2"
          role="group"
          aria-labelledby="districts-legend">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={filters.showBaluty}
              onChange={e => handleFilterChange('showBaluty', e.target.checked)}
              className="mr-2 h-4 w-4 cursor-pointer rounded border-2 border-blue-200 text-blue-600 transition-colors duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] dark:border-gray-600"
              aria-describedby="baluty-desc"
            />
            <FontAwesomeIcon
              icon={faCircleChevronUp}
              className="mr-2 text-purple-500 transition-colors duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]"
              aria-hidden="true"
            />
            <span className="text-sm text-gray-600 transition-colors duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] dark:text-gray-300">
              Bałuty
            </span>
            <span id="baluty-desc" className="sr-only">
              Pokaż punkty w dzielnicy Bałuty
            </span>
          </label>

          <label className="flex items-center">
            <input
              type="checkbox"
              checked={filters.showWidzew}
              onChange={e => handleFilterChange('showWidzew', e.target.checked)}
              className="mr-2 h-4 w-4 cursor-pointer rounded border-2 border-blue-200 text-blue-600 transition-colors duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] dark:border-gray-600"
              aria-describedby="widzew-desc"
            />
            <FontAwesomeIcon
              icon={faCircleChevronRight}
              className="mr-2 text-blue-500 transition-colors duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]"
              aria-hidden="true"
            />
            <span className="text-sm text-gray-600 transition-colors duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] dark:text-gray-300">
              Widzew
            </span>
            <span id="widzew-desc" className="sr-only">
              Pokaż punkty w dzielnicy Widzew
            </span>
          </label>

          <label className="flex items-center">
            <input
              type="checkbox"
              checked={filters.showSrodmiescie}
              onChange={e =>
                handleFilterChange('showSrodmiescie', e.target.checked)
              }
              className="mr-2 h-4 w-4 cursor-pointer rounded border-2 border-blue-200 text-blue-600 transition-colors duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] dark:border-gray-600"
              aria-describedby="srodmiescie-desc"
            />
            <FontAwesomeIcon
              icon={faCircleDot}
              className="mr-2 text-green-500 transition-colors duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]"
              aria-hidden="true"
            />
            <span className="text-sm text-gray-600 transition-colors duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] dark:text-gray-300">
              Śródmieście
            </span>
            <span id="srodmiescie-desc" className="sr-only">
              Pokaż punkty w dzielnicy Śródmieście
            </span>
          </label>

          <label className="flex items-center">
            <input
              type="checkbox"
              checked={filters.showPolesie}
              onChange={e =>
                handleFilterChange('showPolesie', e.target.checked)
              }
              className="mr-2 h-4 w-4 cursor-pointer rounded border-2 border-blue-200 text-blue-600 transition-colors duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] dark:border-gray-600"
              aria-describedby="polesie-desc"
            />
            <FontAwesomeIcon
              icon={faCircleChevronLeft}
              className="mr-2 text-amber-500 transition-colors duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]"
              aria-hidden="true"
            />
            <span className="text-sm text-gray-600 transition-colors duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] dark:text-gray-300">
              Polesie
            </span>
            <span id="polesie-desc" className="sr-only">
              Pokaż punkty w dzielnicy Polesie
            </span>
          </label>

          <label className="flex items-center">
            <input
              type="checkbox"
              checked={filters.showGorna}
              onChange={e => handleFilterChange('showGorna', e.target.checked)}
              className="mr-2 h-4 w-4 cursor-pointer rounded border-2 border-blue-200 text-blue-600 transition-colors duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] dark:border-gray-600"
              aria-describedby="gorna-desc"
            />
            <FontAwesomeIcon
              icon={faCircleChevronDown}
              className="mr-2 text-red-500 transition-colors duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]"
              aria-hidden="true"
            />
            <span className="text-sm text-gray-600 transition-colors duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] dark:text-gray-300">
              Górna
            </span>
            <span id="gorna-desc" className="sr-only">
              Pokaż punkty w dzielnicy Górna
            </span>
          </label>
        </div>
      </fieldset>

      <div className="flex gap-2 pt-2">
        <button
          onClick={onClose}
          className="flex-1 cursor-pointer rounded-md bg-blue-100 px-4 py-2 text-sm font-medium text-blue-800 transition-colors duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] hover:bg-blue-200 focus-visible:ring-blue-800 focus-visible:ring-offset-1 focus-visible:outline-none dark:bg-gray-600 dark:text-gray-300 dark:hover:bg-gray-500 dark:focus-visible:ring-blue-50"
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
