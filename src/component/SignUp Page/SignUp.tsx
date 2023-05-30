import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./SignUp.css";

const baseUrl: any = process.env.REACT_APP_BASE_URL;

function SignUp(props: any) {
    let navigate = useNavigate();
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [emailId, setEmailId] = useState("");
    const [PhoneNumber, setPhoneNumber] = useState("");

    const header = { headers: { "Access-Control-Allow-Origin": "*" } };
    const handleSubmit = async (e: any) => {
        let parm = { userName: userName, password: password, emailId: emailId, PhoneNumber: PhoneNumber };
        axios
            .post(baseUrl + "Account/register", parm)
    };

    return (
        <div className=' d-flex justify-content-center img'>
            <div className="card" style={{ width: "80%", height: "85vh", marginTop: "80px" }}>
                <div className="row">
                    <div className="col-7 ">
                        <div className="card sign1 ">
                            <div className="row">
                                <div className='col-6'>
                                    <div className="newone4"></div>
                                    <div className="newone1"></div>
                                </div>
                                <div className='col-6'>
                                    <div className="newone2"></div>
                                    <div className="newone3"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-5">
                        <div className="d-flex justify-content-center">
                            <div className="container log1">
                                <h2 className="d-flex justify-content-center">REGISTER</h2>
                                <h5 className="d-flex justify-content-center">Please enter details to register</h5>
                                <div className="d-flex justify-content-center">
                                    <input type='input' className="input1" placeholder="Enter your name" onChange={(e) => setUserName(e.target.value)} />
                                </div>
                                <div className="d-flex justify-content-center">
                                    <input type='password' className="input2" placeholder="Enter your password" onChange={(e) => setPassword(e.target.value)} />
                                </div>
                                <div className="d-flex justify-content-center">
                                    <input type='email' className="input2" placeholder="Enter your @Email" onChange={(e) => setEmailId(e.target.value)} />
                                </div>
                                <div className="d-flex justify-content-center">
                                    <input type='number' className="input2" placeholder="Enter your phone number" onChange={(e) => setPhoneNumber(e.target.value)} />
                                </div>
                                <div className="d-flex justify-content-center">
                                    <button type="button" className="btn1 btn btn-danger" onClick={handleSubmit}>Register</button>
                                </div>
                                <div className='mt-5 d-flex justify-content-center'>
                                    <span > Already have an account?
                                        <span className="Reg" onClick={() => { navigate(`/`) }}>Login</span>
                                    </span>
                                </div>

                            </div>

                        </div>

                    </div>
                </div>
            </div>

        </div>

    );
}

export default SignUp;
