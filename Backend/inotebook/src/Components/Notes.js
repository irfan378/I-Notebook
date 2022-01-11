import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from '../Context/notes/noteContext';
import AddNote from './AddNote';
import Noteitem from './Noteitem';
import { useNavigate } from 'react-router-dom'


const Notes = (props) => {
    const context = useContext(noteContext);
    const { notes, getNotes, editNote } = context;

    let navigate = useNavigate();
    useEffect(() => {
        if (localStorage.getItem('token')) {

            getNotes();
            // eslint-disable-next-line
        }
        else {
            navigate("/login");
        }
    }, [])
    const ref = useRef(null);
    const refClose = useRef(null);
    const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "" })
    const updateNote = (currentNote) => {
        ref.current.click();
        setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag });

    }

    const handleClick = (e) => {

        editNote(note.id, note.etitle, note.edescription, note.etag);
        refClose.current.click();
        props.showAlert("Your note has been updated", "success");

    }
    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }
    let myStyle = {
        color: props.mode === 'dark' ? 'white' : '#48599a',
        backgroundColor: props.mode === 'dark' ? '#48599a' : 'dark'
    }

    return (
        <>
            <AddNote showAlert={props.showAlert} />
            <button type="button " ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className='my-3'>
                                <div className="mb-3">
                                    <label htmlFor="etitle" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="etitle" name="etitle" aria-describedby="emailHelp" onChange={onChange} value={note.etitle} minLength={5} required />

                                </div>
                                <div className="mb-3">
                                    <label htmlFor="edescription" className="form-label">Description</label>
                                    <input type="text" name='edescription' className="form-control" id="edescription" onChange={onChange} value={note.edescription} minLength={5} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="etag" className="form-label">Tag</label>
                                    <input type="text" name='etag' className="form-control" id="etag" onChange={onChange} value={note.etag} />
                                </div>

                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button disabled={note.etitle.length < 5 || note.edescription.length < 5} onClick={handleClick} type="button" className="btn btn-primary">Update Note</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row my-3" style={myStyle}>
                <h2>Your Notes</h2>
                <div className="container mx-2">
                    {notes.length === 0 && 'No notes to display'}
                </div>
                {notes.map((note) => {
                    return <Noteitem key={note._id} showAlert={props.showAlert} updateNote={updateNote} note={note} />
                })}
            </div>
        </>
    )
}

export default Notes
