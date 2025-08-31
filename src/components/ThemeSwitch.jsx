import { useTheme } from '../hooks/useTheme';

const ThemeSwitch = () => {
  const { isDark, toggleTheme } = useTheme();

  const handleKeyDown = event => {
    if (event.key === ' ') {
      event.preventDefault();
      toggleTheme();
    }
  };

  return (
    <button
      onClick={toggleTheme}
      onKeyDown={handleKeyDown}
      tabIndex={1}
      className={`relative inline-flex h-6 w-11 cursor-pointer items-center rounded-full transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] focus-visible:ring-3 focus-visible:ring-blue-800 focus-visible:ring-offset-3 focus-visible:outline-none dark:focus-visible:ring-3 dark:focus-visible:ring-yellow-400 dark:focus-visible:ring-offset-gray-800 ${
        isDark ? 'bg-slate-600' : 'bg-blue-200'
      }`}
      role="switch"
      aria-checked={isDark}
      aria-label={`Przełącz na motyw ${isDark ? 'jasny' : 'ciemny'}`}>
      <span
        className={`inline-block h-4 w-4 transform rounded-full transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${
          isDark
            ? 'translate-x-6 bg-white text-slate-800'
            : 'translate-x-1 bg-blue-800'
        }`}
        aria-hidden="true"
      />
    </button>
  );
};

export default ThemeSwitch;
