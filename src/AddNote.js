import React from 'react';
import {withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';

import './AddNote.css';

class AddNote extends React.Component {

    constructor(props) {
        super(props);
        this.nameInput = React.createRef();
        this.noteInput = React.createRef();
        this.folderInput = React.createRef();

        this.state = {
            contentValue: ""
        }
    }

    handleSubmit(event) {

        event.preventDefault();

        /* this is dumb, but it works for now in absence of a strategy for assigning ids */

        const newNote = {
            id: Math.floor(Math.random() * 10000000000).toString(16) + "-ffaf-11e8-8eb2-f2801f1b9fd1",
            name: this.nameInput.current.value,
            content: this.noteInput.current.value,
            folderId: this.folderInput.current.value,
            modified: new Date().toISOString()
        }

        /* Add the folder to the database */

        fetch('http://localhost:9090/notes', {
            method: 'post',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newNote)
        }).then(response => {

            /* If successful, update state */

            this.props.history.push(`/folder/${newNote.folderId}`);
            this.props.addNoteCB(newNote);
        }) 

    }

    buildFolderList() {

        return this.props.folders.map(folder => {
            return <option value={folder.id} key={folder.id}>{folder.name}</option>
        });
    }

    contentListener(content) {

        this.setState({
            contentValue: content
        })
    }

    render() {
        return (
            <div>
                <h2>Add Note</h2>
                <form className="addnote-form" onSubmit={e=>this.handleSubmit(e)} >
                    <div className="addnote-name">
                        <label htmlFor="name">Note Name: </label>
                        <input type="text" name="name" id="name" ref={this.nameInput} required />
                    </div>
                    <div className="addnote-folder">
                        <label htmlFor="folders">Folder: </label>
                        <select name="folders" id="folders" ref={this.folderInput} >
                            {this.buildFolderList()}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="content">Note Content</label>
                        <textarea rows="5" cols="100" name="content" id="content" defaultValue="Enter your note" 
                            onChange={e=>this.contentListener(e.target.value)} ref={this.noteInput} />
                    </div>
                    <button type="submit" className="addnote-submit">Submit</button>
                </form>       
            </div>
        )
    }
}

AddNote.propTypes = {

    folders: PropTypes.arrayOf(PropTypes.object).isRequired,
    addNoteCB: PropTypes.func.isRequired
}


export default withRouter(AddNote);