import React, { useState } from 'react';

/**
 * NoteInput Component - Allows users to create new notes
 *
 * This component demonstrates:
 * - useState hook for managing form state
 * - Handling multiple input fields
 * - Form submission
 * - Conditional rendering
 */
function NoteInput({ onAddNote }) {
  // State for storing note data
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [color, setColor] = useState('#ffffff');
  const [tag, setTag] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  // Available colors for notes (Google Keep palette)
  const colors = [
    '#ffffff', // White
    '#f28b82', // Red
    '#fbbc04', // Yellow
    '#fff475', // Light Yellow
    '#ccff90', // Green
    '#a7ffeb', // Teal
    '#cbf0f8', // Light Blue
    '#aecbfa', // Blue
    '#d7aefb', // Purple
    '#fdcfe8', // Pink
    '#e6c9a8', // Brown
    '#e8eaed'  // Gray
  ];

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation: title or text must be filled
    if (title.trim() === '' && text.trim() === '') {
      alert('Please add a title or note content!');
      return;
    }

    // Create new note object
    const newNote = {
      id: Date.now(), // Simple unique ID
      title: title.trim(),
      text: text.trim(),
      color: color,
      tag: tag.trim(),
      isPinned: false,
      createdAt: new Date().toISOString()
    };

    // Call parent function to add note
    onAddNote(newNote);

    // Reset form
    setTitle('');
    setText('');
    setColor('#ffffff');
    setTag('');
    setIsExpanded(false);
  };

  return (
    <div className="note-input-container">
      <form onSubmit={handleSubmit} className="note-input-form">
        {/* Collapsed view - shows only text area */}
        {!isExpanded ? (
          <div
            className="note-input-collapsed"
            onClick={() => setIsExpanded(true)}
          >
            <input
              type="text"
              placeholder="Take a note..."
              readOnly
              className="note-input-placeholder"
            />
          </div>
        ) : (
          // Expanded view - shows all fields
          <div className="note-input-expanded" style={{ backgroundColor: color }}>
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="note-input-title"
              autoFocus
            />

            <textarea
              placeholder="Take a note..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="note-input-text"
              rows="3"
            />

            <input
              type="text"
              placeholder="Tag (e.g., personal, work)"
              value={tag}
              onChange={(e) => setTag(e.target.value)}
              className="note-input-tag"
            />

            {/* Color picker */}
            <div className="note-input-colors">
              {colors.map((c) => (
                <div
                  key={c}
                  className={`color-option ${color === c ? 'selected' : ''}`}
                  style={{ backgroundColor: c }}
                  onClick={() => setColor(c)}
                />
              ))}
            </div>

            {/* Action buttons */}
            <div className="note-input-actions">
              <button type="submit" className="btn-primary">
                Add Note
              </button>
              <button
                type="button"
                className="btn-secondary"
                onClick={() => {
                  setIsExpanded(false);
                  setTitle('');
                  setText('');
                  setColor('#ffffff');
                  setTag('');
                }}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}

export default NoteInput;
