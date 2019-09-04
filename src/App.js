import React from 'react';
import {Route, Link} from 'react-router-dom';
import './App.css';

import FolderList from './folders/FolderList.js';
import NoteList from './notes/NoteList.js';
import NoteSidebar from './notes/NoteSidebar.js'
import Note from './notes/Note.js';
import NoteContext from './notes/NoteContext.js';
import AddFolder from './folders/AddFolder.js';
import AddNote from './notes/AddNote.js';

class App extends React.Component {


  constructor(props) {

    super(props);

    this.state = {
      folders: [],
      notes: []
    }
  }

  componentDidMount() {

    var tmpState = {
      folders: [],
      notes: []
    }


    /* this didn't work at all so I'm just going to do the calls synchronously */

/*
    const foldersPromise = fetch(`http://localhost:9090/folders`);  
    const notesPromise = fetch(`http://localhost:9090/notes`);

     Promise.all([foldersPromise, notesPromise])
      .then(results => {
          const foldersInJson = results[0].json();
          const notesInJson = results[1].json();
          console.log(`folders in json: ${foldersInJson}`);
          return [foldersInJson, notesInJson];
      })
      .then(resultsInJson => {
        console.log(`folders: ${resultsInJson[0][0]}`);
        this.setState ({
          folders: resultsInJson[0],
          notes: resultsInJson[1]
        })
      }); */

      fetch(`http://localhost:9090/folders`)
        .then(response => response.json())
        .then(responseJson => {
          tmpState.folders = responseJson;
        })
        .then( () => {
          fetch(`http://localhost:9090/notes`)
            .then(response => response.json())
            .then(responseJson => {
              tmpState.notes = responseJson;
            })
            .then (() => {
              this.setState(tmpState);
            })
        });  
  }

  deleteNote = (noteId) => {

    var newNotes = this.state.notes.filter(note => note.id !== noteId);

    this.setState({
      notes: newNotes
    });
  }

  addFolder = (folder) => {

    const newFolders = this.state.folders;
    newFolders.push(folder);

    this.setState({
      folders: newFolders
    });
  }

  addNote = (note) => {

    const newNotes = this.state.notes;
    newNotes.push(note);

    this.setState({
      notes: newNotes
    });
  }

  render() {

    return (
      <div className="App">
        <header className="App-header">
          <Link to='/'><h1>Noteful</h1></Link>
        </header>
        <main>
          <div className="sidebar">
            <Route exact path='/' 
              render={() =>
                <FolderList folders={this.state.folders} />
              }
            />
            <Route path='/folder/:folderId' 
              render={(props) =>
                <FolderList folders={this.state.folders} />
              }
            />
            <Route path='/note/:noteId' 
              render={(props) => 
                <NoteSidebar folders={this.state.folders} note={props.location.state.note} onGoBack={props.history.goBack}/>
              }
            />                           
          </div>
          <div className="mainview">
            <NoteContext.Provider value={{deleteNoteCB: this.deleteNote}}>
              <Route exact path='/' 
                render={() => 
                  <NoteList  notes={this.state.notes} />
                }              
              />
              <Route exact path='/folder/:folderId' 
                render={(props) => 
                  <NoteList  notes={this.state.notes} filter={props.match.params.folderId} />
                }
              />
              <Route path='/note/:noteId' 
                render={(props) => {
                  return (
                    <div className="note-view">
                      <Note note={props.location.state.note} />
                      <p className="note-content">{props.location.state.note.content}</p>
                    </div>
                  )}
                }
              />
              <Route path='/folder/forms/AddFolder'
                render={() => {
                  return (
                    <div>
                      <AddFolder addFolderCB={this.addFolder}/>
                    </div>
                  )}
                }
              />
              <Route path='/folder/forms/AddNote'
                render={() => {
                  return (
                    <div>
                      <AddNote addNoteCB={this.addNote} folders={this.state.folders} />
                    </div>
                  )}
                }
              />
            </NoteContext.Provider>                     
          </div>
        </main>
      </div>
    );
  }

}

export default App;
