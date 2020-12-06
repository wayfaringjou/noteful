import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import AppContext from '../AppContext';

export default function FolderList({ selected }) {
  return (
    <AppContext.Consumer>
      {({ folders }) => (
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
      )}
    </AppContext.Consumer>

  );
}

FolderList.propTypes = {
  selected: PropTypes.string,
};

FolderList.defaultProps = {
  selected: '',
};
