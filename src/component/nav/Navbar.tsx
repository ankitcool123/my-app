import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Navbar.css";


function Navbar(props: any) {
  let navigate = useNavigate();

  const onOut = () => {
    localStorage.clear();
    navigate("/");
    window.location.reload()

  };


  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item active">
            <a className="nav-link" href="#">Dating App</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">Machtes</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">List</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">Massages</a>
          </li>
        </ul>
      </div>
      <div>
        <div className="Logout">
          <div onClick={onOut}>LogOut</div>
        </div>
      </div>
    </nav>

  );
}

export default Navbar;
