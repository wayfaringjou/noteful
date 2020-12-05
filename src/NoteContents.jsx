import React from 'react';
// import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import dummyStore from './dummy-store';
import NoteItem from './NoteItem';

export default function NoteContents({ noteId }) {
  const { notes } = dummyStore;
  const note = notes.find((n) => n.id === noteId);
  return (
    <article className="note__contents">
      <section className="note__header">
        <NoteItem
          note={note}
        />
      </section>
      <section className="note__content">
        {note.content.split(/\n \r|\n/).map((par, i) => (
          // eslint-disable-next-line react/no-array-index-key
          <p key={i}>{par}</p>
        ))}
      </section>
    </article>
  );
}

NoteContents.propTypes = {
  noteId: PropTypes.string.isRequired,
};
