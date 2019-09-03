import React from 'react';
import PropTypes from 'prop-types';



class AddFolder extends React.Component {

    constructor(props) {

        super(props);
        this.nameInput = React.createRef();
    }

    handleSubmit(event) {

        event.preventDefault();

        /* this is dumb, but it works for now in absence of a strategy for assigning ids */

        const newFolder = {
            id: Math.floor(Math.random() * 10000000000).toString(16) + "-ffaf-11e8-8eb2-f2801f1b9fd1",
            name: this.nameInput.current.value
        }

        /* Add the folder to the database */

        fetch('http://localhost:9090/folders', {
            method: 'post',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newFolder)
        }).then(response => {

            /* If successful, update state */

            this.props.addFolderCB(newFolder);
        })

    }


    render() {
        return (
            <div>
                <h2>Add Folder</h2>
                <form onSubmit={e=> this.handleSubmit(e)}>
                    <label for="name">Folder Name: </label>
                    <input type="text" name="name" id="name" ref={this.nameInput} required />
                    <button type="submit">Add</button>
                </form>
            </div>
        )
    }
}

AddFolder.propTypes = {
    addFolderCB: PropTypes.func.isRequired
}

export default AddFolder;