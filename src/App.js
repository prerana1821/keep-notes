import React, { useState, useEffect } from 'react';
import './App.css';
import NoteInput from './components/NoteInput';
import NoteCard from './components/NoteCard';
import TagFilter from './components/TagFilter';

/**
 * Main App Component - Google Keep Clone
 *
 * This component demonstrates:
 * - useState for managing application state
 * - useEffect for localStorage persistence
 * - Lifting state up (child components communicate through parent)
 * - Filtering and sorting arrays
 * - Props passing to child components
 */
function App() {
  // State management
  const [notes, setNotes] = useState([]);
  const [selectedTag, setSelectedTag] = useState('');

  // Load notes from localStorage when component mounts
  useEffect(() => {
    const savedNotes = localStorage.getItem('keepNotes');
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes));
    }
  }, []); // Empty dependency array = runs once on mount

  // Save notes to localStorage whenever notes change
  useEffect(() => {
    localStorage.setItem('keepNotes', JSON.stringify(notes));
  }, [notes]); // Runs whenever 'notes' changes

  // Add a new note
  const handleAddNote = (newNote) => {
    setNotes([newNote, ...notes]); // Add to beginning of array
  };

  // Delete a note
  const handleDeleteNote = (id) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  // Toggle pin status
  const handlePinNote = (id) => {
    setNotes(notes.map(note =>
      note.id === id ? { ...note, isPinned: !note.isPinned } : note
    ));
  };

  // Update a note
  const handleUpdateNote = (updatedNote) => {
    setNotes(notes.map(note =>
      note.id === updatedNote.id ? updatedNote : note
    ));
  };

  // Filter notes by selected tag
  const filteredNotes = selectedTag === ''
    ? notes
    : notes.filter(note => note.tag === selectedTag);

  // Separate pinned and unpinned notes
  const pinnedNotes = filteredNotes.filter(note => note.isPinned);
  const unpinnedNotes = filteredNotes.filter(note => !note.isPinned);

  return (
    <div className="App">
      {/* Header */}
      <header className="app-header">
        <div className="header-content">
          <h1 className="app-title">
            <span style={{ color: '#fbbc04' }}>K</span>
            <span style={{ color: '#ea4335' }}>e</span>
            <span style={{ color: '#4285f4' }}>e</span>
            <span style={{ color: '#34a853' }}>p</span>
            {' '}Notes
          </h1>
          <p className="app-subtitle">Simple. Beautiful. Organized.</p>
        </div>
      </header>

      {/* Main content */}
      <div className="app-container">
        {/* Sidebar with tag filter */}
        <aside className="sidebar">
          <TagFilter
            notes={notes}
            selectedTag={selectedTag}
            onSelectTag={setSelectedTag}
          />
        </aside>

        {/* Main content area */}
        <main className="main-content">
          {/* Note input component */}
          <NoteInput onAddNote={handleAddNote} />

          {/* Display notes count */}
          {selectedTag && (
            <div className="filter-info">
              Showing notes tagged with <strong>#{selectedTag}</strong>
              <button
                className="clear-filter"
                onClick={() => setSelectedTag('')}
              >
                Clear filter
              </button>
            </div>
          )}

          {/* Pinned notes section */}
          {pinnedNotes.length > 0 && (
            <section className="notes-section">
              <h2 className="section-title">Pinned</h2>
              <div className="notes-grid">
                {pinnedNotes.map((note) => (
                  <NoteCard
                    key={note.id}
                    note={note}
                    onDelete={handleDeleteNote}
                    onPin={handlePinNote}
                    onUpdate={handleUpdateNote}
                  />
                ))}
              </div>
            </section>
          )}

          {/* Other notes section */}
          {unpinnedNotes.length > 0 && (
            <section className="notes-section">
              <h2 className="section-title">
                {pinnedNotes.length > 0 ? 'Others' : 'All Notes'}
              </h2>
              <div className="notes-grid">
                {unpinnedNotes.map((note) => (
                  <NoteCard
                    key={note.id}
                    note={note}
                    onDelete={handleDeleteNote}
                    onPin={handlePinNote}
                    onUpdate={handleUpdateNote}
                  />
                ))}
              </div>
            </section>
          )}

          {/* Empty state */}
          {filteredNotes.length === 0 && (
            <div className="empty-state">
              <p className="empty-state-icon">📝</p>
              <p className="empty-state-text">
                {selectedTag
                  ? `No notes with tag "${selectedTag}"`
                  : 'No notes yet. Create your first note above!'}
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
