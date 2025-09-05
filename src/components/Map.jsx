import { MapContainer, TileLayer } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSliders, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useFavorites } from '../hooks/useFavorites';
import { useSearch } from '../hooks/useSearch';
import L from 'leaflet';
import { renderToStaticMarkup } from 'react-dom/server';
import 'leaflet/dist/leaflet.css';
import 'react-leaflet-markercluster/styles';
import drinkingWaterPoints from '../data/drinkingWaterPoints';
import FilterPanel from './filters/FilterPanel';
import WaterPointIcon from './WaterPointIcon';
import WaterPointMarker from './WaterPointMarker';

const customWaterPointIcon = (() => {
  return L.divIcon({
    html: `<div 
      class="custom-marker-focus transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] hover:scale-105" 
      style="filter: drop-shadow(0 4px 3px rgb(0 0 0 / 0.07)) drop-shadow(0 2px 2px rgb(0 0 0 / 0.06)))"
      role="button"
      aria-label="Punkt z wodą pitną"
    >${renderToStaticMarkup(<WaterPointIcon />)}</div>`,
    className: '',
    iconSize: [48, 48],
    iconAnchor: [24, 48],
    popupAnchor: [0, -48]
  });
})();

const createClusterIcon = cluster => {
  const waterPointsCount = cluster.getChildCount();

  let sizeClass = 'w-10 h-10 text-xs';
  let clusterSizeClass = 'cluster-small';
  let iconSize = 40;

  if (waterPointsCount >= 10) {
    sizeClass = 'w-12 h-12 text-sm';
    clusterSizeClass = 'cluster-medium';
    iconSize = 48;
  }

  return L.divIcon({
    html: `
      <div 
        class="custom-marker-focus ${clusterSizeClass} flex items-center bg-blue-800 text-blue-50 dark:bg-gray-800 justify-center ${sizeClass} rounded-full font-bold shadow-lg transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] hover:scale-110" 
        role="button"
        aria-label="Grupa ${waterPointsCount} punktów z wodą pitną"
      >
        ${waterPointsCount}
      </div>`,
    className: '',
    iconSize: L.point(iconSize, iconSize),
    iconAnchor: [iconSize / 2, iconSize / 2]
  });
};

