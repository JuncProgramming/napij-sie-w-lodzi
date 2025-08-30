import {
  faCircleChevronDown,
  faCircleChevronUp,
  faCircleChevronLeft,
  faCircleChevronRight,
  faCircleDot,
} from '@fortawesome/free-solid-svg-icons';
import FilterSection from './FilterSection';
import FilterOption from './FilterOption';

const DistrictsFilter = ({ 
  showBaluty,
  showWidzew,
  showSrodmiescie,
  showPolesie,
  showGorna,
  onFilterChange 
}) => {
  return (
    <FilterSection legend="Dzielnice" legendId="districts-legend">
      <FilterOption
        checked={showBaluty}
        onChange={e => onFilterChange('showBaluty', e.target.checked)}
        icon={faCircleChevronUp}
        iconColor="text-purple-500"
        label="Bałuty"
        describedBy="baluty-desc"
        ariaDescription="Pokaż punkty w dzielnicy Bałuty"
      />

      <FilterOption
        checked={showWidzew}
        onChange={e => onFilterChange('showWidzew', e.target.checked)}
        icon={faCircleChevronRight}
        iconColor="text-blue-500"
        label="Widzew"
        describedBy="widzew-desc"
        ariaDescription="Pokaż punkty w dzielnicy Widzew"
      />

      <FilterOption
        checked={showSrodmiescie}
        onChange={e => onFilterChange('showSrodmiescie', e.target.checked)}
        icon={faCircleDot}
        iconColor="text-green-500"
        label="Śródmieście"
        describedBy="srodmiescie-desc"
        ariaDescription="Pokaż punkty w dzielnicy Śródmieście"
      />

      <FilterOption
        checked={showPolesie}
        onChange={e => onFilterChange('showPolesie', e.target.checked)}
        icon={faCircleChevronLeft}
        iconColor="text-amber-500"
        label="Polesie"
        describedBy="polesie-desc"
        ariaDescription="Pokaż punkty w dzielnicy Polesie"
      />

      <FilterOption
        checked={showGorna}
        onChange={e => onFilterChange('showGorna', e.target.checked)}
        icon={faCircleChevronDown}
        iconColor="text-red-500"
        label="Górna"
        describedBy="gorna-desc"
        ariaDescription="Pokaż punkty w dzielnicy Górna"
      />
    </FilterSection>
  );
};

export default DistrictsFilter;
