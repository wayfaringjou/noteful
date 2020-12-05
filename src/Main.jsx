import React from 'react';
import PropTypes from 'prop-types';
import NoteList from './NoteList';
import AddNoteButton from './AddNoteButton';

export default function Main({ notes, onAddNote, onDelNote }) {
  return (
    <section className="main__notes_list">
      <NoteList notes={notes} onDelNote={(noteId) => onDelNote(noteId)} />
      <section className="main__add_note">
        <AddNoteButton onAddNote={onAddNote} />
      </section>
    </section>
  );
}

Main.propTypes = {
  notes: PropTypes.arrayOf(PropTypes.object),
  onAddNote: PropTypes.func.isRequired,
  onDelNote: PropTypes.func.isRequired,
};

Main.defaultProps = {
  notes: [{
    id: '', name: '', modified: '', folderId: '', content: '',
  }],
};
