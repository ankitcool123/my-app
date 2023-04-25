import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Header.css";
import { useRecoilState } from 'recoil';
import { authUserAtom } from '../../state';
import axios from 'axios';
import { userAtom } from '../../state/userAtom';

const baseUrl: any = process.env.REACT_APP_BASE_URL;

function Header() {
  let navigate = useNavigate();

  const onOut = () => {
    localStorage.clear();
    navigate("/");
    window.location.reload()
  };
  const [authUser]: any = useRecoilState(authUserAtom);
  // const [users, setUsers] = useState<any>([]);
  const [users,setUsers] = useRecoilState(userAtom);

  const header = { headers: { Authorization: `Bearer ${authUser.token}` } };

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
        <div  >
          <img  style={{width:"50px", height:"50px", borderRadius:"30px"}} src={users.photoUrl}  alt="image" />
          </div>
        <div className="Logout dropdown">

          <button className="btn  dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
            Welcome    {users.userName}  
          </button>
          <ul className="dropdown-menu">
            <li><a className="dropdown-item" href="#" onClick={() => { navigate(`/Dashborad/EditUserProfile`) }}>Edit Profile</a></li>
            <li><a className="dropdown-item" href="#" onClick={onOut}>LogOut</a></li>
          </ul>
        </div>
      </nav>
    </div>

  );
}

export default Header;
