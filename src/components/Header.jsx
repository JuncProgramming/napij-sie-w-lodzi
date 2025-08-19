import ThemeSwitch from './ThemeSwitch';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons/faBars';
import { useSidebar } from '../contexts/SidebarContext';

const Header = () => {
  const { toggleSidebar } = useSidebar();

  return (
    <header className="text flex h-16 w-screen items-center justify-between bg-blue-500 px-4 text-center text-white dark:bg-blue-950">
      <button onClick={toggleSidebar}>
        <FontAwesomeIcon
          icon={faBars}
          className="cursor-pointer text-xl text-white"
        />
      </button>
      <img
        src="/logo.svg"
        alt="Logo"
        className="h-12 w-auto"
        style={{
          filter: 'brightness(0) saturate(100%) invert(100%)'
        }}
      />
      <ThemeSwitch></ThemeSwitch>
    </header>
  );
};

export default Header;
