import React from 'react';
import PropTypes from 'prop-types';
import AppContext from '../AppContext';
import NoteItem from '../NoteItem/NoteItem';

const filterNotes = (notesData, folderItemId) => (
  notesData.filter((i) => i.folderId === folderItemId)
);

const renderList = (notes) => (
  notes.map((note) => (
    <li className="notes_list__item" key={note.id}>
      <NoteItem note={note} />
    </li>
  ))
);

export default function NoteList({ folderId }) {
  return (
    <AppContext.Consumer>
      {({ notes }) => (
        <ul className="notes_list">
          {folderId
            ? renderList(filterNotes(notes, folderId))
            : renderList(notes) }
        </ul>
      )}
    </AppContext.Consumer>
  );
}

NoteList.propTypes = {
  folderId: PropTypes.string,
};

NoteList.defaultProps = {
  folderId: '',
};
