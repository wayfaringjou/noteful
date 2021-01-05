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
              <Link to={`/note/${parseInt(note.id, 10)}`}>
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
                onDelNote(parseInt(note.id, 10));
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
  note: PropTypes.shape({
    name: PropTypes.string,
    id: PropTypes.number,
    modified: PropTypes.string,
    folderId: PropTypes.number,
    content: PropTypes.string,
  }),
  backOnDelete: PropTypes.func,
};

NoteItem.defaultProps = {
  note: [{
    id: '', name: '', modified: '', folderId: 0, content: '',
  }],
  backOnDelete: () => {},
};
