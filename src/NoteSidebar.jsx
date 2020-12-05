import React from 'react';
import PropTypes from 'prop-types';
import dummyStore from './dummy-store';

export default function NoteSidebar({ noteId, onClickBack }) {
  const { folders, notes } = dummyStore;
  const { folderId } = notes.find((n) => n.id === noteId);
  const folder = folders.find((f) => f.id === folderId);
  return (
    <section className="note__sidebar">
      <button type="button" onClick={onClickBack}>
        Go back
      </button>
      <h2 className="folder_name">{folder.name}</h2>
    </section>
  );
}

NoteSidebar.propTypes = {
  noteId: PropTypes.string.isRequired,
  onClickBack: PropTypes.func.isRequired,
};
