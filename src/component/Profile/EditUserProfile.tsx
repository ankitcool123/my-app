import React, { useEffect, useState } from 'react';
import Header from '../nav/Header';
import { FaUserAlt } from 'react-icons/fa';
import axios from 'axios';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { authUserAtom } from '../../state';
import "./EditUserProfile.css";
import About from './About';
import EditPhotos from './EditPhotos';
import { userAtom } from '../../state/userAtom';


const baseUrl: any = process.env.REACT_APP_BASE_URL;

function EditUserProfile(props: any) {

    // ----------- user list start  -------- //
    const [authUser]: any = useRecoilState(authUserAtom);
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

  
        // ----------- user list End -------- //
        return (
            <div>
                <Header />
                <div className="con">
                    <div className="container">
                        <h1>Your profile </h1>
                        <div className="row">
                            <div className='col-sm-4'>
                                <div className="card mb-4">
                                    <div className="card" style={{ backgroundColor: "plum" }}>
                                        <a >
                                            <img src={users.photoUrl} className="card-img-top" alt="image" />
                                        </a>
                                        <div className="card-body">
                                            <h5 className="card-title">
                                                <span className="d-flex justify-content-center">
                                                    <FaUserAlt />
                                                </span>
                                                <span className="d-flex justify-content-center">
                                                    {users.userName}
                                                </span>
                                            </h5>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-8">
                                <div className="card mb-4">
                                    <div className="card-body">
                                        <h5 className="card-title">
                                            <nav>
                                                <div className="nav nav-tabs" id="nav-tab" role="tablist">
                                                    <div>
                                                        <button
                                                            className="nav-link active"
                                                            id="nav-home-tab"
                                                            data-bs-toggle="tab"
                                                            data-bs-target="#nav-home"
                                                            type="button"
                                                            role="tab"
                                                            aria-controls="nav-home"
                                                            aria-selected="true"
                                                        >About {users.userName}</button>
                                                    </div>
                                                    <button
                                                        className="nav-link"
                                                        id="nav-profile-tab"
                                                        data-bs-toggle="tab"
                                                        data-bs-target="#nav-profile"
                                                        type="button" role="tab"
                                                        aria-controls="nav-profile"
                                                        aria-selected="false">Edit Photos</button>
                                                </div>
                                            </nav>
                                            <div className="tab-content" id="nav-tabContent">
                                                <div className="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab"><About /></div>
                                                <div className="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab"><EditPhotos /></div>
                                            </div>
                                        </h5>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        );
    }
export default EditUserProfile;
