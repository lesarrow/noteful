import React from 'react';
import Folder from './Folder.js';
import {NavLink} from 'react-router-dom';

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
                <button>Add Folder</button>
            </div>
        );
    }
}

export default FolderList;