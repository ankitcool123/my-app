import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./Header.css";
import jwt_decode from 'jwt-decode';

function Header(props: any) {
  let navigate = useNavigate();

  const onOut = () => {
    localStorage.clear();
    navigate("/");
    window.location.reload()
  };

  // ------------ Token decode start ----------//
  const token: any = localStorage.getItem("user-token");
  const decoded: any = jwt_decode(token);
  const username: string = decoded.nameid
  // ------------ Token decode end ----------- //

  return (
    <div >
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <a className="header navbar-brand" href="#">Dating App</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <a className="nav1 nav-link active">Matching</a>
            </li>
            <li className="nav-item">
              <a className="nav2 nav-link active" onClick={() => { navigate(`/Dashborad/Contact`) }}>List</a>
            </li>
            <li className="nav-item">
              <a className="nav3 nav-link active" onClick={() => { navigate(`/Dashborad/Chat`) }}>Message</a>
            </li>
          </ul>
        </div>
        <div className="Logout dropdown">
          <button className="btn  dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
            Welcome {username[0].toUpperCase() + username.substring(1)}
          </button>
          <ul className="dropdown-menu">
            <li><a className="dropdown-item" href="#" onClick={() => { navigate(`/Dashborad/EditUserProfile`) }}>Edit Profile</a></li>
            <li><a className="dropdown-item" href="#" onClick={onOut}>LogOut</a></li>
          </ul>
        </div>
      </nav>
      {/* <div className='row'>
          <div className='col-2'>
            <SideBar />
          </div>
          <div className='col-6'>
          </div>
        </div> */}
    </div>

  );
}

export default Header;
