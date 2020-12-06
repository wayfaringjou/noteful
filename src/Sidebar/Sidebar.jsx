import React from 'react';
// import PropTypes from 'prop-types';
import FolderList from '../FolderList/FolderList';

export default function Sidebar() {
  return (
    <section className="sidebar__folder_list">
      <FolderList />
      <section className="sidebar__add_folder">
        <button
          type="button"
          onClick=""
        >
          Add Folder
        </button>
      </section>
    </section>
  );
}
