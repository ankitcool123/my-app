import React from 'react';
import Header from '../nav/Header';
import "./Contacts.css";
import SideBar from '../nav/SideBar';



function Chat() {

    return (
        <div >
            <Header />
            <div className="row">
                <div className="col-2">
                    <SideBar />
                </div>
                <div className="con col-10" style={{ backgroundColor: "whitesmoke" }}>
                    <h1 >Chat</h1>

                </div>
            </div>
        </div>
    );
}
export default Chat;
