import React, { useState, useEffect } from 'react';
import { Route, Link } from 'react-router-dom';
import config from './config';
import Main from './Main/Main';
import Sidebar from './Sidebar/Sidebar';
import AddFolder from './AddFolder/AddFolder';
import AddNote from './AddNote/AddNote';
import AppContext from './AppContext';
import './App.css';

function App() {
  const [errorMsg, setErrorMsg] = useState('');
  const [page, setPage] = useState(1);

  const [folders, setFolders] = useState([]);
  const [notes, setNotes] = useState([]);
  const [newFolder, setNewFolder] = useState({ name: '' });
  const [newNote, setNewNote] = useState({
    name: '', content: '', folderId: 0,
  });

  const addNew = async (e, type, data) => {
    try {
      e.preventDefault();
      await fetch(`${config.API_ENDPOINT}/${type}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          Authorization: `Bearer ${config.API_KEY}`,
        },
        body: JSON.stringify(data),
      });
      setPage(page + 1);
    } catch (error) {
      setErrorMsg(error.message);
    }
  };

  const delNote = async (noteId) => {
    try {
      await fetch(`${config.API_ENDPOINT}/notes/${noteId}`, {
        method: 'DELETE',
        headers: {
          'content-type': 'application/json',
          Authorization: `Bearer ${config.API_KEY}`,
        },
      });
      setPage(page + 1);
    } catch (error) {
      setErrorMsg(error.message);
    }
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
        setErrorMsg(error.message);
      });
  };

  useEffect(() => {
    fetchData(`${config.API_ENDPOINT}/folders`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${config.API_KEY}`,
      },
    }, setFolders);
    fetchData(`${config.API_ENDPOINT}/notes`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${config.API_KEY}`,
      },
    }, setNotes);
  }, [page]);

  const sidebarRoutes = () => (
    <>
      <Route exact path="/" component={Sidebar} />
      <Route exact path="/note/:noteId" component={Sidebar} />
      <Route exact path="/folder/:folderId" component={Sidebar} />
      <Route exact path="/add-folder" component={Sidebar} />
      <Route exact path="/add-note" component={Sidebar} />
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
          <h1>
            <Link to="/">
              Noteful
            </Link>
          </h1>
        </header>
        <nav className="app__sidebar">
          {sidebarRoutes()}
        </nav>
        <main className="app__main">
          <section className="error_msg">
            <h3>{errorMsg}</h3>
          </section>
          {mainRoutes()}
        </main>
      </div>
    </AppContext.Provider>
  );
}

export default App;
