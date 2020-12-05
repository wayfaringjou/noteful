import React, { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from './Header';
import Main from './Main';
import Sidebar from './Sidebar';
import NoteContents from './NoteContents';
// import dummyStore from './dummy-store';
import NoteSidebar from './NoteSidebar';
import AppContext from './AppContext';

function App() {
  const [folders, setFolders] = useState([]);
  const [notes, setNotes] = useState([]);
  const [errorMsg, setErrorMsg] = useState('');
  // eslint-disable-next-line no-unused-vars
  const [page, setPage] = useState(1);

  const addFolder = (folder) => {
    folders.push(folder);
  };

  const addNote = (note) => {
    notes.push(note);
  };

  const delNote = (noteId) => {
    fetch(`http://localhost:9090/notes/${noteId}`, {
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
    fetchData('http://localhost:9090/folders', { method: 'GET' }, setFolders);
    fetchData('http://localhost:9090/notes', { method: 'GET' }, setNotes);
  }, [page]);

  return (
    <AppContext.Provider
      value={{ onDelNote: delNote }}
    >
      <div className="noteful__app">
        <header className="app__header">
          <Header />
        </header>
        <nav className="app__sidebar">
          <Switch>
            <Route
              exact
              path="/"
              render={() => (
                <Sidebar
                  folders={folders}
                  onAddFolder={(folder) => setFolders(addFolder(folder))}
                />
              )}
            />
            <Route
              path="/note/:noteId"
              render={({ history, match }) => (
                <NoteSidebar
                  noteId={match.params.noteId}
                  onClickBack={() => history.push('/')}
                />
              )}
            />
            <Route
              path="/folder/:folderId"
              render={({ match }) => (
                <Sidebar
                  folders={folders}
                  onAddFolder={(folder) => setFolders(addFolder(folder))}
                  selected={match.params.folderId}
                />
              )}
            />
          </Switch>
        </nav>
        <main className="app__main">
          <section className="error_msg">
            <h2>{errorMsg}</h2>
          </section>
          <Switch>
            <Route
              exact
              path="/"
              render={() => (
                <Main
                  notes={notes}
                  onAddNote={(note) => setNotes(addNote(note))}
                />
              )}
            />
            <Route
              path="/note/:noteId"
              render={({ match }) => (
                <NoteContents
                // notes={notes}
                  noteId={match.params.noteId}
                />
              )}
            />
            <Route
              path="/folder/:folderId"
              render={({ match }) => (
                <Main
                  notes={notes
                    .filter((i) => i.folderId === match.params.folderId)}
                  onAddNote={(note) => setNotes(addNote(note))}
                />
              )}
            />
          </Switch>
        </main>
      </div>
    </AppContext.Provider>
  );
}

export default App;
