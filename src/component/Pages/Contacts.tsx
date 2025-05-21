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
import { FaUserCircle } from "react-icons/fa";

const baseUrl: any = process.env.REACT_APP_BASE_URL;

function Contact() {
  const [users, setUsers] = useState<any[]>([]);
  const [selectedUser, setSelectedUser] = useRecoilState(selectedChatUserAtom);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize] = useState(50);
  const [authUser]: any = useRecoilState(authUserAtom);
  const auth = { headers: { Authorization: `Bearer ${authUser.token}` } };
  const [isLoading] = useRecoilState(loaderAtom);

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

  const liked = async (userName: string) => {
    try {
      await axios.post(`${baseUrl}Likes/${userName}`, {}, auth);
      getUsersData();
    } catch (error) {
      console.error("Error liking user:", error);
    }
  };

  return (
    <div className="app-container">
      {isLoading && (
        <div className="loader-overlay">
          <div className="loader-spinner"></div>
        </div>
      )}
      <Header />
      <div
        className="main-content-container"
        style={{ display: "flex", height: "calc(100vh - 60px)" }}
      >
        {/* Sidebar */}
        <div
          className="sidebar"
          style={{
            width: 280,
            borderRight: "1px solid #ddd",
            overflowY: "auto",
            padding: "1rem",
            height: "100%", // ensure full height
          }}
        >
          <h3>Contacts</h3>
          {users.map((user) => (
            <div
              key={user.userName}
              className={`sidebar-user-item ${
                selectedUser?.userName === user.userName ? "selected" : ""
              }`}
              onClick={() => setSelectedUser(user)}
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: 12,
                padding: 8,
                cursor: "pointer",
                backgroundColor:
                  selectedUser?.userName === user.userName
                    ? "#e6f0ff"
                    : "transparent",
                borderRadius: 5,
              }}
            >
              <img
                src={user.photoUrl || myImages}
                alt={user.userName}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  marginRight: 12,
                }}
              />
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: "bold" }}>
                  {user.userName
                    .split(" ")
                    .map(
                      (word: string) =>
                        word.charAt(0).toUpperCase() + word.slice(1)
                    )
                    .join(" ")}
                </div>
                <div style={{ fontSize: 12, color: "#555" }}>
                  Age {user.age}, {user.country || "Bhopal"}
                </div>
              </div>
              <AiFillHeart
                color={user.isLiked ? "red" : "gray"}
                onClick={(e) => {
                  e.stopPropagation();
                  liked(user.userName);
                }}
                style={{ cursor: "pointer" }}
              />
            </div>
          ))}
        </div>

        {/* Chat window */}
        <div
          className="chat-window"
          style={{
            flex: 1,
            padding: "1rem",
            display: "flex",
            flexDirection: "column",
            height: "100%", // full height to parent
          }}
        >
          {selectedUser ? (
            <>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "1rem",
                }}
              >
                {selectedUser.photoUrl ? (
                  <img
                    src={selectedUser.photoUrl}
                    alt={selectedUser.userName}
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: "50%",
                      marginRight: "10px",
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  <div>
                    <div
                    // style={{
                    //   width: 40,
                    //   height: 40,
                    //   borderRadius: "50%",
                    //   backgroundColor: "#ccc",
                    //   display: "flex",
                    //   alignItems: "center",
                    //   justifyContent: "center",
                    //   marginRight: "10px",
                    // }}
                    >
                      <FaUserCircle size={24} color="#fff" />
                    </div>
                  </div>
                )}
                <h2 style={{ margin: 0 }}>
                  {selectedUser.userName
                    .split(" ")
                    .map(
                      (word: string) =>
                        word.charAt(0).toUpperCase() + word.slice(1)
                    )
                    .join(" ")}
                </h2>
              </div>

              {/* Scrollable container for messages */}
              <div
                style={{
                  // flex: 1,
                  overflowY: "auto",
                  border: "1px solid #ddd",
                  borderRadius: 8,
                  // padding: 12,
                  backgroundColor: "white",
                  scrollbarWidth: "none", // Firefox
                  msOverflowStyle: "none", // IE 10+
                }}
                className="no-scrollbar"
              >
                <Messages data={selectedUser.userName} />
              </div>
            </>
          ) : (
            <div>Select a user to start chatting</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Contact;
