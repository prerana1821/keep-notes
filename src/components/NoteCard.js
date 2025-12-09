import React, { useState } from 'react';

/**
 * NoteCard Component - Displays individual notes
 *
 * This component demonstrates:
 * - Receiving props from parent
 * - Event handling (click, submit)
 * - Conditional rendering (view/edit mode)
 * - Arrow functions for event handlers
 */
function NoteCard({ note, onDelete, onPin, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(note.title);
  const [editText, setEditText] = useState(note.text);
  const [editTag, setEditTag] = useState(note.tag);

  // Handle save when editing
  const handleSave = (e) => {
    e.preventDefault();

    if (editTitle.trim() === '' && editText.trim() === '') {
      alert('Note cannot be empty!');
      return;
    }

    const updatedNote = {
      ...note,
      title: editTitle.trim(),
      text: editText.trim(),
      tag: editTag.trim()
    };

    onUpdate(updatedNote);
    setIsEditing(false);
  };

  // Handle cancel editing
  const handleCancel = () => {
    setEditTitle(note.title);
    setEditText(note.text);
    setEditTag(note.tag);
    setIsEditing(false);
  };

  return (
    <div className="note-card" style={{ backgroundColor: note.color }}>
      {!isEditing ? (
        // View Mode
        <>
          <div className="note-card-header">
            <h3 className="note-card-title">{note.title || 'Untitled'}</h3>
            <button
              className="btn-icon pin-btn"
              onClick={() => onPin(note.id)}
              title={note.isPinned ? 'Unpin' : 'Pin'}
            >
              {note.isPinned ? '📌' : '📍'}
            </button>
          </div>

          <p className="note-card-text">{note.text}</p>

          {note.tag && (
            <div className="note-card-tag">
              <span className="tag">#{note.tag}</span>
            </div>
          )}

          <div className="note-card-actions">
            <button
              className="btn-small"
              onClick={() => setIsEditing(true)}
            >
              Edit
            </button>
            <button
              className="btn-small btn-delete"
              onClick={() => {
                if (window.confirm('Are you sure you want to delete this note?')) {
                  onDelete(note.id);
                }
              }}
            >
              Delete
            </button>
          </div>
        </>
      ) : (
        // Edit Mode
        <form onSubmit={handleSave}>
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            placeholder="Title"
            className="note-edit-title"
            autoFocus
          />

          <textarea
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            placeholder="Note content..."
            className="note-edit-text"
            rows="4"
          />

          <input
            type="text"
            value={editTag}
            onChange={(e) => setEditTag(e.target.value)}
            placeholder="Tag"
            className="note-edit-tag"
          />

          <div className="note-card-actions">
            <button type="submit" className="btn-small">
              Save
            </button>
            <button
              type="button"
              className="btn-small btn-secondary"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default NoteCard;
