import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import NoteInput from './components/NoteInput';
import NoteList from './components/NoteList';
import './App.css'; // Opsiyonel: Uygulamanız için özel CSS

function App() {
  // LocalStorage'dan notları yükleme veya boş bir dizi başlatma
  const [notes, setNotes] = useState(() => {
    const savedNotes = localStorage.getItem('notes');
    return savedNotes ? JSON.parse(savedNotes) : [];
  });

  const [activeTag, setActiveTag] = useState('');

  // Notlar değiştiğinde LocalStorage'a kaydet
  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  const addNote = (note) => {
    setNotes(prevNotes => [...prevNotes, note]);
  };

  const removeNote = (id) => {
    setNotes(prevNotes => prevNotes.filter(note => note.id !== id));
  };

  // Aktif etikete göre notları filtrele
  const filteredNotes = activeTag
    ? notes.filter(note => note.tags && note.tags.includes(activeTag))
    : notes;

  return (
    <div className="app">
      <Sidebar notes={notes} setActiveTag={setActiveTag} activeTag={activeTag}/>
      <div className="main-content">
        <NoteInput addNote={addNote} />
        <NoteList notes={filteredNotes} removeNote={removeNote} />
      </div>
    </div>
  );
}

export default App;
