import Map from './components/Map';
import Header from './components/Header';

const App = () => {
  return (
    <div className="h-screen w-screen flex flex-col overflow-hidden">
      <Header />
      <div className="flex-1 relative">
        <Map />
      </div>
    </div>
  );
};
export default App;