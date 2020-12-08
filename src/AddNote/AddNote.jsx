import React from 'react';
import PropTypes from 'prop-types';
import ValidationError from '../ValidationError/ValidationError';

let inputTouched = {};

export default function AddNote({
  newNote, onInputChange, handleGoBack, onNewNoteSubmit, folders,
}) {
  const validateName = () => {
    const { name } = newNote;
    if (name.length === 0) {
      return 'Name is required';
    }
    return null;
  };

  const validateContent = () => {
    const { content } = newNote;
    if (content.length === 0) {
      return "Note can't be empty";
    }
    return null;
  };

  const validateFolderId = () => {
    const { folderId } = newNote;
    if (folderId === 'none') {
      return 'The note has to be assigned to a folder';
    }
    return null;
  };

  console.log(newNote);
  const nameErrors = validateName();
  const contentErrors = validateContent();
  const folderIdErrors = validateFolderId();

  return (
    <form
      className="add_note_form"
      onSubmit={(e) => {
        onNewNoteSubmit(e);
        onInputChange({ name: '', content: '', folderId: '' });
        inputTouched = {};
        handleGoBack();
      }}
    >
      <fieldset>
        <legend>
          <h2>Add Note</h2>
          {inputTouched.noteName && (<ValidationError message={nameErrors} />)}
          <label htmlFor="noteName">
            Note Name
            <input
              className="input_note_name"
              type="text"
              name="noteName"
              id="noteName"
              onChange={(e) => {
                onInputChange({ ...newNote, name: e.target.value });
                inputTouched[e.target.name] = true;
              }}
            />
          </label>
          {inputTouched.noteContent && (<ValidationError message={contentErrors} />)}
          <label htmlFor="noteContent">
            Note Content
            <input
              className="input_note_name"
              type="text"
              name="noteContent"
              id="noteContent"
              onChange={(e) => {
                onInputChange({ ...newNote, content: e.target.value });
                inputTouched[e.target.name] = true;
              }}
            />
          </label>
          {inputTouched.noteFolderId && (<ValidationError message={folderIdErrors} />)}
          <label htmlFor="noteFolderId">
            <select
              name="noteFolderId"
              id="noteFolderId"
              onChange={(e) => {
                onInputChange({ ...newNote, folderId: e.target.value });
                inputTouched[e.target.name] = true;
              }}
            >
              <option value="none">Select a folder</option>
              {folders.map((i) => (
                <option
                  value={i.name}
                  key={i.id}
                >
                  {i.name}
                </option>
              ))}
            </select>
          </label>
        </legend>
      </fieldset>
    </form>
  );
}

AddNote.propTypes = {
  newNote: PropTypes.objectOf(PropTypes.string),
  onInputChange: PropTypes.func.isRequired,
  onNewNoteSubmit: PropTypes.func.isRequired,
  handleGoBack: PropTypes.func,
  folders: PropTypes.arrayOf(PropTypes.object),
};

AddNote.defaultProps = {
  handleGoBack: () => {},
  newNote: {
    name: '',
    content: '',
    folderId: '',
  },
  folders: [],
};
