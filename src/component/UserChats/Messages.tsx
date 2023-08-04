import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { authUserAtom } from "../../state";
import "./Messages.css"
import { IoMdSend } from 'react-icons/io';


const baseUrl: any = process.env.REACT_APP_BASE_URL;

function Messages(props: any) {

    const [authUser]: any = useRecoilState(authUserAtom);
    const auth = { headers: { Authorization: `Bearer ${authUser.token}` } };


    // --------------- Get User Message Api  start -------------//

    const [user, setUser] = useState([]);
    const getUsersMsgData = async () => {
        axios
            .get(baseUrl + `Messages/thread/${props.data}`, auth)
            .then(function (response) {
                const data = response.data;
                setUser(data);
                console.log(data, "ankitVishwa");
            })
    };

    useEffect(() => {
        getUsersMsgData();

    }, [])

    // --------------- Get User Message Api  end -------------//


   // --------------- Post User Message Api  start -------------//

    const [content, setContent] = useState('');
    const [recipientUsername] = useState(props.data);


    const handleSubmit = async (e: any) => {
        e.preventDefault();
        let parm = { recipientUsername: recipientUsername, content: content }
        axios
            .post(baseUrl + `Messages`, parm, auth).then(function (response: any) {
                setContent("");
                getUsersMsgData()

            }).catch((error) => {
                if (error.response && error.response.status === 400) {
                }
            });
    };
   
    const handleKeyPress = (event: any) => {
        if (event.key === 'Enter') {
            handleSubmit(event);
        }
    };

    // --------------- Post User Message Api  end -------------//

    // -------------- Getting User name with help of User Token start -----------//

    const localuser: any = localStorage.getItem("user")
    const pUser = JSON.parse(localuser)

     // -------------- Getting User name with help of User Token end -----------//

    const utcTime  = '2023-07-14T10:48:12.90874';
    const date = new Date(utcTime);
    const options: any = {
        // timeZone: indianTime,
       
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
       
      };
      
      // Convert the date to Indian time zone and format it as a string
      const indianTime = date.toLocaleString('en-IN', options);
      console.log(indianTime);


    return (
        <div className="mainC">
            <div className="container">
                <div className="row" >
                    <div className=''>
                        <div className="card">
                            <div className="card-list " style={{ backgroundColor: "whitesmoke", height: "60vh", border: "0" }}>
                                <div>
                                    {user.map((iteam: any) => (
                                        <div className="card" style={{display: "flex", justifyContent: iteam.senderUsername === pUser.username ? "flex-end" : "flex-start"}}>
                                        <div className="card"  >
                                            <div className="card-body" style={{ color: "black" }}>
                                                <img className="userImg" src={iteam.senderPhotoUrl} alt="image" />
                                                {iteam.content}
                                            </div>
                                        </div>
                                        </div>
                                    ))};
                                </div>
                            </div>
                            <div className="input-group mb-3">
                                <input
                                    type="text"
                                    name="inputValue"
                                    onKeyDown={handleKeyPress}
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    placeholder="Type your message..."
                                    style={{ width: "90%" }}
                                />
                                <button className="btn" type="button" id="button-addon2" onClick={handleSubmit} style={{ width: "10%", color: "black", borderColor: "black" }}><IoMdSend /></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Messages;
