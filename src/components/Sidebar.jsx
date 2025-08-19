import { useSidebar } from '../contexts/SidebarContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons/faHeart';

const Sidebar = () => {
  const { isSidebarOpen, toggleSidebar } = useSidebar();

  return (
    <>
      <div
        className={`fixed inset-0 z-[9998] bg-black/30 transition-opacity ${
          isSidebarOpen
            ? 'pointer-events-auto opacity-100'
            : 'pointer-events-none opacity-0'
        }`}
        onClick={toggleSidebar}
      />

      <div
        className={`fixed top-0 left-0 z-[9999] h-screen w-64 transform rounded-r-2xl bg-blue-500 shadow-lg transition-transform duration-[400ms] [transition-timing-function:cubic-bezier(0.4,0,0.2,1)] dark:bg-blue-950 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}>
        <h2 className="flex h-16 items-center p-6 text-2xl font-semibold text-white">
          Menu
        </h2>
        <div className="m-2 flex h-12 cursor-pointer items-center gap-2 rounded-xl p-4 hover:bg-gray-700 dark:hover:bg-blue-900">
          <FontAwesomeIcon icon={faHeart} className="text-white" />
          <span className="font-semibold text-white">Ulubione</span>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
