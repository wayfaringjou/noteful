import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import ValidationError from '../ValidationError/ValidationError';

let inputTouched = {};

export default function AddFolder({
  newFolder, onNameChange, handleGoBack, onNewFolderSubmit, folders,
}) {
  const validateInputs = (newFolderItem, foldersData) => {
    const { name } = newFolderItem;
    if (name.length === 0) {
      return 'Name is required';
    } if (foldersData.find((i) => i.name === name)) {
      return 'Folder with this name already exists';
    }
    return null;
  };
  const errors = validateInputs(newFolder, folders);

  useEffect(() => {});

  return (
    <form
      className="add_folder_form"
      onSubmit={(e) => {
        onNewFolderSubmit(e);
        onNameChange('');
        inputTouched = {};
        handleGoBack();
      }}
    >
      <fieldset>
        <legend>
          <h2>Add Folder</h2>
        </legend>
        {inputTouched.folderName && (<ValidationError message={errors} />)}
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
        <button type="submit" disabled={errors}>Add New Folder</button>
        <button
          type="button"
          onClick={() => {
            onNameChange('');
            inputTouched = {};
            handleGoBack();
          }}
        >
          Cancel
        </button>
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
