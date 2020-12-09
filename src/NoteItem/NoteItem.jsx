import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import AppContext from '../AppContext';
import './NoteItem.css';

export default function NoteItem({ note, backOnDelete }) {
  const modifiedDate = new Date(note.modified);
  return (
    <AppContext.Consumer>
      {({ onDelNote }) => (
        <article className="note__item">
          <section className="note__item__title">
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
          </section>
          <section className="note__item__delete">
            <button
              type="button"
              onClick={() => {
                onDelNote(note.id);
                backOnDelete();
              }}
            >
              Delete Note
            </button>
          </section>
        </article>
      )}
    </AppContext.Consumer>
  );
}

NoteItem.propTypes = {
  note: PropTypes.objectOf(PropTypes.string),
  backOnDelete: PropTypes.func,
};

NoteItem.defaultProps = {
  note: [{
    id: '', name: '', modified: '', folderId: '', content: '',
  }],
  backOnDelete: () => {},
};
