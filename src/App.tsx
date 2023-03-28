import React, { useState } from 'react';
import './App.css';
import Navbar from './component/nav/Navbar';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Login from './component/nav/Login';
import SignUp from './component/nav/SignUp';
import Protected from './component/ProtecetsRoutes/Protected';

function App() {
    const [SignIn, setSignIn]= useState(false);
   
  return (
   <BrowserRouter>
      <Routes>
        <Route  path="/" element={<Login setSignIn = {setSignIn}/>}></Route> 
         <Route  path="/Home" element={<Protected Component={Navbar} />}></Route>
         <Route path="/Register"  element={<SignUp/>}></Route> 
      </Routes>
    </BrowserRouter>
  );
}

export default App;
