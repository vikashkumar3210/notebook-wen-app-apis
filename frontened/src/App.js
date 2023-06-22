import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home.jsx';
import Login from './components/Login.jsx';
import Registration from './components/Registration.jsx';
import Notes from './components/Notes.jsx';
import Menu from "./components/Menu.jsx";
import NoteState from "./noteContext/noteStates.jsx";
import Logout from './components/logout';

function App() {
  return (<>
    <div className="grid_class">

      <NoteState>
        <Menu />
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route exact path="/login" element={<Login />}></Route>
          <Route exact path="/signup" element={<Registration />}></Route>
          <Route exact path="/userNotes" element={<Notes />}></Route>
          <Route exact path="/Logout" element={<Logout />}></Route>
        </Routes>
      </NoteState>
    </div>
  </>
  );
}

export default App;
