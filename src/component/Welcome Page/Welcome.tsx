import React from 'react';
import "./Welcome.css";
import { BsArrowThroughHeart } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';



function Welcome() {
    let navigate = useNavigate();

    return (
        <div className='row d-flex justify-content-center img' style={{ backgroundColor: "brown" }}>
            <div className="wel d-flex justify-content-center" style={{ backgroundColor: "lightpink" }} >
                <div>                <div className='hea d-flex justify-content-center'>
                    <h1>Welcome</h1>
                </div>
                    <div className='heart d-flex justify-content-center'>
                        <BsArrowThroughHeart size="100px" />
                    </div>
                    <div className='hea d-flex justify-content-center'>
                        <h1>Dating App</h1>
                    </div>
                    <div className='Reg d-flex justify-content-center'>
                    <button type="button" className="btn btn-outline-light" onClick={() => {
                    navigate(`/Register`)
                  }} >Register</button>
                    </div>
                    <div className='Log d-flex justify-content-center' onClick={() => {
                    navigate(`/Login`)
                  }}>
                        <button type="button" className="btn btn-outline-light">Login</button>
                    </div>
                </div>
            </div>


            {/* <div  >
                  <a> Don't have an account?</a>
                  <a className="Reg" onClick={() => {
                    navigate(`/Register`)
                  }}>Register</a>
                </div> */}
        </div>
    );
}
export default Welcome;
