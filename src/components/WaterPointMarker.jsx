import { Marker } from 'react-leaflet';
import { memo } from 'react';
import PopUp from './PopUp';

const WaterPointMarker = memo(({ waterPoint, icon }) => {
  return (
    <Marker
      position={[
        waterPoint.geometry.coordinates[1],
        waterPoint.geometry.coordinates[0]
      ]}
      icon={icon}
      alt={`${waterPoint.properties.name}`}>
      <PopUp
        id={waterPoint.id}
        name={waterPoint.properties.name}
        coordinates={waterPoint.geometry.coordinates}
        placeId={waterPoint.geometry.placeId}
        isWorking={waterPoint.properties.isWorking}
        isAccessible={waterPoint.properties.isAccessible}
      />
    </Marker>
  );
});

WaterPointMarker.displayName = 'WaterPointMarker';

export default WaterPointMarker;
