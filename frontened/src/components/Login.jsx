import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import noteContext from '../noteContext/note_Context.js';
const Login = () => {
    const { state, setState } = useContext(noteContext);
    const navigate = useNavigate();
    const [loginData, setData] = useState({ email: "", password: "" });
    const addData = (event) => {
        setData({ ...loginData, [event.target.name]: event.target.value })
    }
    //login user
    const login_data = async (e) => {
        e.preventDefault();
        const response = await fetch("https://notebook-web-app-server.onrender.com/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",

            },
            body: JSON.stringify(loginData)
        });

        const { token_, result } = await response.json();

        if (token_) {
            localStorage.setItem("token", token_);
            setState(true);
        }
        setData({ email: "", password: "" });
        alert(result);

        result === "successfully logged in" && navigate('/');
    }
    return (
        <>
            <div id="login_main">

                <div className='login_Css1'>
                    <h1>iNoteBook</h1>
                    <h3>User Login</h3>
                    <form onSubmit={login_data}>
                        <div className="form-group">
                            <label htmlFor="email1">Email</label>
                            <input type="email" id="email1" name="email" placeholder="enter email" onChange={addData} className="form-control" value={loginData.email} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password1">Password</label>
                            <input type="password" id="password1" name="password" onChange={addData} placeholder="enter password" className="form-control" autoComplete="off" value={loginData.password} required />
                        </div>
                        <div className="form-group">
                            <button type="submit" className="btn btn-dark form-control">Login in</button>
                        </div>
                    </form>
                </div>
                <div className='login_Css2'>
                    <img src="https://3.imimg.com/data3/WD/JT/MY-2281434/notebooks-1000x1000.jpg" alt="notebookimage" />
                </div>
            </div>

        </>
    );
}
export default Login;
