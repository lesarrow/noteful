import React from 'react';

const NoteContext = React.createContext({
    deleteNoteCB: (id) => {
        console.log("this is the default deleteNoteCB");
    },
})

export default NoteContext;