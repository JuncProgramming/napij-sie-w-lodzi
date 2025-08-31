import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CheckBox from './CheckBox';

const FilterOption = ({
  checked,
  onChange,
  icon,
  iconColor,
  label,
  describedBy,
  ariaDescription,
  tabIndex = 0
}) => {
  return (
    <label className="flex items-center">
      <CheckBox
        checked={checked}
        onChange={onChange}
        className="mr-2"
        describedBy={describedBy}
        tabIndex={tabIndex}
      />
      <FontAwesomeIcon
        icon={icon}
        className={`mr-2 ${iconColor} transition-colors duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]`}
        aria-hidden="true"
      />
      <span className="text-sm text-gray-600 transition-colors duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] dark:text-gray-300">
        {label}
      </span>
      <span id={describedBy} className="sr-only">
        {ariaDescription}
      </span>
    </label>
  );
};

export default FilterOption;
