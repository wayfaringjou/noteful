import React from 'react';
import PropTypes from 'prop-types';

export default function ValidationError({ message }) {
  if (message) {
    return (
      <div className="error">{message}</div>
    );
  }
  return <></>;
}

ValidationError.propTypes = {
  message: PropTypes.string,
};

ValidationError.defaultProps = {
  message: null,
};
