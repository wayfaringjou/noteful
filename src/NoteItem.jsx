import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function NoteItem({ note, onDelNote }) {
  const modifiedDate = new Date(note.modified);
  return (
    <article className="note__header">
      <h2>
        <Link to={`/note/${note.id}`}>
          {note.name}
        </Link>
      </h2>
      <p>
        Date modified:
        <span className="modified">
          {modifiedDate.toDateString()}
        </span>
      </p>
      <button type="button" onClick={(noteId) => { onDelNote(noteId); }}>Delete Note</button>
    </article>
  );
}

NoteItem.propTypes = {
  note: PropTypes.objectOf(PropTypes.string),
  onDelNote: PropTypes.func.isRequired,
};

NoteItem.defaultProps = {
  note: [{
    id: '', name: '', modified: '', folderId: '', content: '',
  }],
};
