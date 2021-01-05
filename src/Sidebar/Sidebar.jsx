import React from 'react';
// import PropTypes from 'prop-types';
import { useParams, useHistory } from 'react-router-dom';
import FolderList from '../FolderList/FolderList';
import NoteSidebar from '../NoteSidebar/NoteSidebar';
import AppError from '../AppError';

export default function Sidebar() {
  const { noteId, folderId } = useParams();
  const history = useHistory();
  return (
    <section className="sidebar">
      {noteId
        ? (
          <AppError>
            <NoteSidebar
              noteId={parseInt(noteId, 10)}
              onClickBack={() => history.push('/')}
            />
          </AppError>
        )
        : (
          <AppError>
            <FolderList folderId={parseInt(folderId, 10)} />
          </AppError>
        )}
    </section>
  );
}
