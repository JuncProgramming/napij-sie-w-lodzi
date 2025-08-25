import Map from './components/Map';
import Header from './components/Header';

const App = () => {
  return (
    <div className="flex h-screen w-screen flex-col overflow-hidden">
      <Header />
      <main
        id="main-content"
        tabIndex={-1}
        className="relative flex-1"
        role="main"
        aria-label="Główna zawartość aplikacji - mapa punktów z wodą pitną">
        <Map />
      </main>
    </div>
  );
};
export default App;
