import { Marker } from 'react-leaflet';
import { memo, useRef } from 'react';
import PopUp from './PopUp';

const WaterPointMarker = memo(({ waterPoint, icon }) => {
  const markerRef = useRef(null);

  const handlePopupOpen = () => {
    setTimeout(() => {
      const popup = document.querySelector('.leaflet-popup-content');
      if (popup) {
        const firstButton = popup.querySelector('button');
        if (firstButton) {
          firstButton.focus();
        }
      }
    }, 50);
  };

  return (
    <Marker
      ref={markerRef}
      position={[
        waterPoint.geometry.coordinates[1],
        waterPoint.geometry.coordinates[0]
      ]}
      icon={icon}
      alt={`${waterPoint.properties.name}`}
      eventHandlers={{
        popupopen: handlePopupOpen
      }}>
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
