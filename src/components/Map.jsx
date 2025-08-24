import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSliders, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useFavorites } from '../hooks/useFavorites';
import 'leaflet/dist/leaflet.css';
import drinkingWaterPoints from '../data/drinkingWaterPoints';
import PopUp from './PopUp';
import FilterPanel from './FilterPanel';

const Map = () => {
  const { favorites } = useFavorites();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filteredWaterPoints, setFilteredWaterPoints] =
    useState(drinkingWaterPoints);

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  const handleFilterChange = filters => {
    let filtered = [...drinkingWaterPoints];

    const enabledRegions = [];
    if (filters.showBaluty) enabledRegions.push('Bałuty');
    if (filters.showWidzew) enabledRegions.push('Widzew');
    if (filters.showSrodmiescie) enabledRegions.push('Śródmieście');
    if (filters.showPolesie) enabledRegions.push('Polesie');
    if (filters.showGorna) enabledRegions.push('Górna');

    if (enabledRegions.length === 0) {
      setFilteredWaterPoints([]);
      return;
    }

    filtered = filtered.filter(waterPoint =>
      enabledRegions.includes(waterPoint.geometry.region)
    );

    if (filters.showFavoritesOnly && !filters.showAll) {
      filtered = filtered.filter(waterPoint =>
        favorites.includes(waterPoint.id)
      );
    }

    if (
      !filters.showWorking ||
      !filters.showNotWorking ||
      !filters.showUnknownWorking
    ) {
      filtered = filtered.filter(waterPoint => {
        const status = waterPoint.properties.isWorking;
        if (!filters.showWorking && status === 'yes') return false;
        if (!filters.showNotWorking && status === 'no') return false;
        if (!filters.showUnknownWorking && status === 'unknown') return false;
        return true;
      });
    }

    if (
      !filters.showAccessible ||
      !filters.showNotAccessible ||
      !filters.showUnknownAccessible
    ) {
      filtered = filtered.filter(waterPoint => {
        const accessibility = waterPoint.properties.isAccessible;
        if (!filters.showAccessible && accessibility === 'yes') return false;
        if (!filters.showNotAccessible && accessibility === 'no') return false;
        if (!filters.showUnknownAccessible && accessibility === 'unknown')
          return false;
        return true;
      });
    }

    if (filters.searchText.trim()) {
      const searchTerm = filters.searchText.toLowerCase();
      filtered = filtered.filter(waterPoint =>
        waterPoint.properties.name.toLowerCase().includes(searchTerm)
      );
    }

    setFilteredWaterPoints(filtered);
  };

  return (
    <div className="absolute inset-0 h-full w-full">
      <MapContainer
        center={[51.768432, 19.457468]}
        zoom={12}
        className="z-0 h-full w-full"
        style={{ height: '100%', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>'
        />

        {filteredWaterPoints.map(waterPoint => (
          <Marker
            key={waterPoint.id}
            position={[
              waterPoint.geometry.coordinates[1],
              waterPoint.geometry.coordinates[0]
            ]}>
            <PopUp
              id={waterPoint.id}
              name={waterPoint.properties.name}
              coordinates={waterPoint.geometry.coordinates}
              placeId={waterPoint.geometry.placeId}
              isWorking={waterPoint.properties.isWorking}
              isAccessible={waterPoint.properties.isAccessible}
            />
          </Marker>
        ))}
      </MapContainer>
      <button
        onClick={toggleFilter}
        className="absolute top-4 right-4 z-[1001] flex size-11 cursor-pointer items-center justify-center rounded-lg bg-blue-50 text-blue-800 shadow-lg transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] hover:bg-blue-100 hover:shadow-xl dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700">
        <FontAwesomeIcon
          icon={isFilterOpen ? faTimes : faSliders}
          className="text-sm transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]"
        />
      </button>
      {isFilterOpen && (
        <FilterPanel
          onFilterChange={handleFilterChange}
          onClose={toggleFilter}
        />
      )}
    </div>
  );
};

export default Map;
