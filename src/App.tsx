import React, { useState } from 'react';
import './App.css';
import Navbar from './component/nav/Navbar';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Login from './component/nav/Login';
import SignUp from './component/nav/SignUp';

function App() {
    const [SignIn, setSignIn]= useState(false);
  return (
   <BrowserRouter>
      <Routes>
        <Route  path="/" element={<Login setSignIn = {setSignIn}/>}></Route> 
         <Route  path="/Nav" element={<Navbar />}></Route>
         <Route path="/Reg"  element={<SignUp/>}></Route> 
      </Routes>
    </BrowserRouter>
  );
}

export default App;
