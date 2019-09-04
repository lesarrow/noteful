import React from 'react';
import FolderError from './FolderError';
import PropTypes from 'prop-types';

class Folder extends React.Component {

    render() {
        return (
            <FolderError>
                <div>
                    {this.props.name}
                </div>
            </FolderError>
        )
    }
}

Folder.propTypes = {
    name: PropTypes.string.isRequired
}

export default Folder;