import React from 'react';
// import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import NoteItem from '../NoteItem/NoteItem';
import AppContext from '../AppContext';

const matchNote = (notesData, noteItemId) => notesData.find((n) => n.id === noteItemId);

export default function NoteContents({ noteId }) {
  return (
    <AppContext.Consumer>
      {({ notes }) => (
        <article className="note__contents">
          <section className="note__header">
            <NoteItem
              note={matchNote(notes, noteId)}
            />
          </section>
          <section className="note__content">
            {matchNote(notes, noteId)
              .content.split(/\n \r|\n/).map((par, i) => (
              // eslint-disable-next-line react/no-array-index-key
                <p key={i}>{par}</p>
              ))}
          </section>
        </article>
      )}
    </AppContext.Consumer>
  );
}

NoteContents.propTypes = {
  noteId: PropTypes.string.isRequired,
};
