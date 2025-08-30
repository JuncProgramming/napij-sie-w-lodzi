const CheckBox = ({ checked, onChange, describedBy }) => {
  return (
    <input
      type="checkbox"
      checked={checked}
      onChange={onChange}
      className="relative mr-2 h-4 w-4 cursor-pointer appearance-none rounded border-2 border-gray-400 bg-gray-50 transition-colors duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] after:absolute after:top-[0px] after:left-[4px] after:h-[10px] after:w-[5px] after:rotate-45 after:transform after:border-r-[2px] after:border-b-[2px] after:border-white after:opacity-0 after:transition-opacity after:duration-200 after:content-[''] checked:border-slate-600 checked:bg-slate-600 checked:after:opacity-100 focus-visible:ring-3 focus-visible:ring-blue-800 focus-visible:outline-none dark:border-gray-500 dark:bg-gray-700 dark:checked:border-slate-600 dark:checked:bg-slate-600 dark:checked:after:border-white dark:focus-visible:ring-3 dark:focus-visible:ring-yellow-400"
      aria-describedby={describedBy}
    />
  );
};

export default CheckBox;
