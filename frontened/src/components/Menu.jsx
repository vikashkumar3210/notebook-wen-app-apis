import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import noteContext from '../noteContext/note_Context.js';
const Menu = () => {
    const { state } = useContext(noteContext);
    return (
        <>
            <div className="menu_hidden1">
            <label htmlFor="mobile_menu"> <i className="fa-solid fa-bars" style={{ color: "#141415" }}></i></label></div>
            <input type="checkbox" id="mobile_menu" className="menu_hidden "></input>
            <div className="menu1">
                <NavLink className="linkClass" to="/">Home</NavLink>
            </div>
            <div className="menu_links">
                <div> <label htmlFor="mobile_menu" className="menu_hidden2"> <i className="fa-solid fa-bars" style={{ color: "#141415" }}></i></label></div>
                <div>
                    <NavLink className=" linkClass" to="/userNotes">Notes</NavLink>
                </div>
                <div style={!state ? { display: "block" } : { display: 'none' }}><NavLink className=" linkClass" to="/login">Login</NavLink>
                </div>
                <div style={!state ? { display: "block" } : { display: 'none' }}><NavLink className="linkClass" to="/signup">Signup</NavLink>
                </div>
                <div style={state ? { display: "block" } : { display: 'none' }}><NavLink className="linkClass" to="/Logout">logout</NavLink>
                </div>

            </div>








        </>
    );
}
export default Menu;