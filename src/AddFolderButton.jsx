import React from 'react';
import PropTypes from 'prop-types';

export default function AddFolderButton({ onAddFolder }) {
  return (
    <button type="button" onClick={(e) => onAddFolder(e.target.value)}>Add Folder</button>
  );
}

AddFolderButton.propTypes = {
  onAddFolder: PropTypes.func.isRequired,
};
