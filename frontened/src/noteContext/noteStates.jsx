import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import noteContext from './note_Context.js';
const NoteState = (props) => {
    const navigate = useNavigate();
    //toggle between login and logout
    const [state, setState] = useState(false);

    //Getting all notes
    const [getAllNote, setNote] = useState([]);
    const getNotes = async () => {
        try {
          const token = localStorage.getItem('token');
            const response = await fetch('https://notebook-web-app-server.onrender.com/getUserNotes', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'token': token
                }

            });
            const data = await response.json();
            if (data.msg === "access denied" || data.msg === "not getting") {
                if (data.msg === "access denied") {
                    window.alert(data.msg);
                    navigate('/login');
                }
                if (data.msg === "not getting") {
                    alert("No notes found");
                }
            }
            else {
                setNote(data.msg);
                setState(true);
            }


        }
        catch (error) {
            console.log(error);
        }
    }
    //Adding note to database
    const addNote = async (title, tag, description) => {
        const token = await localStorage.getItem('token');
        const response = await fetch('https://notebook-web-app-server.onrender.com/addUserNotes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'token': token
            },
            body: JSON.stringify({ title, tag, description })
        });
        const result = await response.text();
        alert(result);
        if (response.status === 201) {
            setState(true);
            window.location.reload();

        }


    }

    return (
        <noteContext.Provider value={{ addNote, getNotes, getAllNote, state, setState }}>
            {props.children}
        </noteContext.Provider>
    );
}
export default NoteState;