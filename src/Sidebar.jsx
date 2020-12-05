import React from 'react';
import PropTypes from 'prop-types';
import FolderList from './FolderList';
import AddFolderButton from './AddFolderButton';

export default function Sidebar({ folders, onAddFolder, selected }) {
  return (
    <section className="sidebar__folder_list">
      <FolderList folders={folders} selected={selected} />
      <section className="sidebar__add_folder">
        <AddFolderButton onAddFolder={onAddFolder} />
      </section>
    </section>
  );
}

Sidebar.propTypes = {
  folders: PropTypes.arrayOf(PropTypes.object),
  onAddFolder: PropTypes.func.isRequired,
  selected: PropTypes.string,
};

Sidebar.defaultProps = {
  folders: [{ name: '', id: '' }],
  selected: '',
};
