import {
  faHeart as FilledHeart,
  faCheckCircle,
  faTimesCircle,
  faQuestionCircle,
  faRoute
} from '@fortawesome/free-solid-svg-icons';
import { faHeart as UnfilledHeart } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useFavorites } from '../hooks/useFavorites';
import { Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const PopUp = ({ id, name, coordinates, placeId, isWorking, isAccessible }) => {
  const { favorites, toggleFavorite } = useFavorites();
  const isFavorite = favorites.includes(id);

  const googleMapsLink = placeId
    ? `https://www.google.com/maps/place/?q=place_id:${placeId}&center=${coordinates[1]},${coordinates[0]}&zoom=17`
    : `https://www.google.com/maps/dir/?api=1&destination=${coordinates[1]},${coordinates[0]}`;

  const getStatusText = (status, type) => {
    const baseTexts = {
      working: {
        yes: 'Punkt jest czynny',
        no: 'Punkt jest nieczynny',
        unknown: 'Status działania nieznany'
      },
      accessible: {
        yes: 'Punkt dostosowany dla osób z niepełnosprawnością',
        no: 'Punkt niedostosowany dla osób z niepełnosprawnością',
        unknown: 'Status dostępności nieznany'
      }
    };
    return baseTexts[type][status] || baseTexts[type].unknown;
  };

  const getStatusIcon = (status, label) => {
    switch (status) {
      case 'yes':
        return (
          <FontAwesomeIcon
            icon={faCheckCircle}
            className="w-auto shrink-0 text-green-600 transition-colors duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]"
            aria-label={`${label}: Tak`}
            role="img"
          />
        );
      case 'no':
        return (
          <FontAwesomeIcon
            icon={faTimesCircle}
            className="w-auto shrink-0 text-red-500 transition-colors duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]"
            aria-label={`${label}: Nie`}
            role="img"
          />
        );
      /* Default - unknown */
      default:
        return (
          <FontAwesomeIcon
            icon={faQuestionCircle}
            className="w-auto shrink-0 text-gray-400 transition-colors duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]"
            aria-label={`${label}: Nieznane`}
            role="img"
          />
        );
    }
  };

  return (
    <Popup closeButton={false}>
      <div
        className="flex flex-col gap-4"
        role="dialog"
        aria-labelledby="popup-title">
        <div className="flex items-start gap-3">
          <h1
            id="popup-title"
            className="text-base leading-tight font-semibold text-gray-800 transition-colors duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] dark:text-white">
            {name}
          </h1>
          <button
            onClick={() => toggleFavorite(id)}
            className="size-11 flex-shrink-0 cursor-pointer rounded-full p-1 transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] hover:bg-slate-200 focus-visible:ring-2 focus-visible:ring-blue-800 focus-visible:ring-offset-2 focus-visible:outline-none dark:hover:bg-gray-700 dark:focus-visible:ring-blue-50"
            aria-label={
              isFavorite ? 'Usuń z ulubionych' : 'Dodaj do ulubionych'
            }
            aria-pressed={isFavorite}>
            <FontAwesomeIcon
              icon={isFavorite ? FilledHeart : UnfilledHeart}
              className={`transform transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] hover:scale-110 ${
                isFavorite
                  ? 'text-rose-500 drop-shadow-[0_0_10px_rgba(244,63,94,0.6)]'
                  : 'text-gray-400 hover:text-rose-400 dark:text-gray-500'
              }`}
              size="xl"
              aria-hidden="true"
            />
          </button>
        </div>

        <div
          className="space-y-1"
          role="region"
          aria-label="Informacje o punkcie">
          <div
            className="flex items-start gap-2"
            role="group"
            aria-labelledby="working-status">
            <div className="mt-1" aria-hidden="true">
              {getStatusIcon(isWorking, 'Status działania')}
            </div>
            <span
              id="working-status"
              className="text-sm leading-relaxed text-gray-600 transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] dark:text-gray-300">
              {getStatusText(isWorking, 'working')}
            </span>
          </div>
          <div
            className="flex items-start gap-2"
            role="group"
            aria-labelledby="accessibility-status">
            <div className="mt-1" aria-hidden="true">
              {getStatusIcon(isAccessible, 'Status dostępności')}
            </div>
            <span
              id="accessibility-status"
              className="text-sm leading-relaxed text-gray-600 transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] dark:text-gray-300">
              {getStatusText(isAccessible, 'accessible')}
            </span>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-2 transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] dark:border-gray-600">
          <a
            href={googleMapsLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 rounded-md bg-blue-100 px-3 py-2 text-sm font-medium !text-blue-800 transition-colors duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] hover:bg-blue-200 focus-visible:ring-2 focus-visible:ring-blue-800 focus-visible:ring-offset-2 focus-visible:outline-none dark:bg-gray-600 dark:!text-gray-300 dark:hover:bg-gray-500 dark:focus-visible:ring-blue-50"
            aria-label={`Otwórz nawigację do ${name} w Google Maps w nowym oknie`}>
            <FontAwesomeIcon
              icon={faRoute}
              className="h-3 w-3 flex-shrink-0 transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]"
              aria-hidden="true"
            />
            Pokaż trasę w Google Maps
          </a>
        </div>
      </div>
    </Popup>
  );
};

export default PopUp;
