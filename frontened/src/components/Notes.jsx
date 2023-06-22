import React, { useState, useContext, useEffect } from 'react';
import NoteCard from './NoteCard.jsx';
import noteContext from '../noteContext/note_Context.js';
import { useNavigate } from 'react-router-dom';
const Notes = () => {
    const navigate = useNavigate();

    const contextNote = useContext(noteContext);
    const { addNote, getNotes, getAllNote, setState } = contextNote;
    //reading token from browser

    //delete note
    const deleteNote = async (id) => {
        const token = localStorage.getItem('token');
        const response = await fetch(`https://notebook-web-app-server.onrender.com/deleteNote/${id}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                "token": token
            }
        });
        
        await response.text();
        if (response.status === 200) {
            setState(true);
            window.alert("successfully deleted")
            window.location.reload(true);
        }
    }
    const [state, setStaate] = useState({ title: "", tag: "", description: "" });
    const handler = (event) => {
        setStaate({ ...state, [event.target.name]: event.target.value });

    }
    useEffect(() => {
        if (!localStorage.getItem('token')) {
            window.alert("please login to access notes");
            navigate('/login');
        }
        else {
            getNotes();
        }
    }, []);
    const addnote = async (e) => {
        e.preventDefault();
        const { title, tag, description } = state;
        await addNote(title, tag, description);
        setStaate({ title: "", tag: "", description: "" });

    }

    return (
        <>
            <div className="note_main">
                <form onSubmit={addnote} >
                    <div className="form-group">
                        <label htmlFor="title_">Note title</label>
                        <input type="text" id="title_" name="title" onChange={handler} value={state.title} placeholder="Note title" className="form-control" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="tag_">Note tag</label>
                        <input type="text" id="tag_" name="tag" onChange={handler} placeholder="tag" value={state.tag} className="form-control" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="content_">Note</label>
                        <textarea id="content_" name="description" onChange={handler} value={state.description} className="form-control" rows="6" cols="10" placeholder="description"></textarea>
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-dark form-control">Add Note</button>
                    </div>
                </form>

                <div className="noteItem_style">
                    {getAllNote.map((noteItem) => {
                        return (
                            <NoteCard title={noteItem.title} deleteitem={deleteNote} key={noteItem._id} id={noteItem._id} tag={noteItem.tag} description={noteItem.description} />
                        )
                    })}
                </div>
            </div>

        </>
    );
}
export default Notes;