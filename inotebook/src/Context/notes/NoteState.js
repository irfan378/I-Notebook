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
        const note = await response.json()
        setNotes(notes.concat(note))

    }

    // Delete a note
    const deleteNote = async (id) => {
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFjOTUwM2FhMWVlYjlkNGYxMTRiMDUwIn0sImlhdCI6MTY0MDU4NDcxOH0.hpX-PCkAtgwWFEjVSSwbEjCDZ8BTJpL2Lk00LD5uq6I'
            },

        });
        const json = response.json();
        console.log(json);
        const newNotes = notes.filter((note) => {
            return note._id !== id;
        })

        setNotes(newNotes);
    }

    // Edit a note
    const editNote = async (id, title, description, tag) => {
        // API Call
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFjOTUwM2FhMWVlYjlkNGYxMTRiMDUwIn0sImlhdCI6MTY0MDU4NDcxOH0.hpX-PCkAtgwWFEjVSSwbEjCDZ8BTJpL2Lk00LD5uq6I'
            },
            body: JSON.stringify({ title, description, tag })
        });
        const json = await response.json()
        console.log(json);

        let newNotes = JSON.parse(JSON.stringify(notes))
        // logic to edit in client
        for (let index = 0; index < newNotes.length; index++) {
            const element = newNotes[index];
            if (element._id === id) {
                newNotes[index].title = title;
                newNotes[index].description = description;
                newNotes[index].tag = tag;
                break;
            }
        }
        setNotes(newNotes);
    }

    return (

        <noteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
            {props.children}
        </noteContext.Provider >

    )
}
export default NoteState;



