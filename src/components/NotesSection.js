import React from 'react';
import NoteCard from './NoteCard';

/**
 * NotesSection Component
 * Displays a section of notes (pinned or unpinned) with a title
 */
function NotesSection({ title, notes, onDelete, onPin, onUpdate }) {
  if (notes.length === 0) return null;

  return (
    <section className="notes-section">
      <h2 className="section-title">{title}</h2>
      <div className="notes-grid">
        {notes.map((note) => (
          <NoteCard
            key={note.id}
            note={note}
            onDelete={onDelete}
            onPin={onPin}
            onUpdate={onUpdate}
          />
        ))}
      </div>
    </section>
  );
}

export default NotesSection;
