import { useEffect, useState } from 'react';

const ThemeSwitch = () => {
  const getInitalDarkModeSetting = () => {
    const stored = localStorage.getItem('darkMode');
    if (stored !== null) return stored === 'true';
    return document.documentElement.classList.contains('dark');
  };

  const [darkMode, setDarkMode] = useState(getInitalDarkModeSetting);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className={`relative inline-flex h-6 w-11 cursor-pointer items-center rounded-full transition-colors duration-300 [transition-timing-function:cubic-bezier(0.4,0,0.2,1)] ${
        darkMode ? 'bg-gray-500' : 'bg-gray-100'
      }`}>
      <span
        className={`inline-block h-4 w-4 transform rounded-full transition-transform duration-300 [transition-timing-function:cubic-bezier(0.4,0,0.2,1)] ${
          darkMode ? 'translate-x-6 bg-white' : 'translate-x-1 bg-blue-950'
        }`}
      />
    </button>
  );
};

export default ThemeSwitch;
