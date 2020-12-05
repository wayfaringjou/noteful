import React from 'react';
import { Link } from 'react-router-dom';

export default function header() {
  return (
    <h1>
      <Link to="/">
        Noteful
      </Link>
    </h1>
  );
}
