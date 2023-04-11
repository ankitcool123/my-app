import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import "./SideBar.css";
import {SiInstatus} from "react-icons/si";
import {GrNotification} from "react-icons/gr";
import {BsChatDots} from "react-icons/bs";
import {TfiHelpAlt} from "react-icons/tfi";


function SideBar(props: any) {
    // let navigate = useNavigate();

    const menuIteam = [
        {
            path: "/Dashborad/Notification",
            name: "Notification",
            icon: < GrNotification />
        },
        {
            path: "/Dashborad/Chat",
            name: "Chat",
            icon: <BsChatDots />
        },
        {
            path: "/Dashborad/Status",
            name: "Status",
            icon: <SiInstatus />
        },
        {
            path: "/Dashborad/Contact",
            name: "Contacts",
            icon: <TfiHelpAlt />
        },
    ];
    const helpMenu = [
        {
            path: "/Dashborad/Help",
            name: "Help",
            icon: <TfiHelpAlt />,
        },
    ];



    return (
        <div >
            <div className="sidebar">
                <div className="">
                    {
                        menuIteam.map((item, index) => (
                            <NavLink to={item.path} key={index} className="link" >
                                <div className="icon">{item.icon}</div>
                                <div className="link_text">{item.name}</div>
                            </NavLink>
                        ))
                    }
                </div>
                <div>
                {
                        helpMenu.map((item, index) => (
                            <NavLink to={item.path} key={index} className="link" >
                                <div className="icon">{item.icon}</div>
                                <div className="link_text">{item.name}</div>
                            </NavLink>
                        ))
                    }
                    </div>
            </div>

        </div>



    );
}

export default SideBar;
