import { useSearch } from '../../hooks/useSearch';

const SearchFilter = ({ searchText, onSearchChange }) => {
  const { setIsSearchActive } = useSearch();
  return (
    <div className="mb-4">
      <label
        htmlFor="search-input"
        className="mb-2 block text-sm font-medium text-gray-700 transition-colors duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] dark:text-gray-300">
        Szukaj
      </label>
      <input
        id="search-input"
        type="search"
        value={searchText}
        onChange={e => onSearchChange(e.target.value)}
        onFocus={() => {
          setIsSearchActive(true);
        }}
        onBlur={() => {
          setIsSearchActive(false);
        }}
        tabIndex={0}
        placeholder="Nazwa lokalizacji..."
        className="w-full rounded-md border border-blue-100 bg-blue-100 px-3 py-2 text-sm text-gray-800 transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] focus:outline-none focus-visible:border-blue-500 focus-visible:ring-1 focus-visible:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
        aria-describedby="search-help"
      />
      <div id="search-help" className="sr-only">
        Wpisz nazwę, aby wyszukać konkretny punkt na mapie
      </div>
    </div>
  );
};

export default SearchFilter;
