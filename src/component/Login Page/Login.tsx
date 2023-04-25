import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Login.css";
import axios from 'axios';
import { BiArrowBack } from "react-icons/bi";
import { useSetRecoilState } from 'recoil';
import { authUserAtom } from '../../state';

const baseUrl: any = process.env.REACT_APP_BASE_URL;

function Login(this: any, props: any) {
  let navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const setAuthUser = useSetRecoilState(authUserAtom)

  const handleSubmit = async () => {
    let parm = { userName: userName, password: password };
    axios
      .post(baseUrl + "Account/login", parm)
      .then(function (response) {
        setAuthUser(response.data);
        props.setSignIn(true);
        navigate("/Dashborad");
      })
  }

  return (
    <div className='row d-flex justify-content-center img' >
      <div className="wel d-flex justify-content-center" style={{ backgroundColor: "lightpink" }} >
        <div className='arrow' onClick={() => { navigate(`/`) }} >
          <BiArrowBack />
        </div>
        <div>
          <div className='hea d-flex justify-content-center'>
            <h1>Login</h1>
          </div>
          <div className='hea d-flex justify-content-center'>
            <h5>Please login your account</h5>
          </div>
          <form className="needs-validation">
          <div className='hea d-flex justify-content-center was-validated'>
          <label htmlFor="validationCustom01" className="form-label">UserName</label>
            <input type="text" className="inpas form-control " id="validationServer01" placeholder="Enter user name" required onChange={(e) => setUserName(e.target.value)} />
            <div className="invalid-feedback">
              Please Enter Your Username
            </div>
          </div>
          <div className='hea d-flex justify-content-center was-validated' >
          <label htmlFor="validationCustom01" className="form-label">Password</label>
            <input className="inpas form-control" type="password" id="validationCustom02" placeholder="Enter your password" required onChange={(e) => setPassword(e.target.value)} />
            <div className="invalid-feedback" >
              Please Enter Your Password
            </div>
          </div>
          <div className='Login d-flex justify-content-center'>
            <button type="button" className="btn btn-outline-light" onClick={handleSubmit}>Login</button>
          </div>
          <div className='mt-5 d-flex justify-content-center'>
            <span > Don't have an account?
              <span className="Reg" onClick={() => { navigate(`/Register`) }}>Register</span>
            </span>
          </div>
          </form>
        </div>
      </div>
    </div>

  );
}

export default Login;
