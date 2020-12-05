import React, { useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from './Header';
import Main from './Main';
import Sidebar from './Sidebar';
import NoteContents from './NoteContents';
import dummyStore from './dummy-store';
import NoteSidebar from './NoteSidebar';

function App() {
  const [folders, setFolders] = useState(dummyStore.folders);
  const [notes, setNotes] = useState(dummyStore.notes);

  const addFolder = (folder) => {
    folders.push(folder);
  };

  const addNote = (note) => {
    notes.push(note);
  };

  const delNote = (noteId) => {
    const delIndex = notes.forEach((e, i) => {
      if (e.id.includes(noteId)) {
        return i;
      }
      return null;
    });
    if (delIndex !== null) {
      notes.splice(delIndex, 1);
    }
  };

  return (
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
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <Main
                notes={notes}
                onAddNote={(note) => setNotes(addNote(note))}
                onDelNote={(noteId) => setNotes(delNote(noteId))}
              />
            )}
          />
          <Route
            path="/note/:noteId"
            render={({ match }) => (
              <NoteContents
                // notes={notes}
                noteId={match.params.noteId}
                onDelNote={(noteId) => setNotes(delNote(noteId))}
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
                onDelNote={(noteId) => setNotes(delNote(noteId))}
              />
            )}
          />
        </Switch>
      </main>
    </div>
  );
}

export default App;
