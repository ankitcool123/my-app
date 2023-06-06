import React, { useEffect, useState } from 'react';
import Header from '../nav/Header';
import "./Contacts.css";
import axios from 'axios';
import { FaUserAlt } from "react-icons/fa";
import SideBar from '../nav/SideBar';
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import myImages from "../Images/default (1).jpg";

const baseUrl: any = process.env.REACT_APP_BASE_URL;


function Contact(props: any) {

    // ----------- pagination state start  -------- //
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(12);
    const [totalItems, setTotalItems] = useState();
    const [totalPages, setTotalPages] = useState()
    // ----------- pagination state end  -------- //

    // ----------- user list start  -------- //
    const [users, setUsers] = useState([]);

    const header = { headers: { pageNumber: pageNumber, pageSize: pageSize } };

    const getUsersData = async () => {
        axios
            .get(baseUrl + `Users?pageNumber=${pageNumber}&pageSize=${pageSize}`, header)
            .then(function (response) {
                const data = response.data
                setUsers(data.users);
                setTotalItems(data.pagination.totalItems);
                setTotalPages(data.pagination.totalPages);
            })

    };
    useEffect(() => {
        getUsersData();
    }, [pageNumber, pageSize]);
    // ----------- user list End -------- //

    return (
        <div>
            <Header />
            <div className="row">
                <div className="col-1">
                    <SideBar />
                </div>
                <div className="con1 col-11" >
                    <div className="container">
                        <div className="row mainCard">
                            {users.map((user: any) => (
                                <div className='col-sm-2' >
                                    <div className="card mb-4">
                                        <div className="card">
                                            <img src={user.photoUrl ? user.photoUrl : myImages} className="card-img-top" alt="image" height={200} />
                                            <div className="card-body">
                                                <h5 className="card-title">
                                                    <span className="userIcon">
                                                        <FaUserAlt />
                                                    </span>
                                                    <span className="d-inline-block text-truncate" style={{ maxWidth: "70px" }}>
                                                        {user.userName}
                                                    </span>
                                                </h5>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                            }
                        </div>
                    </div>

                    <div className="borderPagina"></div>

                    <div className="mt-4 ">
                        <div style={{ marginTop: "20px" }}>
                            SHOWING CURRENT PAGE {pageNumber} OF {totalPages}   TOTAL USERS {totalItems}
                        </div>
                        <div style={{ marginTop: "-20px" }}>
                            <button type="button" className="btn btn-secondary prenxt" onClick={() => setPageNumber(pageNumber + 1)} disabled={pageNumber === totalPages}>NEXT<IoIosArrowForward /></button>
                            <button type="button" className="btn btn-secondary prenxt" onClick={() => setPageNumber(pageNumber - 1)} disabled={pageNumber === 1}><IoIosArrowBack /> PREVIOUS</button>{" "}
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}
export default Contact;
