import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Header.css";
import { useRecoilState } from 'recoil';
import { authUserAtom } from '../../state';
import axios from 'axios';
import { userAtom } from '../../state/userAtom';
import SideBar from './SideBar';

const baseUrl: any = process.env.REACT_APP_BASE_URL;

function Header() {
  let navigate = useNavigate();

  const logOut = () => {
    localStorage.clear();
    navigate("/");
    window.location.reload()
  };
  const [authUser]: any = useRecoilState(authUserAtom);
  const [users, setUsers] = useRecoilState(userAtom);

  const header = { headers: { Authorization: `Bearer ${authUser.token}` } };


  //------------- Get user by user name start -----------//
  const getUsersData = async () => {
    const localuser: any = localStorage.getItem("user")
    const pUser = JSON.parse(localuser)
    axios.get(baseUrl + `Users/${pUser.username}`, header)
      .then((response) => {
        const data = response.data
        setUsers(data);
      })
  };

  useEffect(() => {
    getUsersData();
  }, []);
  //------------- Get user by user name end -----------//


  return (
    <div className="Header1">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <a className="header navbar-brand" href="#">Dating App</a>

        <div className="collapse navbar-collapse" id="navbarNav">
        </div>
        <div  >
          <img className="userImg" src={users.photoUrl} alt="image" />
        </div>
        <div className="Logout dropdown">

          <button className="btn  dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
            Welcome    {users.userName}
          </button>
          <ul className="dropdown-menu">
            <li><a className="dropdown-item" href="#" onClick={() => { navigate(`/Dashborad/EditUserProfile`) }}>Edit Profile</a></li>
            <li><a className="dropdown-item" href="#" onClick={logOut}>LogOut</a></li>
          </ul>
        </div>
      </nav>
    </div>

  );
}

export default Header;
