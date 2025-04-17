import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Login.css";
import axios from 'axios';
import { useSetRecoilState } from 'recoil';
import { authUserAtom } from '../../state';

const baseUrl: any = process.env.REACT_APP_BASE_URL;

function Login(this: any, props: any) {
    const navigate = useNavigate();
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState('');
    const setAuthUser = useSetRecoilState(authUserAtom);

    const handleSubmit = async () => {
        let parm = { userName: userName, password: password };
        axios
            .post(baseUrl + "Account/login", parm)
            .then(function (response) {
                setAuthUser(response.data);
                props.setSignIn(true);
                navigate("/Dashborad/Contact");
            }).catch((error) => {
                if (error.response && error.response.status === 401) {
                    setError(" ");
                }
            });
    }

    return (
        <div className='login-container'>
            <div className="login-card">
                <div className="login-content">
                    <div className="login-images">
                        {/* <div className="image-grid">
                            <div className="image-item image-1"></div>
                            <div className="image-item image-2"></div>
                            <div className="image-item image-3"></div>
                            <div className="image-item image-4"></div>
                        </div> */}
                    </div>
                    <div className="login-form">
                        <div className="form-container">
                            <h2 className="login-title">LOGIN</h2>
                            <input 
                                type='text' 
                                className="login-input" 
                                placeholder="Enter your name" 
                                onChange={(e) => setUserName(e.target.value)} 
                            />
                            <input 
                                type='password' 
                                className="login-input" 
                                placeholder="Enter your password" 
                                onChange={(e) => setPassword(e.target.value)} 
                            />
                            {error && <div className="error-message">Invalid username or password.</div>}
                            <button 
                                type="button" 
                                className="login-button" 
                                onClick={handleSubmit}
                            >
                                Login
                            </button>
                            <div className='register-link'>
                                Don't have an account?
                                <span className="register-text" onClick={() => { navigate(`/Register`) }}>
                                    Register
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;