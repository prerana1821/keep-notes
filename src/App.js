import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import NoteInput from './components/NoteInput';
import FilterInfo from './components/FilterInfo';
import NotesSection from './components/NotesSection';
import EmptyState from './components/EmptyState';

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
      <Header />

      <div className="app-container">
        <Sidebar
          notes={notes}
          selectedTag={selectedTag}
          onSelectTag={setSelectedTag}
        />

        <main className="main-content">
          <NoteInput onAddNote={handleAddNote} />

          <FilterInfo
            selectedTag={selectedTag}
            onClearFilter={() => setSelectedTag('')}
          />

          <NotesSection
            title="Pinned"
            notes={pinnedNotes}
            onDelete={handleDeleteNote}
            onPin={handlePinNote}
            onUpdate={handleUpdateNote}
          />

          <NotesSection
            title={pinnedNotes.length > 0 ? 'Others' : 'All Notes'}
            notes={unpinnedNotes}
            onDelete={handleDeleteNote}
            onPin={handlePinNote}
            onUpdate={handleUpdateNote}
          />

          {filteredNotes.length === 0 && (
            <EmptyState
              hasFilter={!!selectedTag}
              selectedTag={selectedTag}
            />
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
