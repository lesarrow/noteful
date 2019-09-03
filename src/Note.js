import React from 'react';
import {Link} from 'react-router-dom';
import NoteContext from './NoteContext.js';
import NoteError from './NoteError.js';
import PropTypes from 'prop-types';

import './Note.css';

function getDateString(dateObj) {

    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    var retStr = "";

    retStr = dateObj.getDate();
    retStr += `  ${monthNames[dateObj.getMonth()]} ${dateObj.getFullYear()}`;

    return retStr;
}

function deleteNote(id, deleteNoteCB) {

    fetch(`http://localhost:9090/notes/${id}`, {
        method: 'DELETE',
        headers: {
            'content-type': 'application/json'
        }
    }).then(response => {
        deleteNoteCB(id);
    }).catch (err => {
        console.log("Failed note deletion");
    })

}

class Note extends React.Component {

    render() {

        var note = this.props.note;
        return (
            <NoteContext.Consumer>
                {(value) => {
                    return ( 
                        <NoteError>
                            <div className="note-list-item" key={note.id}>
                                <Link to={ {pathname: `/note/${note.id}`, state: {note: note}}}>
                                    <h2>{note.name}</h2>
                                </Link>
                                <div className="note-list-item-details">
                                    <p>Date modified on {getDateString(new Date(note.modified))}</p>
                                    <button onClick={() => deleteNote(this.props.note.id, value.deleteNoteCB)}>Delete Note</button>
                                </div>
                            </div>
                        </NoteError>
                    )
                }}
            </NoteContext.Consumer>
        )
    }
}

Note.propTypes = {
    note: PropTypes.object.isRequired
}

export default Note;