const Map = () => {
  const { favorites } = useFavorites();
  const { isSearchActive } = useSearch();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filteredWaterPoints, setFilteredWaterPoints] =
    useState(drinkingWaterPoints);
  const filterButtonRef = useRef(null);
  const [filters, setFilters] = useState({
    showAll: true,
    showFavoritesOnly: false,
    showBaluty: true,
    showWidzew: true,
    showSrodmiescie: true,
    showPolesie: true,
    showGorna: true,
    showWorking: true,
    showNotWorking: true,
    showUnknownWorking: true,
    showAccessible: true,
    showNotAccessible: true,
    showUnknownAccessible: true,
    searchText: ''
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      // Remove focus from attribution links at the bottom right corner
      const attributionLinks = document.querySelectorAll(
        '.leaflet-control-attribution a'
      );
      attributionLinks.forEach(link => {
        link.setAttribute('tabindex', '-1');
      });

      // Remove focus from map container (first 'empty' click)
      const mapContainer = document.querySelector('.leaflet-container');
      if (mapContainer) {
        mapContainer.setAttribute('tabindex', '-1');
      }

      const markers = document.querySelectorAll('.leaflet-marker-icon');
      markers.forEach((marker, index) => {
        marker.setAttribute('tabindex', `${21 + index}`);
      });

      const zoomControls = document.querySelectorAll('.leaflet-control-zoom a');
      zoomControls[0]?.setAttribute('tabindex', '19');
      zoomControls[1]?.setAttribute('tabindex', '20');
    }, 50);

    return () => clearTimeout(timer);
  }, []);

  // Update tabindexes when markers number change
  useEffect(() => {
    const timer = setTimeout(() => {
      const markers = document.querySelectorAll('.leaflet-marker-icon');
      markers.forEach((marker, index) => {
        marker.setAttribute('tabindex', `${21 + index}`);
      });
    }, 50);

    return () => clearTimeout(timer);
  }, [filteredWaterPoints]);

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  const handleKeyDown = event => {
    if (isSearchActive) return;

    if (event.key === 'f' || event.key === 'F') {
      event.preventDefault();

      if (filterButtonRef.current) {
        filterButtonRef.current.focus();
      }
    }

    if (event.key === 'Escape' && isFilterOpen) {
      event.preventDefault();
      setIsFilterOpen(false);

      if (filterButtonRef.current) {
        filterButtonRef.current.focus();
      }
    }
  };

  const applyFilters = (filtersToApply) => {
    let filtered = [...drinkingWaterPoints];

    const enabledRegions = [];
    if (filtersToApply.showBaluty) enabledRegions.push('Bałuty');
    if (filtersToApply.showWidzew) enabledRegions.push('Widzew');
    if (filtersToApply.showSrodmiescie) enabledRegions.push('Śródmieście');
    if (filtersToApply.showPolesie) enabledRegions.push('Polesie');
    if (filtersToApply.showGorna) enabledRegions.push('Górna');

    if (enabledRegions.length === 0) {
      setFilteredWaterPoints([]);
      return;
    }

    filtered = filtered.filter(waterPoint =>
      enabledRegions.includes(waterPoint.geometry.region)
    );

    if (filtersToApply.showFavoritesOnly && !filtersToApply.showAll) {
      filtered = filtered.filter(waterPoint =>
        favorites.includes(waterPoint.id)
      );
    }

    if (
      !filtersToApply.showWorking ||
      !filtersToApply.showNotWorking ||
      !filtersToApply.showUnknownWorking
    ) {
      filtered = filtered.filter(waterPoint => {
        const status = waterPoint.properties.isWorking;
        if (!filtersToApply.showWorking && status === 'yes') return false;
        if (!filtersToApply.showNotWorking && status === 'no') return false;
        if (!filtersToApply.showUnknownWorking && status === 'unknown')
          return false;
        return true;
      });
    }

    if (
      !filtersToApply.showAccessible ||
      !filtersToApply.showNotAccessible ||
      !filtersToApply.showUnknownAccessible
    ) {
      filtered = filtered.filter(waterPoint => {
        const accessibility = waterPoint.properties.isAccessible;
        if (!filtersToApply.showAccessible && accessibility === 'yes') return false;
        if (!filtersToApply.showNotAccessible && accessibility === 'no')
          return false;
        if (!filtersToApply.showUnknownAccessible && accessibility === 'unknown')
          return false;
        return true;
      });
    }

    if (filtersToApply.searchText.trim()) {
      const searchTerm = filtersToApply.searchText.toLowerCase();
      filtered = filtered.filter(
        waterPoint =>
          waterPoint.properties.name.toLowerCase().includes(searchTerm) ||
          waterPoint.tags.some(tag => tag.toLowerCase().includes(searchTerm))
      );
    }

    setFilteredWaterPoints(filtered);
  };

  useEffect(() => {
    applyFilters(filters);
  }, [favorites]);

  useEffect(() => {
    applyFilters(filters);
  }, []);

  const handleFilterChange = newFilters => {
    setFilters(newFilters);
    applyFilters(newFilters);
  };

  return (
    <div className="relative h-full w-full" onKeyDown={handleKeyDown}>
      <MapContainer
        center={[51.768432, 19.457468]}
        zoom={12}
        minZoom={7}
        maxBounds={[
          [49.002, 14.123],
          [54.839, 24.15]
        ]}
        maxBoundsViscosity={1.0}
        style={{ height: '100%', width: '100%' }}
        role="application"
        aria-label="Mapa punktów z wodą pitną w Łodzi. Użyj przycisków Tab i Enter do nawigacji.">
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>'
          tileSize={256}
          zoomOffset={0}
          detectRetina={true}
        />
        <MarkerClusterGroup
          disableClusteringAtZoom={12}
          showCoverageOnHover={false}
          zoomToBoundsOnClick={true}
          animateAddingMarkers={true}
          iconCreateFunction={cluster => createClusterIcon(cluster)}>
          {filteredWaterPoints.map(waterPoint => (
            <WaterPointMarker
              key={waterPoint.id}
              waterPoint={waterPoint}
              icon={customWaterPointIcon}
            />
          ))}
        </MarkerClusterGroup>
      </MapContainer>
      <button
        ref={filterButtonRef}
        onClick={toggleFilter}
        tabIndex={2}
        className="absolute top-4 right-4 z-[1001] flex size-11 cursor-pointer items-center justify-center rounded-lg bg-blue-50 text-blue-800 shadow-lg transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] hover:bg-blue-100 hover:shadow-xl focus-visible:ring-3 focus-visible:ring-blue-800 focus-visible:outline-none dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700 dark:focus-visible:ring-3 dark:focus-visible:ring-yellow-400"
        aria-label={
          isFilterOpen ? 'Zamknij panel filtrów' : 'Otwórz panel filtrów'
        }
        aria-expanded={isFilterOpen}
        aria-controls="filter-panel">
        <FontAwesomeIcon
          icon={isFilterOpen ? faTimes : faSliders}
          className="text-sm transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]"
          aria-hidden="true"
        />
      </button>
      {isFilterOpen && (
        <FilterPanel
          filters={filters}
          onFilterChange={handleFilterChange}
          onClose={() => {
            setIsFilterOpen(false);
            filterButtonRef.current?.focus();
          }}
        />
      )}
    </div>
  );
};

export default Map;
