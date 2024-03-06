import React, { useState } from 'react';

function NoteList({ notes, removeNote, updateNote }) {
  // Düzenlenmekte olan notun ID'sini tutacak state
  const [editingId, setEditingId] = useState(null);
  // Düzenlenmekte olan notun geçici metnini tutacak state
  const [editingText, setEditingText] = useState('');

  // Düzenleme modunu başlat
  const startEditing = (note) => {
    setEditingId(note.id);
    setEditingText(note.text);
  };

  // Düzenlemeyi kaydet
  const saveEdit = () => {
    updateNote(editingId, editingText);
    setEditingId(null);
    setEditingText('');
  };

  return (
    <div className="note-list">
      {notes.map(note => (
        <div key={note.id} className="note">
          {editingId === note.id ? (
            // Düzenleme modu aktifse, bir textarea ve Kaydet butonu göster
            <>
              <textarea
                value={editingText}
                onChange={(e) => setEditingText(e.target.value)}
              />
              <button onClick={saveEdit}>Kaydet</button>
            </>
          ) : (
            // Düzenleme modu pasifse, notu ve düzenle butonunu göster
            <>
              <p onDoubleClick={() => startEditing(note)}>{note.text}</p>
              <div className="tags">
                {note.tags.map(tag => `#${tag} `)}
              </div>
            </>
          )}
          {/* Silme butonu */}
          <button onClick={() => removeNote(note.id)} className="delete-note">X</button>
        </div>
      ))}
    </div>
  );
}

export default NoteList;
