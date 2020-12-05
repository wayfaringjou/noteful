import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function FolderList({ folders, selected }) {
  return (
    <ul className="folder_list">
      {folders.map((folder) => {
        const isSelected = folder.id === selected;
        return (
          <li className="folder_list__item" key={folder.id}>
            <Link to={`/folder/${folder.id}`}>
              <button
                type="button"
                className={`folder_button ${isSelected
                  ? 'selected'
                  : ''}`}
              >
                {folder.name}
              </button>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

FolderList.propTypes = {
  folders: PropTypes.arrayOf(PropTypes.object),
  selected: PropTypes.string,
};

FolderList.defaultProps = {
  folders: [{ name: '', id: '' }],
  selected: '',
};
