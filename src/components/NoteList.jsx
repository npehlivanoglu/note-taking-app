import React from 'react';

function NoteList({ notes, removeNote }) {
  return (
    <div className="note-list">
      {notes.map(note => (
        <div key={note.id} className="note">
          <p>{note.text}</p>
          <div className="tags">
            {note.tags.map(tag => `#${tag} `)}
          </div>
          {/* Silme butonu */}
          <button onClick={() => removeNote(note.id)} className="delete-note">X</button>
        </div>
      ))}
    </div>
  );
}


export default NoteList;
