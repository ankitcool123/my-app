import React, { useEffect, useState } from 'react';
import Header from '../nav/Header';
import "./Contacts.css";
import axios from 'axios';
import { FaUserAlt } from "react-icons/fa";

const baseUrl: any = process.env.REACT_APP_BASE_URL;


function Contact(props: any) {

    // ----------- user list start  -------- //
    const [users, setUsers] = useState([]);

    const getUsersData = async () => {
        axios
          .get(baseUrl + "Users")
          .then(function (response) {
            const data = response.data
            setUsers(data);
           
          })
       
    };
    useEffect(() => {
        getUsersData();
    }, []);
    // ----------- user list End -------- //

    return (
        <div>
            <Header />
            <div className="con" style={{ backgroundColor: "whitesmoke" }}>
                <h1 >List Of users</h1>
                <div className="container">
                    <div className="row">
                        {users.map((user: any) =>
                            <div className='col-sm-4'>
                                <div className="card mb-4">
                                    <div className="card"  >
                                        <img src={user.photoUrl} className="card-img-top" alt="image" />
                                        <div className="card-body">
                                            <h5 className="card-title">
                                                <span style={{ marginRight: "10px" }}>
                                                    <FaUserAlt />
                                                </span>
                                                {user.userName}</h5>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Contact;
