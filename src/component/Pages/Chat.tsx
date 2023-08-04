import React, { useEffect, useState } from 'react';
import Header from '../nav/Header';
import "./Chat.css";
import SideBar from '../nav/SideBar';
import axios from 'axios';
import { useRecoilState } from 'recoil';
import { authUserAtom } from '../../state';
import { log } from 'console';

const baseUrl: any = process.env.REACT_APP_BASE_URL;


function Chat(props: any) {

   
    const [authUser]: any = useRecoilState(authUserAtom);
    const auth = { headers: { Authorization: `Bearer ${authUser.token}` } };

    // ---------------- Get all User start -------------//
    
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(12);
    const [users, setUsers] = useState([]);
    const getUsersData = async () => {
        axios
            .get(baseUrl + `Users?pageNumber=${pageNumber}&pageSize=${pageSize}`, auth)
            .then(function (response) {
                const data = response.data
                setUsers(data.users);
                return data.users
             
            })


    };

    useEffect(() => {
        getUsersData();
    }, []);

    // ---------------- Get all User end -------------//

    // ---------------- Get User Message start -------------//

    const [user, setUser] = useState([]);
    const getUsersMsgData = async (userName: string) => {
        axios
            .get(baseUrl + `Messages/thread/${userName}`, auth)
            .then(function (response) {
                const data = response.data;
                setUser(data);
            })
    };

    useEffect(() => {
        users.forEach((element: any) => {
            getUsersMsgData(element.userName)
        });
    }, [users]);

    // ---------------- Get User Message end -------------//
   

   

    return (
        <div >
            <Header />
            <div className="row">
                <div className="col-1">
                    <SideBar />
                </div>
                <div className="con1 col-11  " style={{ backgroundColor: "whitesmoke" }}>
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Message</th>
                                <th scope="col">From/To</th>
                                <th scope="col">Sent/Received</th>
                            </tr>
                        </thead>
                        <tbody>
                         { user.map((item: any) => (
                            <tr>
                                        <td>{item.content}</td>
                                        <td> <img className="userImg" src={item.recipientPhotoUrl} alt="image" /> {item.recipientUsername}</td>
                                        <td>{item.messageSent}</td>
                            </tr>
                                    ))}

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
export default Chat;
