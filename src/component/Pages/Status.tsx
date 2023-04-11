import React from 'react';
import Header from '../nav/Header';
import "./Contacts.css";



function Status(props: any) {

    return (
        <div >
            <Header/>
            <div className='con' style={{  backgroundColor: "whitesmoke"}}>
               <h1 >Status</h1>
            </div>
        </div>
    );
}
export default Status;
