import { useTheme } from '../hooks/useTheme';

const ThemeSwitch = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`relative inline-flex h-6 w-11 cursor-pointer items-center rounded-full transition-colors duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${
        isDark ? 'bg-slate-600' : 'bg-blue-200'
      }`}>
      <span
        className={`inline-block h-4 w-4 transform rounded-full transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${
          isDark
            ? 'translate-x-6 bg-white text-slate-800'
            : 'translate-x-1 bg-blue-800'
        }`}
      />
    </button>
  );
};

export default ThemeSwitch;
