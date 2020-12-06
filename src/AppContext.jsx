import React from 'react';

const AppContext = React.createContext({
  notes: [],
  folders: [],
  onDelNote: () => {},
});

export default AppContext;
