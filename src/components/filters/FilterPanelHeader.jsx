const FilterPanelHeader = ({ onClearAll }) => {
  return (
    <div className="mb-4 flex items-center justify-between">
      <h3
        id="filter-panel-title"
        className="text-lg font-semibold text-gray-800 transition-colors duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] dark:text-white">
        Filtry
      </h3>
      <button
        onClick={onClearAll}
        className="cursor-pointer text-sm text-blue-500 transition-colors duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] hover:text-blue-600 focus-visible:ring-3 focus-visible:ring-blue-800 focus-visible:ring-offset-3 focus-visible:ring-offset-blue-50 focus-visible:outline-none dark:text-blue-400 dark:hover:text-blue-500 dark:focus-visible:ring-3 dark:focus-visible:ring-yellow-400 dark:focus-visible:ring-offset-3 dark:focus-visible:ring-offset-gray-800"
        aria-label="Wyczyść wszystkie filtry">
        Wyczyść wszystkie
      </button>
    </div>
  );
};

export default FilterPanelHeader;
