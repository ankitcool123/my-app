import React, { useState } from 'react';
import './App.css';
import Header from './component/nav/Header';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Protected from './component/ProtecetsRoutes/Protected';
import Login from './component/Login Page/Login';
import SignUp from './component/SignUp Page/SignUp';
import Contact from './component/Pages/Contacts';
import Chat from './component/Pages/Chat';
import Status from './component/Pages/Status';
import Welcome from './component/Welcome Page/Welcome';
import EditUserProfile from './component/Profile/EditUserProfile';
import { RecoilRoot } from 'recoil';
import UserChat from './component/UserChats/UserChat';


function App() {
  const [SignIn, setSignIn] = useState(false);

  return (
    <BrowserRouter>
    <RecoilRoot>
      <Routes>
        <Route path="/" element={<Login setSignIn={setSignIn} />}></Route>
        <Route path="/Register" element={<SignUp />}></Route>
        <Route path="/Dashborad" element={<Protected Component={Header} />}></Route>
        <Route path="/Dashborad/Contact" element={<Protected Component={Contact} />}></Route>
        <Route path="/Dashborad/Chat" element={<Protected Component={Chat} />}></Route>
        <Route path="/Dashborad/Status" element={<Protected Component={Status} />}></Route>
        <Route path="/Dashborad/EditUserProfile" element={<Protected Component={EditUserProfile} />}></Route>
        <Route path="/Dashborad/Contact/UserChat" element={<Protected Component={UserChat} />}></Route>
      </Routes>
      </RecoilRoot>
    </BrowserRouter>
  );
}

export default App;
