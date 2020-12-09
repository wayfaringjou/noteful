import React from 'react';
import { useParams, useHistory } from 'react-router-dom';
import NoteContents from '../NoteContents/NoteContents';
import NoteList from '../NoteList/NoteList';
import AppError from '../AppError';
import './Main.css';

export default function Main() {
  const { folderId, noteId } = useParams();
  const history = useHistory();

  return (
    <section className="main__notes">
      {noteId
        ? <AppError><NoteContents noteId={noteId} backOnDelete={() => history.push('/')} /></AppError>
        : <AppError><NoteList folderId={folderId} /></AppError>}
    </section>
  );
}
