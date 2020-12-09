import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import AppContext from '../AppContext';
import './FolderList.css';

export default function FolderList({ folderId }) {
  return (
    <AppContext.Consumer>
      {({ folders }) => (
        <section className="sidebar__folder_list">
          <ul className="folder_list__items">
            {folders.map((folder) => {
              const isSelected = folder.id === folderId;
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
          <section className="sidebar__add_folder">
            <Link to="/add-folder">
              <button
                type="button"
              >
                Add Folder
              </button>
            </Link>
          </section>
        </section>
      )}
    </AppContext.Consumer>

  );
}

FolderList.propTypes = {
  folderId: PropTypes.string,
};

FolderList.defaultProps = {
  folderId: '',
};
