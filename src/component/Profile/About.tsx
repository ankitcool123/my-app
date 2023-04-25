import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { authUserAtom } from '../../state';
import "./EditUserProfile.css";


const baseUrl: any = process.env.REACT_APP_BASE_URL;

function About() {


    // ----------- user list start  -------- //
    const [authUser]: any = useRecoilState(authUserAtom);
    const [users, setUsers] = useState<any>([]);

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
        <div >
            <div className="container">
              <h5>Discription</h5>
              <textarea className="form-control" id="exampleFormControlTextarea1" ></textarea>
              <h5>Looking For</h5>
              <textarea className="form-control" id="exampleFormControlTextarea1" ></textarea>
            </div>
        </div>
    );
}
export default About;
