import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import drinkingWaterPoints from '../data/drinkingWaterPoints';

const Map = () => {
  return (
    <MapContainer
      center={[51.768432, 19.457468]}
      zoom={12}
      className="h-full w-full">
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>'
      />

      {drinkingWaterPoints.map(waterPoint => (
        <Marker
          key={waterPoint.id}
          position={[
            waterPoint.geometry.coordinates[1],
            waterPoint.geometry.coordinates[0]
          ]}>
          <Popup>{waterPoint.properties.amenity}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default Map;
