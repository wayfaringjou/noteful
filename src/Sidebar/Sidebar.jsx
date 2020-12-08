import React from 'react';
// import PropTypes from 'prop-types';
import { useParams, useHistory } from 'react-router-dom';
import FolderList from '../FolderList/FolderList';
import NoteSidebar from '../NoteSidebar/NoteSidebar';

export default function Sidebar() {
  const { noteId, folderId } = useParams();
  const history = useHistory();
  return (
    <section className="sidebar">
      {noteId
        ? (
          <NoteSidebar
            noteId={noteId}
            onClickBack={() => history.push('/')}
          />
        )
        : <FolderList folderId={folderId} />}
    </section>
  );
}
