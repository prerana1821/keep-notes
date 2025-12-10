import React from 'react';

/**
 * EmptyState Component
 * Displays when there are no notes to show
 */
function EmptyState({ hasFilter, selectedTag }) {
  return (
    <div className="empty-state">
      <p className="empty-state-icon">📝</p>
      <p className="empty-state-text">
        {hasFilter
          ? `No notes with tag "${selectedTag}"`
          : 'No notes yet. Create your first note above!'}
      </p>
    </div>
  );
}

export default EmptyState;
