import React from 'react';

function Sidebar({ notes, setActiveTag, activeTag }) {
  // Etiket listesini oluşturma
  const tags = [...new Set(notes.map(note => note.tags).flat())];

  return (
    <div className="sidebar">
      <h2>Tags</h2>
      <ul>
        {tags.map(tag => (
          <li
            key={tag}
            onClick={() => setActiveTag(tag)}
            className={tag === activeTag ? 'active-tag' : ''}
            style={{ cursor: 'pointer', fontWeight: tag === activeTag ? 'bold' : 'normal' }}
          >
            #{tag}
          </li>
        ))}
        <li onClick={() => setActiveTag('')} className={!activeTag ? 'active-tag' : ''} style={{ cursor: 'pointer', fontWeight: !activeTag ? 'bold' : 'normal' }}>
          All Notes
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
