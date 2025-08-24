import { useState, useEffect } from 'react';
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
  }, [filters, onFilterChange]);

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
    filters.showGorna &&
    filters.showWorking &&
    filters.showNotWorking &&
    filters.showUnknownWorking &&
    filters.showAccessible &&
    filters.showNotAccessible &&
    filters.showUnknownAccessible;

  return (
    <div className="absolute top-16 right-4 z-[1000] max-h-[calc(100vh-8rem)] w-80 overflow-y-auto rounded-lg border border-blue-100 bg-blue-50 p-4 shadow-xl transition-colors duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] dark:border-gray-700 dark:bg-gray-800">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-800 transition-colors duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] dark:text-white">
          Filtry
        </h3>
        <button
          onClick={clearAllFilters}
          className="cursor-pointer text-sm text-blue-500 transition-colors hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-500">
          Wyczyść wszystkie
        </button>
      </div>

      <div className="mb-4">
        <label className="mb-2 block text-sm font-medium text-gray-700 transition-colors duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] dark:text-gray-300">
          Szukaj
        </label>
        <input
          type="text"
          value={filters.searchText}
          onChange={e => handleFilterChange('searchText', e.target.value)}
          placeholder="Nazwa lokalizacji..."
          className="w-full rounded-md border border-blue-100 bg-blue-100 px-3 py-2 text-sm transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
        />
      </div>

      <div className="mb-4">
        <label className="mb-2 block text-sm font-medium text-gray-700 transition-colors duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] dark:text-gray-300">
          Widoczność
        </label>
        <div className="space-y-2">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={filters.showAll && allRegionsSelected}
              onChange={e => handleFilterChange('showAll', e.target.checked)}
              className="mr-2 h-4 w-4 cursor-pointer rounded border-blue-200 text-blue-600 transition-colors duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] focus:ring-blue-500 dark:border-gray-600"
            />
            <FontAwesomeIcon
              icon={faMapMarkerAlt}
              className="mr-2 text-blue-600 transition-colors duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] dark:text-blue-400"
            />
            <span className="text-sm text-gray-600 transition-colors duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] dark:text-gray-300">
              Wszystkie źródła
            </span>
          </label>

          <label className="flex items-center">
            <input
              type="checkbox"
              checked={filters.showFavoritesOnly}
              onChange={e =>
                handleFilterChange('showFavoritesOnly', e.target.checked)
              }
              className="mr-2 h-4 w-4 cursor-pointer rounded border-blue-200 text-blue-600 transition-colors duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] focus:ring-blue-500 dark:border-gray-600"
            />
            <FontAwesomeIcon
              icon={faHeart}
              className="mr-2 text-rose-500 transition-colors duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]"
            />
            <span className="text-sm text-gray-600 transition-colors duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] dark:text-gray-300">
              Tylko ulubione - {favorites.length}
            </span>
          </label>
        </div>
      </div>

      <div className="mb-4">
        <label className="mb-2 block text-sm font-medium text-gray-700 transition-colors duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] dark:text-gray-300">
          Status działania
        </label>
        <div className="space-y-2">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={filters.showWorking}
              onChange={e =>
                handleFilterChange('showWorking', e.target.checked)
              }
              className="mr-2 h-4 w-4 cursor-pointer rounded border-blue-200 text-blue-600 transition-colors duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] focus:ring-blue-500 dark:border-gray-600"
            />
            <FontAwesomeIcon
              icon={faCheckCircle}
              className="mr-2 text-green-600 transition-colors duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]"
            />
            <span className="text-sm text-gray-600 transition-colors duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] dark:text-gray-300">
              Czynne
            </span>
          </label>

          <label className="flex items-center">
            <input
              type="checkbox"
              checked={filters.showNotWorking}
              onChange={e =>
                handleFilterChange('showNotWorking', e.target.checked)
              }
              className="mr-2 h-4 w-4 cursor-pointer rounded border-blue-200 text-blue-600 transition-colors duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] focus:ring-blue-500 dark:border-gray-600"
            />
            <FontAwesomeIcon
              icon={faTimesCircle}
              className="mr-2 text-red-500 transition-colors duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]"
            />
            <span className="text-sm text-gray-600 transition-colors duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] dark:text-gray-300">
              Nieczynne
            </span>
          </label>

          <label className="flex items-center">
            <input
              type="checkbox"
              checked={filters.showUnknownWorking}
              onChange={e =>
                handleFilterChange('showUnknownWorking', e.target.checked)
              }
              className="mr-2 h-4 w-4 cursor-pointer rounded border-blue-200 text-blue-600 transition-colors duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] focus:ring-blue-500 dark:border-gray-600"
            />
            <FontAwesomeIcon
              icon={faQuestionCircle}
              className="mr-2 text-gray-400 transition-colors duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]"
            />
            <span className="text-sm text-gray-600 transition-colors duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] dark:text-gray-300">
              Brak informacji
            </span>
          </label>
        </div>
      </div>

      <div className="mb-4">
        <label className="mb-2 block text-sm font-medium text-gray-700 transition-colors duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] dark:text-gray-300">
          Dostępność dla osób z niepełnosprawnością
        </label>
        <div className="space-y-2">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={filters.showAccessible}
              onChange={e =>
                handleFilterChange('showAccessible', e.target.checked)
              }
              className="mr-2 h-4 w-4 cursor-pointer rounded border-blue-200 text-blue-600 transition-colors duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] focus:ring-blue-500 dark:border-gray-600"
            />
            <FontAwesomeIcon
              icon={faCheckCircle}
              className="mr-2 text-green-600 transition-colors duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]"
            />
            <span className="text-sm text-gray-600 transition-colors duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] dark:text-gray-300">
              Dostosowane
            </span>
          </label>

          <label className="flex items-center">
            <input
              type="checkbox"
              checked={filters.showNotAccessible}
              onChange={e =>
                handleFilterChange('showNotAccessible', e.target.checked)
              }
              className="mr-2 h-4 w-4 cursor-pointer rounded border-blue-200 text-blue-600 transition-colors duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] focus:ring-blue-500 dark:border-gray-600"
            />
            <FontAwesomeIcon
              icon={faTimesCircle}
              className="mr-2 text-red-500 transition-colors duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]"
            />
            <span className="text-sm text-gray-600 transition-colors duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] dark:text-gray-300">
              Niedostosowane
            </span>
          </label>

          <label className="flex items-center">
            <input
              type="checkbox"
              checked={filters.showUnknownAccessible}
              onChange={e =>
                handleFilterChange('showUnknownAccessible', e.target.checked)
              }
              className="mr-2 h-4 w-4 cursor-pointer rounded border-blue-200 text-blue-600 transition-colors duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] focus:ring-blue-500 dark:border-gray-600"
            />
            <FontAwesomeIcon
              icon={faQuestionCircle}
              className="mr-2 text-gray-400 transition-colors duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]"
            />
            <span className="text-sm text-gray-600 transition-colors duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] dark:text-gray-300">
              Brak informacji
            </span>
          </label>
        </div>
      </div>

      <div className="mb-4">
        <label className="mb-2 block text-sm font-medium text-gray-700 transition-colors duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] dark:text-gray-300">
          Dzielnice
        </label>
        <div className="space-y-2">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={filters.showBaluty}
              onChange={e => handleFilterChange('showBaluty', e.target.checked)}
              className="mr-2 h-4 w-4 cursor-pointer rounded border-blue-200 text-blue-600 transition-colors duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] focus:ring-blue-500 dark:border-gray-600"
            />
            <FontAwesomeIcon
              icon={faCircleChevronUp}
              className="mr-2 text-purple-500 transition-colors duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]"
            />
            <span className="text-sm text-gray-600 transition-colors duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] dark:text-gray-300">
              Bałuty
            </span>
          </label>

          <label className="flex items-center">
            <input
              type="checkbox"
              checked={filters.showWidzew}
              onChange={e => handleFilterChange('showWidzew', e.target.checked)}
              className="mr-2 h-4 w-4 cursor-pointer rounded border-blue-200 text-blue-600 transition-colors duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] focus:ring-blue-500 dark:border-gray-600"
            />
            <FontAwesomeIcon
              icon={faCircleChevronRight}
              className="mr-2 text-blue-500 transition-colors duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]"
            />
            <span className="text-sm text-gray-600 transition-colors duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] dark:text-gray-300">
              Widzew
            </span>
          </label>

          <label className="flex items-center">
            <input
              type="checkbox"
              checked={filters.showSrodmiescie}
              onChange={e =>
                handleFilterChange('showSrodmiescie', e.target.checked)
              }
              className="mr-2 h-4 w-4 cursor-pointer rounded border-blue-200 text-blue-600 transition-colors duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] focus:ring-blue-500 dark:border-gray-600"
            />
            <FontAwesomeIcon
              icon={faCircleDot}
              className="mr-2 text-green-500 transition-colors duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]"
            />
            <span className="text-sm text-gray-600 transition-colors duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] dark:text-gray-300">
              Śródmieście
            </span>
          </label>

          <label className="flex items-center">
            <input
              type="checkbox"
              checked={filters.showPolesie}
              onChange={e =>
                handleFilterChange('showPolesie', e.target.checked)
              }
              className="mr-2 h-4 w-4 cursor-pointer rounded border-blue-200 text-blue-600 transition-colors duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] focus:ring-blue-500 dark:border-gray-600"
            />
            <FontAwesomeIcon
              icon={faCircleChevronLeft}
              className="mr-2 text-amber-500 transition-colors duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]"
            />
            <span className="text-sm text-gray-600 transition-colors duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] dark:text-gray-300">
              Polesie
            </span>
          </label>

          <label className="flex items-center">
            <input
              type="checkbox"
              checked={filters.showGorna}
              onChange={e => handleFilterChange('showGorna', e.target.checked)}
              className="mr-2 h-4 w-4 cursor-pointer rounded border-blue-200 text-blue-600 transition-colors duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] focus:ring-blue-500 dark:border-gray-600"
            />
            <FontAwesomeIcon
              icon={faCircleChevronDown}
              className="mr-2 text-red-500 transition-colors duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]"
            />
            <span className="text-sm text-gray-600 transition-colors duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] dark:text-gray-300">
              Górna
            </span>
          </label>
        </div>
      </div>

      <div className="flex gap-2 pt-2">
        <button
          onClick={onClose}
          className="flex-1 cursor-pointer rounded-md bg-blue-100 px-4 py-2 text-sm font-medium text-blue-800 transition-colors duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] hover:bg-blue-200 dark:bg-gray-600 dark:text-gray-300 dark:hover:bg-gray-500">
          Zamknij
        </button>
      </div>

      <div className="mt-2 text-center text-xs text-gray-500 transition-colors duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] dark:text-gray-400">
        Aktywne filtry będą zastosowane automatycznie
      </div>
    </div>
  );
};

export default FilterPanel;
