import React from 'react';
import PropTypes from 'prop-types';
import NoteItem from './NoteItem';

export default function NoteList({ notes }) {
  return (
    <ul className="notes_list">
      {notes.map((note) => (
        <li className="notes_list__item" key={note.id}>
          <NoteItem note={note} />
        </li>
      ))}
    </ul>
  );
}

NoteList.propTypes = {
  notes: PropTypes.arrayOf(PropTypes.object),
};

NoteList.defaultProps = {
  notes: [{
    id: '', name: '', modified: '', folderId: '', content: '',
  }],
};
