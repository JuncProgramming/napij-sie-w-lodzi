import ThemeSwitch from './ThemeSwitch';
import Logo from './Logo';

const Header = () => {
  return (
    <header
      className="z-10 flex h-16 w-full flex-shrink-0 items-center justify-between border-blue-100 bg-blue-50 px-4 shadow-md transition-colors duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] dark:bg-gray-800"
      role="banner">
      <div className="w-12" aria-hidden="true"></div>
      <div className="flex items-center">
        <Logo/>
      </div>
      <div className="flex w-12 justify-end">
        <ThemeSwitch />
      </div>
    </header>
  );
};

export default Header;
