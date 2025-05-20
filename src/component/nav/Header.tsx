import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";
import { useRecoilState } from "recoil";
import { authUserAtom } from "../../state";
import axios from "axios";
import { loaderAtom, userAtom } from "../../state/userAtom";

const baseUrl: any = process.env.REACT_APP_BASE_URL;

function Header() {
  let navigate = useNavigate();
  const [isLoading, setIsLoading] = useRecoilState(loaderAtom);
  const [authUser]: any = useRecoilState(authUserAtom);
  const [users, setUsers] = useRecoilState(userAtom);
  const header = { headers: { Authorization: `Bearer ${authUser.token}` } };

  const logOut = () => {
    localStorage.clear();
    navigate("/");
    window.location.reload();
  };

  // Navigation with loader
  const handleNavigate = () => {
    setIsLoading(true);
    navigate("/Dashborad/Contact");

    // Simulate loading for 3-5 seconds
    setTimeout(() => {
      setIsLoading(false);
    }, 2000 + Math.random() * 2000); // Random between 3-5 seconds
  };

  // Get user data
  const getUsersData = async () => {
    try {
      const localuser: any = localStorage.getItem("user");
      const pUser = JSON.parse(localuser);
      const response = await axios.get(
        baseUrl + `Users/${pUser.username}`,
        header
      );
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    getUsersData();
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
            src={users.photoUrl || "default-profile.png"}
            alt="profile"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "default-profile.png";
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
            Welcome {users.userName || "User"}
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
