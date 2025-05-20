import React, { useEffect, useState } from "react";
import Header from "../nav/Header";
import "./Contacts.css";
import axios from "axios";
import { FaUserAlt } from "react-icons/fa";
import SideBar from "../nav/SideBar";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { AiFillHeart, AiTwotoneMessage } from "react-icons/ai";
import myImages from "../Images/default (1).jpg";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { authUserAtom } from "../../state";
import { loaderAtom } from "../../state/userAtom";

const baseUrl: any = process.env.REACT_APP_BASE_URL;

function Contact() {
  const navigate = useNavigate();
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(12);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [users, setUsers] = useState([]);
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
      setTotalItems(data.pagination.totalItems);
      setTotalPages(data.pagination.totalPages);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    getUsersData();
  }, [pageNumber, pageSize]);

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
      <div className="main-content-container">
        <div className="content-area">
          <div className="contact-grid-container">
            <div className="contact-grid">
              {users.map((user: any) => (
                <div className="contact-card" key={user.userName}>
                  <div className="card-image-container">
                    <img
                      src={user.photoUrl || myImages}
                      className="card-image"
                      alt={user.userName}
                    />
                    <div className="card-hover-icons">
                      <FaUserAlt
                        onClick={() =>
                          navigate(
                            `/Dashborad/Contact/UserChat?${user.userName}`,
                            { state: { user } }
                          )
                        }
                      />
                      <AiFillHeart
                        color={user.isLiked ? "red" : "white"}
                        onClick={() => liked(user.userName)}
                      />
                      <AiTwotoneMessage />
                    </div>
                  </div>
                  <div className="card-info">
                    <h5 className="card-username">
                      <FaUserAlt className="user-icon" />
                      <span>{user.userName}</span>
                    </h5>
                    <p>
                      Age {user.age}, {user.country || "Bhopal"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pagination-container">
            <div className="pagination-info">
              Page {pageNumber} of {totalPages} | {totalItems} users
            </div>
            <div className="pagination-buttons">
              <button
                onClick={() => setPageNumber(Math.max(1, pageNumber - 1))}
                disabled={pageNumber === 1}
              >
                <IoIosArrowBack /> Previous
              </button>
              <button
                onClick={() =>
                  setPageNumber(Math.min(totalPages, pageNumber + 1))
                }
                disabled={pageNumber === totalPages}
              >
                Next <IoIosArrowForward />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
