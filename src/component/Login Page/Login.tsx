import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Login.css";
import axios from 'axios';
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
        <div className=' d-flex justify-content-center img'>
            <div className="card" style={{ width: "80%", height: "85vh", marginTop: "80px" }}>
                <div className="row">
                    <div className="col-7 ">
                        <div className="card login1" >
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
                                <h2 className="d-flex justify-content-center">LOGIN</h2>
                                <div className="d-flex justify-content-center">
                                    <input type='input' className="input1" placeholder="Enter your name" onChange={(e) => setUserName(e.target.value)} />
                                </div>
                                <div className="d-flex justify-content-center">
                                    <input type='password' className="input2" placeholder="Enter your password" onChange={(e) => setPassword(e.target.value)} />
                                </div>
                                <div className="d-flex justify-content-center">
                                    <button type="button" className="btn1 btn btn-danger" onClick={handleSubmit}>Login</button>
                                </div>
                                <div className='mt-5 d-flex justify-content-center'>
                                    <span > Don't have an account?
                                        <span className="Reg" onClick={() => { navigate(`/Register`) }}>Register</span>
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

export default Login;
