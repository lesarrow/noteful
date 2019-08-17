import React from 'react';

class Folder extends React.Component {

    render() {
        return (
            <div>
                {this.props.name}
            </div>
        )
    }
}

export default Folder;