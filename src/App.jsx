import Map from './components/Map';
import Header from './components/Header';

const App = () => {
  return (
    <div className="flex h-screen flex-col">
      <Header />
      <main
        id="main-content"
        tabIndex={-1}
        className="mt-16 h-[calc(100dvh-4rem)]"
        role="main"
        aria-label="Główna zawartość aplikacji - mapa punktów z wodą pitną">
        <Map />
      </main>
    </div>
  );
};
export default App;
