import React, {useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Login.css";
import axios from 'axios';

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
      navigate("/Home");
    });
  };


  return (
    <div className="container mt-5 " >
      <div className="row d-flex justify-content-center">
        <div className="col-md-7">
          <div className="signIn card px-5 py-5" id="form1">
            <div className="form-data" v-if="!submitted">
              <h2 className="log row d-flex justify-content-center">Login</h2>
              <h5 className="mb-4 row d-flex justify-content-center">Please login your account</h5>
              <div className="forms-inputs col-md-4 mb-3">
                <h6>UserName</h6>
                <input type="text" id="validationCustom01" placeholder="Enter user name" required onChange={(e) => setUserName(e.target.value)} style={{ width: "100%" }} />
              </div>
              <div className="forms-inputs col-md-4 mb-3">
                <h6>Password</h6>
                <input type="text" id="validationCustom02" placeholder="Enter your password" required onChange={(e) => setPassword(e.target.value)} style={{ width: "100%" }} />
              </div>
              <div className="mb-3"> <button className="btn btn-dark w-100" onClick={handleSubmit}>Login</button> </div>
              <div  >
                <a> Don't have an account?</a>
                <a className="Reg" onClick={() => {
                  navigate(`/Register`)
                }}>Register</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
