import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import AppContext from '../AppContext';
import NoteItem from '../NoteItem/NoteItem';
import './NoteList.css';

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
        <section className="notes_list">
          <ul className="notes_list_items">
            {folderId
              ? renderList(filterNotes(notes, folderId))
              : renderList(notes) }
          </ul>
          <section className="main__add_note">
            <Link to="/add-note">
              <button
                type="button"
              >
                Add note
              </button>
            </Link>
          </section>
        </section>
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
