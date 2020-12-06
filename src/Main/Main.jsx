import React from 'react';
import { useParams } from 'react-router-dom';
import NoteContents from '../NoteContents/NoteContents';
import NoteList from '../NoteList/NoteList';

export default function Main() {
  const { folderId, noteId } = useParams();

  return (
    <section className="main__notes_list">
      {noteId
        ? (
          <NoteContents
            noteId={noteId}
          />
        )

        : (
          <NoteList
            folderId={folderId}
          />
        )}
      <section className="main__add_note">
        <button
          type="button"
          onClick=""
        >
          Add note
        </button>
      </section>
    </section>
  );
}
