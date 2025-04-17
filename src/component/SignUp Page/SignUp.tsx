import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./SignUp.css";
import Swal from 'sweetalert2';

const baseUrl: any = process.env.REACT_APP_BASE_URL;

function SignUp(props: any) {
    const navigate = useNavigate();
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [emailId, setEmailId] = useState("");
    const [PhoneNumber, setPhoneNumber] = useState("");
    const [error, setError] = useState('');

    const header = { headers: { "Access-Control-Allow-Origin": "*" } };

    const updateProfileNotification = (e: any) => {
        Swal.fire({
            title: "You have Register successfully!",
            timer: 4000,
            width: "90%",
            // maxWidth: "400px",
        });
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        let parm = {
            userName: userName,
            password: password,
            emailId: emailId,
            PhoneNumber: PhoneNumber,
            dateOfBirth: dateOfBirth
        };

        axios.post(baseUrl + "Account/register", parm)
            .then(function (response) {
                updateProfileNotification(e);
            })
            .catch((error) => {
                if (error.response && error.response.status === 400) {
                    setError("Username already exists");
                }
            });
    };

    return (
        <div className='signup-container'>
            <div className="signup-card">
                <div className="signup-content">
                    <div className="signup-images">
                        {/* <div className="image-grid">
                            <div className="image-item image-1"></div>
                            <div className="image-item image-2"></div>
                            <div className="image-item image-3"></div>
                            <div className="image-item image-4"></div>
                        </div> */}
                    </div>
                    <div className="signup-form">
                        <form onSubmit={handleSubmit} className="form-container">
                            <h2 className="signup-title">REGISTER</h2>
                            <p className="signup-subtitle">Please enter details to register</p>

                            <input
                                type='text'
                                className="signup-input"
                                placeholder="Enter your name"
                                onChange={(e) => setUserName(e.target.value)}
                                required
                            />

                            {error && <div className="error-message">{error}</div>}

                            <input
                                type='password'
                                className="signup-input"
                                placeholder="Enter your password"
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />

                            <input
                                type='date'
                                className="signup-input"
                                id="dateInput"
                                name="dateInput"
                                placeholder="Enter your date of birth"
                                onChange={(e) => setDateOfBirth(e.target.value)}
                                required
                            />

                            <input
                                type='email'
                                className="signup-input"
                                placeholder="Enter your @Email"
                                onChange={(e) => setEmailId(e.target.value)}
                                required
                            />

                            <input
                                type='tel'
                                className="signup-input"
                                placeholder="Enter your phone number"
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                required
                            />

                            <button type="submit" className="signup-button">
                                Register
                            </button>

                            <div className='login-link'>
                                Already have an account?
                                <span className="login-text" onClick={() => navigate(`/`)}>
                                    Login
                                </span>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignUp;