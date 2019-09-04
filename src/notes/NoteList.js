import React from 'react';
import {NavLink} from 'react-router-dom';
import Note from './Note.js';
import PropTypes from 'prop-types';

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
                <NavLink to={{pathname: "/folder/forms/AddNote"}} >
                    <button>Add note</button>
                </NavLink>
            </div>
        )
    }
}

NoteList.propTypes = {
    notes: PropTypes.arrayOf(PropTypes.object).isRequired,
    filter: PropTypes.string
}

export default NoteList;