import React, { useState } from 'react';

function NoteInput({ addNote }) {
  const [note, setNote] = useState('');
  const [tags, setTags] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    addNote({
      id: Date.now(),
      text: note,
      tags: tags.split(',').map(tag => tag.trim()),
    });
    setNote('');
    setTags('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Type your note here..."
      />
      <input
        type="text"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        placeholder="Tags (comma-separated)"
      />
      <button type="submit">Add Note</button>
    </form>
  );
}

export default NoteInput;
