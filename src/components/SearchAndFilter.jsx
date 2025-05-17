import PropTypes from "prop-types";
import { useCallback } from "react";
import { debounce } from "lodash";

const DEBOUNCE_DELAY = 300; // milliseconds
/**
 * Search and Filter component
 * It allows users to search and filter
 * characters by name, status, and gender
 *
 */

export default function SearchAndFilter({
  searchTerm,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  genderFilter,
  onGenderFilterChange,
}) {
  const debouncedSearch = useCallback(
    debounce((value) => onSearchChange(value), DEBOUNCE_DELAY),
    []
  );

  const handleSearchChange = (e) => {
    debouncedSearch(e.target.value);
  };

  return (
    <div className="controls">
      <div className="search-container">
        <input
          type="text"
          placeholder="Search characters..."
          defaultValue={searchTerm}
          onChange={handleSearchChange}
          aria-label="Search characters by name"
        />
        <span className="search-icon">🔍</span>
      </div>

      <div className="filter-group">
        <select
          value={statusFilter}
          onChange={(e) => onStatusFilterChange(e.target.value)}
          aria-label="Filter by character status"
        >
          <option value="">All Statuses</option>
          <option value="alive">Alive</option>
          <option value="dead">Dead</option>
          <option value="unknown">Unknown</option>
        </select>

        <select
          value={genderFilter}
          onChange={(e) => onGenderFilterChange(e.target.value)}
          aria-label="Filter by character gender"
        >
          <option value="">All Genders</option>
          <option value="female">Female</option>
          <option value="male">Male</option>
          <option value="genderless">Genderless</option>
          <option value="unknown">Unknown</option>
        </select>
      </div>
    </div>
  );
}

SearchAndFilter.propTypes = {
  searchTerm: PropTypes.string,
  onSearchChange: PropTypes.func.isRequired,
  statusFilter: PropTypes.string,
  onStatusFilterChange: PropTypes.func.isRequired,
  genderFilter: PropTypes.string,
  onGenderFilterChange: PropTypes.func.isRequired,
};
