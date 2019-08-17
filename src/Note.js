import React from 'react';
import {Link} from 'react-router-dom';

import './Note.css';

function getDateString(dateObj) {

    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    var retStr = "";

    retStr = dateObj.getDate();
    retStr += `  ${monthNames[dateObj.getMonth()]} ${dateObj.getFullYear()}`;

    return retStr;
}

class Note extends React.Component {

    render() {

        var note = this.props.note;
        return (
            <div className="note-list-item" key={note.id}>
                <Link to={ {pathname: `/note/${note.id}`, state: {note: note}}}>
                    <h2>{note.name}</h2>
                </Link>
                <div className="note-list-item-details">
                    <p>Date modified on {getDateString(new Date(note.modified))}</p>
                    <button>Delete Note</button>
                </div>
            </div>
        )
    }
}

export default Note;