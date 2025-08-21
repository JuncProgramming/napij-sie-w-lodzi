import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as FilledStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as UnfilledStar } from '@fortawesome/free-regular-svg-icons';
import { useFavorites } from '../contexts/FavoritesContext';
import { Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const PopUp = ({ id, name, coordinates, placeId }) => {
  const { favorites, toggleFavorite } = useFavorites();
  const isFavorite = favorites.includes(id);

  const googleMapsLink = placeId
    ? `https://www.google.com/maps/place/?q=place_id:${placeId}&center=${coordinates[1]},${coordinates[0]}&zoom=17`
    : `https://www.google.com/maps/dir/?api=1&destination=${coordinates[1]},${coordinates[0]}`;

  return (
    <Popup closeButton={false}>
      <div className="flex max-w-[260px] items-center gap-4">
        <div className="flex flex-1 flex-col">
          <h1 className="m-0 text-sm font-medium">{name}</h1>
          <a
            href={googleMapsLink}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1 w-fit text-xs text-blue-500">
            Pokaż trasę
          </a>
        </div>
        <FontAwesomeIcon
          icon={isFavorite ? FilledStar : UnfilledStar}
          className="shrink-0 cursor-pointer text-xl text-yellow-500 hover:text-yellow-400"
          onClick={() => toggleFavorite(id)}
        />
      </div>
    </Popup>
  );
};

export default PopUp;
