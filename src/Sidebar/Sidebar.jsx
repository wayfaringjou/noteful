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
              noteId={noteId}
              onClickBack={() => history.push('/')}
            />
          </AppError>
        )
        : (
          <AppError>
            <FolderList folderId={folderId} />
          </AppError>
        )}
    </section>
  );
}
