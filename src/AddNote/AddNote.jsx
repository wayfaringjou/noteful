import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import ValidationError from '../ValidationError/ValidationError';
import './AddNote.css';

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
    if (folderId === 0) {
      return 'The note has to be assigned to a folder';
    }
    return null;
  };

  const nameErrors = validateName();
  const contentErrors = validateContent();
  const folderIdErrors = validateFolderId();

  let clearPage = false;
  useEffect(() => {
    onInputChange({
      name: '', content: '', folderId: 0,
    });
    inputTouched = {};
  }, [clearPage]);

  return (
    <form
      className="add_note_form"
      onSubmit={(e) => {
        onNewNoteSubmit(e);
        clearPage = true;
        handleGoBack();
      }}
    >
      <fieldset>
        <legend>
          <h2>Add Note</h2>
        </legend>
        <div className="note_form_container">
          <label htmlFor="noteName">
            <span className="note_form_label">Note Name</span>
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
          {inputTouched.noteName && (<ValidationError message={nameErrors} />)}

          <label htmlFor="noteContent">
            <span className="note_form_label">Note Content</span>
            <textarea
              className="input_note_name"
              name="noteContent"
              id="noteContent"
              onChange={(e) => {
                onInputChange({ ...newNote, content: e.target.value });
                inputTouched[e.target.name] = true;
              }}
            />
          </label>
          {inputTouched.noteContent && (<ValidationError message={contentErrors} />)}

          <label htmlFor="noteFolderId">
            <select
              name="noteFolderId"
              id="noteFolderId"
              onChange={(e) => {
                onInputChange({ ...newNote, folderId: parseInt(e.target.value, 10) });
                inputTouched[e.target.name] = true;
              }}
            >
              <option value={0}>Select a folder</option>
              {folders.map((i) => (
                <option
                  value={i.id}
                  key={i.id}
                >
                  {i.name}
                </option>
              ))}
            </select>
          </label>
          {inputTouched.noteFolderId && (<ValidationError message={folderIdErrors} />)}

          <button
            type="submit"
            disabled={nameErrors || contentErrors || folderIdErrors}
          >
            Add New Note
          </button>
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

AddNote.propTypes = {
  newNote: PropTypes.shape({
    name: PropTypes.string,
    id: PropTypes.number,
    folderId: PropTypes.number,
    content: PropTypes.string,
  }),
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
    folderId: 0,
  },
  folders: [],
};
