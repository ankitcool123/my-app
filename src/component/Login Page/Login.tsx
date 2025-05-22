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
    const [loading, setLoading] = useState(false);
    const setAuthUser = useSetRecoilState(authUserAtom);

    const handleSubmit = async () => {
        setLoading(true);
        setError('');
        const parm = { userName, password };

        try {
            const response = await axios.post(baseUrl + "Account/login", parm);
            setAuthUser(response.data);
            props.setSignIn(true);
            navigate("/Dashborad/Contact");
        } catch (error: any) {
            if (error.response && error.response.status === 401) {
                setError("Invalid username or password.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='login-container'>
            <div className="login-card">
                <div className="login-content">
                    <div className="login-images"></div>
                    <div className="login-form">
                        <div className="form-container">
                            <h2 className="login-title">LOGIN</h2>
                            <input 
                                type='text' 
                                className="login-input" 
                                placeholder="Enter your name" 
                                onChange={(e) => setUserName(e.target.value)} 
                                value={userName}
                            />
                            <input 
                                type='password' 
                                className="login-input" 
                                placeholder="Enter your password" 
                                onChange={(e) => setPassword(e.target.value)} 
                                value={password}
                            />
                            {error && <div className="error-message">{error}</div>}
                            <button 
                                type="button" 
                                className="login-button" 
                                onClick={handleSubmit}
                                disabled={loading}
                            >
                                {loading ? <span className="loader"></span> : 'Login'}
                            </button>
                            <div className='register-link'>
                                Don't have an account?
                                <span className="register-text" onClick={() => navigate(`/Register`)}>
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
