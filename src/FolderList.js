import React from 'react';
import Folder from './Folder.js';
import {NavLink} from 'react-router-dom';
import PropTypes from 'prop-types';

import './FolderList.css';

class FolderList extends React.Component {

    render() {
        return (
            <div className="folder-list-container">
                <ul className="folder-list">
                    {this.props.folders.map(folder => {
                        return (
                            <li key={folder.id}>
                                <NavLink activeClassName="selectedFolder" to={{pathname: `/folder/${folder.id}`, state: {folder: folder}}} >
                                    <div className="folder-list-item">
                                        <Folder name={folder.name} />
                                    </div>
                                </NavLink>
                            </li>
                        )
                    })}
                </ul>
                <NavLink activeClassName="selectedFolder" to={{pathname: "/folder/forms/AddFolder"}} >
                    <button>Add Folder</button>
                </NavLink>
            </div>
        );
    }
}

FolderList.propTypes = {

    folders: PropTypes.array.isRequired
};

export default FolderList;