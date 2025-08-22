import {
  faHeart as FilledHeart,
  faHeart as UnfilledHeart,
  faCheckCircle,
  faTimesCircle,
  faQuestionCircle,
  faRoute
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useFavorites } from '../contexts/FavoritesContext';
import { Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const PopUp = ({ id, name, coordinates, placeId, isWorking }) => {
  const { favorites, toggleFavorite } = useFavorites();
  const isFavorite = favorites.includes(id);

  const googleMapsLink = placeId
    ? `https://www.google.com/maps/place/?q=place_id:${placeId}&center=${coordinates[1]},${coordinates[0]}&zoom=17`
    : `https://www.google.com/maps/dir/?api=1&destination=${coordinates[1]},${coordinates[0]}`;

  const getStatusIcon = status => {
    switch (status) {
      case true:
        return (
          <FontAwesomeIcon
            icon={faCheckCircle}
            className="w-auto shrink-0 text-green-600 transition-colors duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]"
          />
        );
      case false:
        return (
          <FontAwesomeIcon
            icon={faTimesCircle}
            className="w-auto shrink-0 text-red-500 transition-colors duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]"
          />
        );
      default:
        return (
          <FontAwesomeIcon
            icon={faQuestionCircle}
            className="w-auto shrink-0 text-blue-400 transition-colors duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]"
          />
        );
    }
  };

  return (
      <Popup closeButton={false}>
        <div className="flex flex-col gap-4">
          <div className="flex items-start gap-3">
            <h1 className="text-base leading-tight font-semibold text-gray-800 transition-colors duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] dark:text-white">
              {name}
            </h1>
            <button
              onClick={() => toggleFavorite(id)}
              className="size-11 flex-shrink-0 rounded-full p-1 transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] hover:bg-slate-200 dark:hover:bg-gray-700"
              aria-label={
                isFavorite ? 'Usuń z ulubionych' : 'Dodaj do ulubionych'
              }>
              <FontAwesomeIcon
                icon={isFavorite ? FilledHeart : UnfilledHeart}
                className={`transform transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] hover:scale-110 ${
                  isFavorite
                    ? 'text-rose-500 drop-shadow-sm'
                    : 'text-gray-400 hover:text-rose-400 dark:text-gray-500'
                }`}
                style={{
                  filter: isFavorite
                    ? 'drop-shadow(0 0 2px rgba(236, 72, 153, 0.5))'
                    : 'none'
                }}
                size="xl"
              />
            </button>
          </div>

          <div className="space-y-1">
            <div className="flex items-baseline gap-2">
              {getStatusIcon(isWorking)}
              <span className="text-sm leading-relaxed text-gray-600 transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] dark:text-gray-300">
                Wodopój czynny
              </span>
            </div>
            <div className="flex items-baseline gap-2">
              {getStatusIcon(false)}
              <span className="text-sm leading-relaxed text-gray-600 transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] dark:text-gray-300">
                Wodopój dostosowany do osób z niepełnosprawnością
              </span>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-2 transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] dark:border-gray-600">
            <a
              href={googleMapsLink}
              target="_blank"
              rel="noopener noreferrer"
               className="flex items-center justify-center gap-2 rounded-md bg-blue-100 px-3 py-2 text-sm font-medium !text-blue-800 transition-colors duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] hover:bg-blue-200 dark:bg-gray-600 dark:!text-gray-300 dark:hover:bg-gray-500"
            >
              <FontAwesomeIcon
                icon={faRoute}
                className="h-3 w-3 flex-shrink-0 transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]"
              />
              Pokaż trasę w Google Maps
            </a>
          </div>
        </div>
      </Popup>
  );
};

export default PopUp;
