import noteContext from "./noteContext";
import React from "react";
import { useState } from "react";
const NoteState = (props) => {
    const host = "http://localhost:5000"
    const notesIntial = [];
    const [notes, setNotes] = useState(notesIntial);

    //get all notes
    const getNotes = async () => {
        // API Call
        const response = await fetch(`${host}/api/notes/fetchallnote`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFjOTUwM2FhMWVlYjlkNGYxMTRiMDUwIn0sImlhdCI6MTY0MDU4NDcxOH0.hpX-PCkAtgwWFEjVSSwbEjCDZ8BTJpL2Lk00LD5uq6I"
            }
        });
        const json = await response.json()
        setNotes(json);

    }
    const addNote = async (title, description, tag) => {
        // API Call
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFjOTUwM2FhMWVlYjlkNGYxMTRiMDUwIn0sImlhdCI6MTY0MDU4NDcxOH0.hpX-PCkAtgwWFEjVSSwbEjCDZ8BTJpL2Lk00LD5uq6I'
            },
            body: JSON.stringify({ title, description, tag })
        });

        const note = {
            "_id": "61caa6184e876dgfera537613424",
            "user": "61c9503aa1eeb9d4f114b050",
            "title": title,
            "description": description,
            "tag": tag,
            "date":
                "2021-12-28T05:52:24.349Z"
            , "__v": 0
        };
        setNotes(notes.concat(note))
    }

    // Delete a note
    const deleteNote = (id) => {
        const newNotes = notes.filter((note) => {
            return note._id !== id;
        })
        setNotes(newNotes);
    }

    // Edit a note
    const editNote = async (id, title, description, tag) => {
        // API Call
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFjOTUwM2FhMWVlYjlkNGYxMTRiMDUwIn0sImlhdCI6MTY0MDU4NDcxOH0.hpX-PCkAtgwWFEjVSSwbEjCDZ8BTJpL2Lk00LD5uq6I'
            },
            body: JSON.stringify({ title, description, tag })
        });


        // logic to edit in client
        for (let index = 0; index < notes.length; index++) {
            const element = notes[index];
            if (element._id === id) {
                element.title = title;
                element.description = description;
                element.tag = tag;
            }
        }
    }

    return (

        <noteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
            {props.children}
        </noteContext.Provider >

    )
}
export default NoteState;



