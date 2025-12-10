import React from 'react';

/**
 * FilterInfo Component
 * Shows the currently selected tag filter with option to clear
 */
function FilterInfo({ selectedTag, onClearFilter }) {
  if (!selectedTag) return null;

  return (
    <div className="filter-info">
      Showing notes tagged with <strong>#{selectedTag}</strong>
      <button
        className="clear-filter"
        onClick={onClearFilter}
      >
        Clear filter
      </button>
    </div>
  );
}

export default FilterInfo;
