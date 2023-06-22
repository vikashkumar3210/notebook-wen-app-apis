import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import noteContext from '../noteContext/note_Context.js';
const Logout = () => {
    const { state, setState } = useContext(noteContext);
    const navigate = useNavigate();
    useEffect(() => {
        localStorage.removeItem('token');
        setState(false);
        navigate('/login');
    }, []);
    return (
        <h3>successfully logout</h3>
    );
}
export default Logout;