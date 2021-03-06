import React from 'react'
import { useContext, useState } from 'react'
import noteContext from '../Context/notes/noteContext';
const AddNote = (props) => {
    const context = useContext(noteContext);
    const { addNote } = context;
    const [note, setNote] = useState({ title: "", description: "", tag: "" })
    const handleClick = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        setNote({ title: "", description: "", tag: "" })
        props.showAlert("Your note has been added", "success");
    }
    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }
    let myStyle = {
        color: props.mode === 'dark' ? 'white' : '#48599a',
        backgroundColor: props.mode === 'dark' ? '#48599a' : 'dark '
    }

    return (
        <div>
            <div className="container my-3" style={myStyle}>
                <h2>Add a note</h2>
                <form className='my-3' >
                    <div className="mb-3" >
                        <label htmlFor="title" className="form-label" >Title</label>
                        <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" value={note.title} onChange={onChange} minLength={5} required />

                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <input type="text" name='description' className="form-control" id="description" value={note.description} onChange={onChange} minLength={5} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="tag" className="form-label">Tag</label>
                        <input type="text" value={note.tag} name='tag' className="form-control" id="tag" onChange={onChange} />
                    </div>
                    <button disabled={note.title.length < 5 || note.description.length < 5} type="submit" className="btn btn-primary" onClick={handleClick}>Add</button>
                </form>
            </div>
        </div >
    )
}

export default AddNote
