import React from 'react';
import PropTypes from 'prop-types';

export default function AddNodeButton({ onAddNote }) {
  return (
    <button
      type="button"
      onClick={(e) => onAddNote(e.target.value)}
    >
      Add note
    </button>
  );
}

AddNodeButton.propTypes = {
  onAddNote: PropTypes.func.isRequired,
};
