import Map from './components/Map';
import Header from './components/Header';

const App = () => {
  return (
    <div className="flex h-screen w-screen flex-col overflow-hidden">
      <Header />
      <div className="relative flex-1">
        <Map />
      </div>
    </div>
  );
};
export default App;
