import React from 'react';
import TagFilter from './TagFilter';

/**
 * Sidebar Component
 * Contains the tag filter for note organization
 */
function Sidebar({ notes, selectedTag, onSelectTag }) {
  return (
    <aside className="sidebar">
      <TagFilter
        notes={notes}
        selectedTag={selectedTag}
        onSelectTag={onSelectTag}
      />
    </aside>
  );
}

export default Sidebar;
