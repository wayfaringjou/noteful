import React from 'react';
// import PropTypes from 'prop-types';

export default function NoteSidebar() {
  // const { folderId } = notes.find((n) => n.id === noteId);
  // const folder = folders.find((f) => f.id === folderId);
  return (
    <section className="note__sidebar">
      <button type="button" onClick="">
        Go back
      </button>
      <h2 className="folder_name">Folder Name</h2>
    </section>
  );
}
