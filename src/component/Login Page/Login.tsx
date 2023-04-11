import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Login.css";
import axios from 'axios';
import {BiArrowBack} from "react-icons/bi";

function Login(this: any, props: any) {
  let navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const header = { headers: { "Access-Control-Allow-Origin": "*" } };
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await axios.post("https://localhost:5001/api/Account/login", {
      userName: userName, password: password,

    }, header).then((resp: any) => {
      localStorage.setItem("user-token", resp.data.token as string);

      console.log(resp);
      props.setSignIn(true);
      navigate("/Dashborad");
    });
  };


  return (
    <div className='row d-flex justify-content-center img' >
      <div className="wel d-flex justify-content-center" style={{ backgroundColor: "lightpink" }} >
        <div className='arrow' onClick={() => { navigate(`/`) }} >
          <BiArrowBack/>
        </div>
        <div>
          <div className='hea d-flex justify-content-center'>
            <h1>Login</h1>
          </div>
          <div className='hea d-flex justify-content-center'>
            <h5>Please login your account</h5>
          </div>
          <div className='hea d-flex justify-content-center'>
            <h5>UserName</h5>
            <input type="text" className="inpas" id="validationCustom01" placeholder="Enter user name" required onChange={(e) => setUserName(e.target.value)} />

          </div>
          <div className='hea d-flex justify-content-center'>
            <h5>Password</h5>
            <input className="inpas" type="text" id="validationCustom02" placeholder="Enter your password" required onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div className='Login d-flex justify-content-center'>
            <button type="button" className="btn btn-outline-light" onClick={handleSubmit}>Login</button>
          </div>
          <div className='mt-5 d-flex justify-content-center'>
            <span > Don't have an account?
              <span className="Reg" onClick={() => { navigate(`/Register`) }}>Register</span>
            </span>
          </div>
        </div>
      </div>
    </div>

  );
}

export default Login;
