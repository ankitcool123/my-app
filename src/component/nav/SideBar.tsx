import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import "./SideBar.css";
import { SiInstatus } from "react-icons/si";
import { BsChatDots } from "react-icons/bs";
import { AiOutlineContacts } from "react-icons/ai";
import { BiChevronsLeft } from "react-icons/bi";
import { BiChevronsRight } from "react-icons/bi"



function SideBar(props: any) {


//------------ side bar menu iteam start -----------//
    const menuIteam = [
        {
            path: "/Dashborad/Chat",
            name: "Chat",
            icon: <BsChatDots size={27} />
        },
        {
            path: "/Dashborad/Status",
            name: "Status",
            icon: <SiInstatus size={27} />
        },
        {
            path: "/Dashborad/Contact",
            name: "Contacts",
            icon: <AiOutlineContacts size={27} />
        },
    ];
    //------------ side bar menu iteam end -----------//
    
  
   //-------- collapse & expand funcationality start -------//
    const [isExpand, setIsExpand] = useState(false);

    useEffect(() => {
        if (isExpand) setIsExpand(false);
    }, [window.location.pathname]);
    //-------- collapse & expand funcationality end -------//



    return (
        <div style={{ width: isExpand ? "200px" : "66px", position: "fixed", zIndex: "1" }}>
            <div className="sidebar">
                <div className="">
                    {
                        menuIteam.map((item, index) => (
                            <NavLink to={item.path} key={index} className="link" >
                                <span>
                                    {!isExpand ?
                                        <i className="icon" title={item.name}>{item.icon} </i>
                                        :
                                        <div className="icon">{item.icon} {item.name}</div>
                                    }
                                </span>
                            </NavLink>
                        ))
                    }
                </div>
                <span className="collapse1" onClick={() => setIsExpand(!isExpand)}>
                    {!isExpand ? <BiChevronsRight size={30} /> : <BiChevronsLeft size={30} />}
                </span>
            </div>
        </div>
    );
}

export default SideBar;
