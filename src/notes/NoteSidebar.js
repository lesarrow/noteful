import React from 'react';
import PropTypes from 'prop-types';

import './NoteSidebar.css';

class NoteSidebar extends React.Component {

    render() {

        /* Find the folder for the corresponding note */

        var myFolder = this.props.folders.find(folder => {
            return folder.id === this.props.note.folderId;
        })

        return (
            <div className="note-sidebar">
                <p className="goback-button" onClick={this.props.onGoBack}>Go back</p>
                <h2 className="note-sidebar-folder">{myFolder.name}</h2>
            </div>
        )
    }
}

NoteSidebar.propTypes = {
    folders: PropTypes.array.isRequired,
    note: PropTypes.object.isRequired,
    onGoBack: PropTypes.func.isRequired
}

export default NoteSidebar;