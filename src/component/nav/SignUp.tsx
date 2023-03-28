import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./SignUp.css";

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
    <div className="container mt-5 ">
      <div className="row d-flex justify-content-center">
        <div className="col-md-7">
          <div className="signIn card px-5 py-5" id="form1">
            <div className="form-data" v-if="!submitted">
              <h2 className="Register row d-flex justify-content-center">Register</h2>
              <h5 className="row d-flex justify-content-center">Please enter details to register</h5>
              <div className="forms-inputs col-md-4 mb-3">
                <h6 className="md-4 mb-3">UserName</h6>
                <input type="text" id="validationCustom01" placeholder="Enter user name" required onChange={(e) => setUserName(e.target.value)} style={{width:"100%"}} />
              </div>
              <div className="forms-inputs col-md-4 mb-3">
                <h6>Password</h6>
                <input type="text" id="validationCustom02" placeholder="Enter your password" required onChange={(e) => setPassword(e.target.value)} style={{width:"100%"}}/>
              </div>
              <div className="forms-inputs col-md-4 mb-3">
                <h6>Email</h6>
                <input type="text" id="validationCustom02" placeholder="Enter your password" required onChange={(e) => setEmailId(e.target.value)} style={{width:"100%"}}/>
              </div>
              <div className="forms-inputs col-md-4 mb-3">
                <h6>PhoneNumber</h6>
                <input type="text" id="validationCustom02" placeholder="Enter your password" required onChange={(e) => setPhoneNumber(e.target.value)} style={{width:"100%"}}/>
              </div>
              <div className="mb-3"> <button className="btn btn-dark w-100" onClick={handleSubmit}>Register</button> </div>
             <div >
              <a>Already have an account?</a>
              <a className="Login" onClick={() => {
                  navigate(`/`)
                }}>Login</a>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
}

export default SignUp;
