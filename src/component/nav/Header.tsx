import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";
import { useRecoilState, useRecoilValue } from "recoil";
import { authUserAtom } from "../../state";
import axios from "axios";
import { loaderAtom, selectedChatUserAtom, userAtom } from "../../state/userAtom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";

const baseUrl: any = process.env.REACT_APP_BASE_URL;

interface User {
  username: string;
  photoUrl: string;
}


function Header() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useRecoilState(loaderAtom);
  const [authUser]: any = useRecoilState(authUserAtom);
  const [users, setUsers] = useRecoilState(userAtom);
  const selectedChatUser = useRecoilValue(selectedChatUserAtom);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [hasImageError, setHasImageError] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null); 

  const header = { headers: { Authorization: `Bearer ${authUser.token}` } };

  const logOut = () => {
    localStorage.clear();
    navigate("/");
    window.location.reload();
  };

  const handleNavigate = () => {
    setIsLoading(true);
    navigate("/Dashborad/Contact");

    setTimeout(() => {
      setIsLoading(false);
    }, 2000 + Math.random() * 2000);
  };

  const getUsersData = async () => {
    try {
      const localuser: any = localStorage.getItem("user");
      const pUser = JSON.parse(localuser);
      const response = await axios.get(baseUrl + `Users/${pUser.username}`, header);
      setUsers(response.data);
      console.log(response.data, "responsedara")
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    getUsersData();
  }, []);


const getLoggesInUser = async () => {
  try {
    const localuser: any = localStorage.getItem("user");
    const pUser = JSON.parse(localuser);
    const response = await axios.get(baseUrl + `Users/${pUser.username}`, header);

    setLoggedInUser(response.data);

  } catch (error) {
    console.error("Error fetching user data:", error);
  }
};
    const localuser: any = localStorage.getItem("user");
    const pUser = JSON.parse(localuser);

  useEffect(() => {
    getLoggesInUser();
  }, []);

  return (
    <div className="Header1">
      {isLoading && (
        <div className="loader-overlay">
          <div className="loader-content">
            <div className="loader-spinner"></div>
            <div className="loader-text">Loading Users</div>
          </div>
        </div>
      )}

      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <a
          className="header navbar-brand"
          href="#"
          onClick={(e) => {
            e.preventDefault();
            handleNavigate();
          }}
        >
          Dating App
        </a>

        <div className="collapse navbar-collapse" id="navbarNav"></div>

        <div>
            <img
              className="userImg"
              src={loggedInUser?.photoUrl}
              alt="profile"
              onError={() => {
                setHasImageError(true);
                setImageSrc(null);
              }}
            />
        </div>

        <div className="Logout dropdown">
          <button
            className="btn dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Welcome {pUser?.username || "User"}
            
          </button>
          <ul className="dropdown-menu">
            <li>
              <a
                className="dropdown-item"
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/Dashborad/EditUserProfile");
                }}
              >
                Edit Profile
              </a>
            </li>
            <li>
              <a
                className="dropdown-item"
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  logOut();
                }}
              >
                LogOut
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Header;
