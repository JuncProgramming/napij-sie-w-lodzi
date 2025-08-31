import {
  faCheckCircle,
  faTimesCircle,
  faQuestionCircle
} from '@fortawesome/free-solid-svg-icons';
import FilterSection from './FilterSection';
import FilterOption from './FilterOption';

const AccessibilityFilter = ({
  showAccessible,
  showNotAccessible,
  showUnknownAccessible,
  onFilterChange
}) => {
  return (
    <FilterSection
      legend="Dostępność dla osób z niepełnosprawnością"
      legendId="accessibility-legend">
      <FilterOption
        checked={showAccessible}
        onChange={e => onFilterChange('showAccessible', e.target.checked)}
        icon={faCheckCircle}
        iconColor="text-green-600"
        label="Dostosowane"
        describedBy="accessible-desc"
        ariaDescription="Pokaż punkty dostosowane dla osób z niepełnosprawnością"
      />

      <FilterOption
        checked={showNotAccessible}
        onChange={e => onFilterChange('showNotAccessible', e.target.checked)}
        icon={faTimesCircle}
        iconColor="text-red-500"
        label="Niedostosowane"
        describedBy="not-accessible-desc"
        ariaDescription="Pokaż punkty niedostosowane dla osób z niepełnosprawnością"
      />

      <FilterOption
        checked={showUnknownAccessible}
        onChange={e =>
          onFilterChange('showUnknownAccessible', e.target.checked)
        }
        icon={faQuestionCircle}
        iconColor="text-gray-400"
        label="Brak informacji"
        describedBy="unknown-accessible-desc"
        ariaDescription="Pokaż punkty o nieznanym statusie dostępności"
      />
    </FilterSection>
  );
};

export default AccessibilityFilter;
