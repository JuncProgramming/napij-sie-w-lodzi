import Map from './components/Map';
import Sidebar from './components/Sidebar';
import Header from './components/Header';

const App = () => {
  return (
    <>
      <Sidebar />
      <div className="flex h-screen w-screen flex-col overflow-hidden">
        <Header />
        <div className="flex-grow">
          <Map />
        </div>
      </div>
    </>
  );
};
export default App;
