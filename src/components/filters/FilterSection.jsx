const FilterSection = ({ legend, legendId, children }) => {
  return (
    <fieldset className="mb-4">
      <legend
        id={legendId}
        className="mb-2 block text-sm font-medium text-gray-700 transition-colors duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] dark:text-gray-300">
        {legend}
      </legend>
      <div
        className="space-y-2"
        role="group"
        aria-labelledby={legendId}>
        {children}
      </div>
    </fieldset>
  );
};

export default FilterSection;
