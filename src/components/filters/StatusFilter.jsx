import {
  faCheckCircle,
  faTimesCircle,
  faQuestionCircle
} from '@fortawesome/free-solid-svg-icons';
import FilterSection from './FilterSection';
import FilterOption from './FilterOption';

const StatusFilter = ({
  showWorking,
  showNotWorking,
  showUnknownWorking,
  onFilterChange
}) => {
  return (
    <FilterSection legend="Status działania" legendId="working-status-legend">
      <FilterOption
        checked={showWorking}
        onChange={e => onFilterChange('showWorking', e.target.checked)}
        icon={faCheckCircle}
        iconColor="text-green-600"
        label="Czynne"
        describedBy="working-desc"
        ariaDescription="Pokaż punkty które działają"
      />

      <FilterOption
        checked={showNotWorking}
        onChange={e => onFilterChange('showNotWorking', e.target.checked)}
        icon={faTimesCircle}
        iconColor="text-red-500"
        label="Nieczynne"
        describedBy="not-working-desc"
        ariaDescription="Pokaż punkty które nie działają"
      />

      <FilterOption
        checked={showUnknownWorking}
        onChange={e => onFilterChange('showUnknownWorking', e.target.checked)}
        icon={faQuestionCircle}
        iconColor="text-gray-400"
        label="Brak informacji"
        describedBy="unknown-working-desc"
        ariaDescription="Pokaż punkty o nieznanym statusie działania"
      />
    </FilterSection>
  );
};

export default StatusFilter;
