import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import ValidationError from '../ValidationError/ValidationError';
import './AddFolder.css';

let inputTouched = {};

export default function AddFolder({
  newFolder, onNameChange, handleGoBack, onNewFolderSubmit, folders,
}) {
  const validateInputs = (newFolderItem, foldersData) => {
    let { name } = newFolderItem;
    name = name.trim();
    if (name.length === 0) {
      return 'Name is required';
    } if (foldersData.find((i) => i.name === name)) {
      return 'Folder with this name already exists';
    }
    return null;
  };
  const errors = validateInputs(newFolder, folders);

  let clearPage = false;
  useEffect(() => {
    onNameChange('');
    inputTouched = {};
  }, [clearPage]);

  return (
    <form
      className="add_folder_form"
      onSubmit={(e) => {
        onNewFolderSubmit(e);
        clearPage = true;
        handleGoBack();
      }}
    >
      <fieldset>
        <legend>
          <h2>Add Folder</h2>
        </legend>
        <div className="folder_form_container">
          <label htmlFor="folderName">
            Folder Name
            <input
              className="input_folder_name"
              type="text"
              name="folderName"
              id="folderName"
              onChange={(e) => {
                onNameChange(e.target.value);
                inputTouched[e.target.name] = true;
              }}
            />
          </label>
          {inputTouched.folderName && (<ValidationError message={errors} />)}
          <button type="submit" disabled={errors}>Add New Folder</button>
          <button
            type="button"
            onClick={() => {
              clearPage = true;
              handleGoBack();
            }}
          >
            Cancel
          </button>
        </div>
      </fieldset>
    </form>
  );
}

AddFolder.propTypes = {
  newFolder: PropTypes.objectOf(PropTypes.string),
  onNameChange: PropTypes.func.isRequired,
  onNewFolderSubmit: PropTypes.func.isRequired,
  handleGoBack: PropTypes.func,
  folders: PropTypes.arrayOf(PropTypes.object),
};

AddFolder.defaultProps = {
  handleGoBack: () => {},
  newFolder: {
    name: '',
  },
  folders: [],
};
