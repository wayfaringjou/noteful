import React from 'react';
import { useParams, useHistory } from 'react-router-dom';
import NoteContents from '../NoteContents/NoteContents';
import NoteList from '../NoteList/NoteList';

export default function Main() {
  const { folderId, noteId } = useParams();
  const history = useHistory();

  return (
    <section className="main__notes_list">
      {noteId
        ? <NoteContents noteId={noteId} backOnDelete={() => history.push('/')} />
        : <NoteList folderId={folderId} />}
    </section>
  );
}
