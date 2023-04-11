import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./SignUp.css";
import {BiArrowBack} from "react-icons/bi";

function SignUp(props:any) {
  let navigate = useNavigate();
    const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [emailId, setEmailId] = useState("");
  const [PhoneNumber, setPhoneNumber]  =useState("");

  const header = { headers: { "Access-Control-Allow-Origin": "*" } };
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await axios.post("https://localhost:5001/api/Account/register", {
      userName: userName, password: password, emailId: emailId, PhoneNumber: PhoneNumber,

    }, header)

  };
  
  return (
 <div className='row d-flex justify-content-center img' >
      <div className="wel d-flex justify-content-center" style={{ backgroundColor: "lightpink" }} >
      <div className='arrow' onClick={() => { navigate(`/`) }} >
          <BiArrowBack/>
        </div>
        <div>
          <div className='hea d-flex justify-content-center'>
            <h1>Register</h1>
          </div>
          <div className='hea d-flex justify-content-center'>
            <h5>Please enter details to register</h5>
          </div>
          <div className='hea d-flex justify-content-center'>
            <h5>UserName</h5>
            <input type="text" className="inpas" id="validationCustom01" placeholder="Enter user name" required onChange={(e) => setUserName(e.target.value)} />

          </div>
          <div className='hea d-flex justify-content-center'>
            <h5>Password</h5>
            <input className="inpas" type="text" id="validationCustom02" placeholder="Enter your password" required onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div className='hea d-flex justify-content-center'>
            <h5>Email</h5>
            <input className="inpas" type="text" id="validationCustom03" placeholder="Enter your password" required onChange={(e) => setEmailId(e.target.value)} />
          </div>
          <div className='hea d-flex justify-content-center'>
            <h5>PhoneNumber</h5>
            <input className="inpas" type="text" id="validationCustom04" placeholder="Enter your password" required onChange={(e) => setPhoneNumber(e.target.value)} />
          </div>
          <div className='Login d-flex justify-content-center'>
            <button type="button" className="btn btn-outline-light" onClick={handleSubmit}>Register</button>
          </div>
          <div className='mt-5 d-flex justify-content-center'>
            <span >Already have an account?
              <span className="Reg" onClick={() => { navigate(`/Login`) }}>Login</span>
            </span>
          </div>
        </div>
      </div>
    </div>

  );
}

export default SignUp;
