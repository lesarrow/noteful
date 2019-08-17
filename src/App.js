import React from 'react';
import {Route, Link} from 'react-router-dom';
import './App.css';
import data from './dummy-store.js';

import FolderList from './FolderList.js';
import NoteList from './NoteList.js';
import NoteSidebar from './NoteSidebar.js'
import Note from './Note.js';


function buildParagraphsBySentence(inputStr) {

  var retval=[];
  const res = inputStr.split(".");

  for (var i=0; i<res.length; i++) {
    retval.push(<p class="note-content">{`${res[i]}.`}</p>);
  }

  return retval;


}

class App extends React.Component {

  state = {
    folders: data.folders,
    notes: data.notes,
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
            <Route exact path='/' 
              render={() => 
                <NoteList  notes={this.state.notes} />
              }              
            />
            <Route path='/folder/:folderId' 
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
          </div>
        </main>
      </div>
    );
  }

}

export default App;
