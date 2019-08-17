import React from 'react';
import {Link} from 'react-router-dom';
import Note from './Note.js';

import './NoteList.css';

class NoteList extends React.Component {

    render() {

        var filteredNotes=[];
        if (typeof this.props.filter !== "undefined") {
            this.props.notes.forEach(note => {
                  if (note.folderId === this.props.filter)
                    filteredNotes.push(note);
            });
        }
        else filteredNotes = this.props.notes;

        return (
            <div className="note-list">
                {filteredNotes.map(note => {
                    return <Note key={note.id} note={note} />
                })}
                <button>Add note</button>
            </div>
        )
    }
}

export default NoteList;