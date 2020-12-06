import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import AppContext from '../AppContext';

export default function NoteItem({ note }) {
  const modifiedDate = new Date(note.modified);
  return (
    <AppContext.Consumer>
      {({ onDelNote }) => (
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
          <button
            type="button"
            onClick={() => {
              onDelNote(note.id);
            }}
          >
            Delete Note
          </button>
        </article>
      )}
    </AppContext.Consumer>
  );
}

NoteItem.propTypes = {
  note: PropTypes.objectOf(PropTypes.string),
};

NoteItem.defaultProps = {
  note: [{
    id: '', name: '', modified: '', folderId: '', content: '',
  }],
};
