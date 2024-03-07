import React, { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import NoteInput from "./components/NoteInput";
import NoteList from "./components/NoteList";
import "./App.css";

function App() {
  const [notes, setNotes] = useState(() => {
    const savedNotes = localStorage.getItem("notes");
    return savedNotes ? JSON.parse(savedNotes) : [];
  });

  const [activeTag, setActiveTag] = useState("");

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const addNote = (note) => {
    setNotes((prevNotes) => [...prevNotes, note]);
  };

  const removeNote = (id) => {
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
  };

  const updateNote = (id, newText) => {
    setNotes(
      notes.map((note) => {
        if (note.id === id) {
          return { ...note, text: newText };
        }
        return note;
      })
    );
  };

  const filteredNotes = activeTag
    ? notes.filter((note) => note.tags && note.tags.includes(activeTag))
    : notes;

  // Notları JSON dosyası olarak dışa aktar
  const handleExportNotes = () => {
    const fileName = "notes.json";
    const contentType = "application/json";
    const jsonNotes = JSON.stringify(notes, null, 2);
    const blob = new Blob([jsonNotes], { type: contentType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Notları JSON dosyasından içe aktar
  const handleImportNotes = (event) => {
    const file = event.target.files[0];
    if (!file) {
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const contents = e.target.result;
      try {
        const importedNotes = JSON.parse(contents);
        // Mevcut notlarla birleştir
        const newNotes = [...notes];
        importedNotes.forEach((importedNote) => {
          if (!newNotes.find((note) => note.id === importedNote.id)) {
            newNotes.push(importedNote);
          }
        });
        setNotes(newNotes);
      } catch (error) {
        console.error("Failed to import notes:", error);
        alert(
          "Failed to import notes. Please make sure the file is a valid JSON."
        );
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="app">
      <Sidebar
        notes={notes}
        setActiveTag={setActiveTag}
        activeTag={activeTag}
      />
      <div className="main-content">
        <NoteInput addNote={addNote} />
        <NoteList notes={filteredNotes} removeNote={removeNote} updateNote={updateNote} />
        <div>
          <button onClick={handleExportNotes}><b>Export notes</b></button>
          <button>
            <label htmlFor="fileInput"><b>Import notes</b></label>
            <input
              type="file"
              id="fileInput"
              onChange={handleImportNotes}
              accept=".json"
              className="fileInput"
              style={{ display: "none" }}
            />
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
