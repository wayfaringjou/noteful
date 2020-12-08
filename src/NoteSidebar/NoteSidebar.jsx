import React from 'react';
import PropTypes from 'prop-types';
import AppContext from '../AppContext';

const getFolderName = (notesData, foldersData, noteItemId) => {
  const folderItemId = notesData.find((n) => n.id === noteItemId).folderId;
  return foldersData.find((f) => f.id === folderItemId).name;
};

export default function NoteSidebar({ noteId, onClickBack }) {
  return (
    <AppContext.Consumer>
      {({ notes, folders }) => (
        <section className="note__sidebar">
          <button type="button" onClick={onClickBack}>
            Go back
          </button>
          <h2 className="folder_name">
            {getFolderName(notes, folders, noteId)}
          </h2>
        </section>
      )}
    </AppContext.Consumer>
  );
}

NoteSidebar.propTypes = {
  noteId: PropTypes.string.isRequired,
  onClickBack: PropTypes.func.isRequired,
};
