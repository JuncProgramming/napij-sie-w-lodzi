import { MapContainer, TileLayer, Marker, Popup, Polygon } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import parkingSpaces from '../data/parkingspaces';

const Map = () => {
  return (
    <MapContainer
      center={[51.768432, 19.457468]}
      zoom={13}
      className="h-screen w-full">
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {parkingSpaces.map(space => (
        <Polygon
          key={space.id}
          positions={space.coordinates}
          pathOptions={{
            color: 'blue',
            fillColor: 'lightblue',
            fillOpacity: 0.4
          }}>
          <Popup>{space.name}</Popup>
        </Polygon>
      ))}
    </MapContainer>
  );
};

export default Map;
