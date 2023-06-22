import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import noteContext from '../noteContext/note_Context.js';
const Registration = () => {
    const { setState } = useContext(noteContext);
    const navigate = useNavigate();
    const [setSign, updateSign] = useState({ name: "", email: "", password: "", confirmedPassword: "" });
    const sign_Data = (e) => {
        updateSign({ ...setSign, [e.target.name]: e.target.value });
    }
    const submitData = async (event) => {
        event.preventDefault();
        const response = await fetch("https://notebook-web-app-server.onrender.com/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(setSign)
        });
        console.log(response.status);

        const { token, result } = await response.json();
        if (token) {
            localStorage.setItem('token', token);
            setState(true);
        }
        updateSign({ name: "", email: "", password: "", confirmedPassword: "" });
        alert(result);
        result === "user successfully created" && navigate('/');

    }

    return (<>

        <div id="userCreation1">
            <h1>iNoteBook</h1>
            <h3>User Registration</h3>
            <form onSubmit={submitData}>
                <div className="form-group">
                    <label htmlFor="name1">Name</label>
                    <input type="text" id="name1" name='name' onChange={sign_Data} value={setSign.name} placeholder="user name" className="form-control" required />
                </div>
                <div className="form-group">
                    <label htmlFor="email1">Email</label>
                    <input type="email" id="email1" name="email" onChange={sign_Data} value={setSign.email} placeholder="email" className="form-control" required />
                </div>
                <div className="form-group">
                    <label htmlFor="password1">Password</label>
                    <input type="password" id="password1" name="password" value={setSign.password} onChange={sign_Data} placeholder="password" required className="form-control" />
                </div>
                <div className="form-group">
                    <label htmlFor="password2">Confirmed Password</label>
                    <input type="password" id="password2" name="confirmedPassword" value={setSign.confirmedPassword} onChange={sign_Data} placeholder="confirm password" required className="form-control" />
                </div>
                <div className="form-group">
                    <button type='submit' className="btn btn-dark form-control" >Create Account</button>
                </div>
            </form>
        </div>

    </>
    );
}
export default Registration;