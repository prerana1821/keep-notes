import React from 'react';

/**
 * TagFilter Component - Displays and filters notes by tags
 *
 * This component demonstrates:
 * - Using map() to render lists
 * - Keys in lists
 * - Filtering unique values
 * - Sorting arrays
 */
function TagFilter({ notes, selectedTag, onSelectTag }) {
  // Extract all unique tags from notes and sort alphabetically
  const allTags = notes
    .map(note => note.tag)
    .filter(tag => tag !== '') // Remove empty tags
    .filter((tag, index, self) => self.indexOf(tag) === index) // Get unique tags
    .sort(); // Sort alphabetically

  return (
    <div className="tag-filter">
      <h3 className="tag-filter-title">Filter by Tags</h3>

      <div className="tag-list">
        {/* "All Notes" option */}
        <button
          className={`tag-button ${selectedTag === '' ? 'active' : ''}`}
          onClick={() => onSelectTag('')}
        >
          All Notes ({notes.length})
        </button>

        {/* Render each tag using map() */}
        {allTags.map((tag) => {
          // Count notes with this tag
          const count = notes.filter(note => note.tag === tag).length;

          return (
            <button
              key={tag} // Important: unique key for each list item
              className={`tag-button ${selectedTag === tag ? 'active' : ''}`}
              onClick={() => onSelectTag(tag)}
            >
              #{tag} ({count})
            </button>
          );
        })}

        {/* Show message when no tags exist */}
        {allTags.length === 0 && (
          <p className="no-tags-message">
            No tags yet. Add tags to your notes to filter them!
          </p>
        )}
      </div>
    </div>
  );
}

export default TagFilter;
