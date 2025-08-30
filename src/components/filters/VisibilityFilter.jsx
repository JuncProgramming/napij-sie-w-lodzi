import {
  faMapMarkerAlt,
  faHeart,
} from '@fortawesome/free-solid-svg-icons';
import FilterSection from './FilterSection';
import FilterOption from './FilterOption';

const VisibilityFilter = ({ 
  showAll, 
  showFavoritesOnly, 
  favoritesCount,
  allRegionsSelected,
  allStatusesSelected,
  onFilterChange 
}) => {
  return (
    <FilterSection legend="Widoczność" legendId="visibility-legend">
      <FilterOption
        checked={showAll && allRegionsSelected && allStatusesSelected}
        onChange={e => onFilterChange('showAll', e.target.checked)}
        icon={faMapMarkerAlt}
        iconColor="text-blue-600 dark:text-blue-400"
        label="Wszystkie źródła"
        describedBy="show-all-desc"
        ariaDescription="Pokaż wszystkie punkty wody pitnej na mapie"
      />
      
      <FilterOption
        checked={showFavoritesOnly}
        onChange={e => onFilterChange('showFavoritesOnly', e.target.checked)}
        icon={faHeart}
        iconColor="text-rose-500"
        label={`Tylko ulubione - ${favoritesCount}`}
        describedBy="favorites-desc"
        ariaDescription={`Pokaż tylko punkty dodane do ulubionych. Obecnie masz ${favoritesCount} ulubionych punktów.`}
      />
    </FilterSection>
  );
};

export default VisibilityFilter;
