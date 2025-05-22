import React, { useEffect, useState } from "react";
import Header from "../nav/Header";
import "./Contacts.css";
import axios from "axios";
import { AiFillHeart } from "react-icons/ai";
import myImages from "../Images/default (1).jpg";
import { useRecoilState } from "recoil";
import { authUserAtom } from "../../state";
import { loaderAtom, selectedChatUserAtom } from "../../state/userAtom";
import Messages from "../UserChats/Messages";
import { FaUserCircle, FaBars } from "react-icons/fa";

const baseUrl: any = process.env.REACT_APP_BASE_URL;

function Contact() {
  const [users, setUsers] = useState<any[]>([]);
  const [selectedUser, setSelectedUser] = useRecoilState(selectedChatUserAtom);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize] = useState(50);
  const [authUser]: any = useRecoilState(authUserAtom);
  const auth = { headers: { Authorization: `Bearer ${authUser.token}` } };
  const [isLoading] = useRecoilState(loaderAtom);
  const [showSidebar, setShowSidebar] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const getUsersData = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}Users?pageNumber=${pageNumber}&pageSize=${pageSize}`,
        auth
      );
      const data = response.data;
      setUsers(data.users);
      if (!selectedUser && data.users.length > 0) {
        setSelectedUser(data.users[0]);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    getUsersData();
  }, [pageNumber]);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) setShowSidebar(true);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const liked = async (userName: string) => {
    try {
      await axios.post(`${baseUrl}Likes/${userName}`, {}, auth);
      getUsersData();
    } catch (error) {
      console.error("Error liking user:", error);
    }
  };

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <div className="app-container">
      {isLoading && (
        <div className="loader-overlay">
          <div className="loader-spinner"></div>
        </div>
      )}

      {/* Fixed header */}
      <div className="fixed-header">
        <Header />
      </div>

      {/* Mobile header */}
      {isMobile && (
        <div className="mobile-header">
          <button className="sidebar-toggle" onClick={toggleSidebar}>
            <FaBars />
          </button>
          <h3>{showSidebar ? "Contacts" : selectedUser?.userName || "Chat"}</h3>
        </div>
      )}

      {/* Main layout */}
      <div className="main-content-container">
        <div className="chat-layout">
          {/* Sidebar */}
          <div className={`sidebar-container ${showSidebar ? "open" : ""}`}>
            <div className="sidebar-header">Contacts</div>
            <div className="sidebar-content">
              {users.map((user) => (
                <div
                  key={user.userName}
                  className={`sidebar-user-item ${
                    selectedUser?.userName === user.userName ? "selected" : ""
                  }`}
                  onClick={() => {
                    setSelectedUser(user);
                    if (isMobile) setShowSidebar(false);
                  }}
                >
                  <img src={user.photoUrl || myImages} alt={user.userName} />
                  <div className="sidebar-user-info">
                    <div className="sidebar-user-name">
                      {user.userName
                        .split(" ")
                        .map(
                          (word: string) =>
                            word.charAt(0).toUpperCase() + word.slice(1)
                        )
                        .join(" ")}
                    </div>
                    <div className="sidebar-user-details">
                      Age {user.age}, {user.country || "Bhopal"}
                    </div>
                  </div>
                  <AiFillHeart
                    color={user.isLiked ? "red" : "gray"}
                    onClick={(e) => {
                      e.stopPropagation();
                      liked(user.userName);
                    }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Chat Window */}
          <div className="chat-window">
            {selectedUser ? (
              <>
                <div className="chat-header">
                  {selectedUser.photoUrl ? (
                    <img
                      src={selectedUser.photoUrl}
                      alt={selectedUser.userName}
                      className="chat-user-avatar"
                    />
                  ) : (
                    <FaUserCircle size={36} className="chat-user-avatar" />
                  )}
                  <h2>
                    {selectedUser.userName
                      .split(" ")
                      .map(
                        (word: string) =>
                          word.charAt(0).toUpperCase() + word.slice(1)
                      )
                      .join(" ")}
                  </h2>
                </div>

                <div className="chat-messages-container">
                  <Messages data={selectedUser.userName} />
                </div>
              </>
            ) : (
              <div className="no-user-selected">
                <p>Select a user to start chatting</p>
                {isMobile && (
                  <button
                    onClick={() => setShowSidebar(true)}
                    className="show-contacts-btn"
                  >
                    Show Contacts
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
