import React, { useState, useEffect } from 'react';
import { Route } from 'react-router-dom';
import config from './config';
import Header from './Header';
import Main from './Main/Main';
import Sidebar from './Sidebar/Sidebar';
import AddFolder from './AddFolder/AddFolder';
import AddNote from './AddNote/AddNote';
import AppContext from './AppContext';

function App() {
  const [folders, setFolders] = useState([]);
  const [notes, setNotes] = useState([]);
  const [newFolder, setNewFolder] = useState({ name: '' });
  const [newNote, setNewNote] = useState({ name: '', content: '', folderId: '' });
  const [errorMsg, setErrorMsg] = useState('');
  const [page, setPage] = useState(1);

  const addNew = (e, type, data) => {
    e.preventDefault();
    fetch(`${config.API_ENDPOINT}/${type}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(data),
    })
      .then(setPage(page + 1));
  };

  const delNote = (noteId) => {
    fetch(`${config.API_ENDPOINT}/notes/${noteId}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
      },
    })
      .then(setPage(page + 1));
  };

  const fetchData = (url, options, callback) => {
    fetch(url, options)
      .then((res) => {
        if (!res.ok) {
          return res.json().then((error) => { throw error; });
        }
        return res.json();
      })
      .then((data) => {
        callback(data);
      })
      .catch((error) => {
        setErrorMsg(error);
      });
  };

  useEffect(() => {
    fetchData(`${config.API_ENDPOINT}/folders`, { method: 'GET' }, setFolders);
    fetchData(`${config.API_ENDPOINT}/notes`, { method: 'GET' }, setNotes);
  }, [page]);

  const sidebarRoutes = () => (
    <>
      <Route exact path="/" component={Sidebar} />
      <Route exact path="/note/:noteId" component={Sidebar} />
      <Route exact path="/folder/:folderId" component={Sidebar} />
    </>
  );

  const mainRoutes = () => (
    <>
      <Route exact path="/" component={Main} />
      <Route exact path="/note/:noteId" component={Main} />
      <Route exact path="/folder/:folderId" component={Main} />
      <Route
        exact
        path="/add-folder"
        render={({ history }) => (
          <AddFolder
            newFolder={newFolder}
            onNameChange={(name) => setNewFolder({ name })}
            onNewFolderSubmit={(e) => addNew(e, 'folders', newFolder)}
            handleGoBack={() => history.push('/')}
            folders={folders}
          />
        )}
      />
      <Route
        exact
        path="/add-note"
        render={({ history }) => (
          <AddNote
            newNote={newNote}
            onInputChange={(data) => setNewNote(data)}
            onNewNoteSubmit={(e) => addNew(e, 'notes', newNote)}
            handleGoBack={() => history.push('/')}
            folders={folders}
          />
        )}
      />
    </>
  );

  return (
    <AppContext.Provider
      value={{
        onDelNote: delNote,
        notes,
        folders,
      }}
    >
      <div className="noteful__app">
        <header className="app__header">
          <Header />
        </header>
        <nav className="app__sidebar">
          {sidebarRoutes()}
        </nav>
        <main className="app__main">
          <section className="error_msg">
            <h2>{errorMsg}</h2>
          </section>
          {mainRoutes()}
        </main>
      </div>
    </AppContext.Provider>
  );
}

export default App;
