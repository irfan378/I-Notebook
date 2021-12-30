import noteContext from "./noteContext";
import React from "react";
import { useState } from "react";
const NoteState = (props) => {
    const notesIntial = [];
    const [notes, setNotes] = useState(notesIntial);
    return (

        <noteContext.Provider value={{ notes, setNotes }}>
            {props.children}
        </noteContext.Provider >

    )
}
export default NoteState;