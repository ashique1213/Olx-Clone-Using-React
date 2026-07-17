import React, { useState } from "react";
import "./LogIn.css";
import OlxLogo from "../../assets/OlxLogo";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../Firebase/firebase";

const LogIn = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate();

  //login-function
  const user_auth = async (e) => {
    e.preventDefault();
    const success = await login(email, password);
    if (success) {
      navigate('/');
    }
  }

  return (
    <div className="signupContainer">
      <div className="signupForm">
        <div className="logoContainer">
          <OlxLogo />
        </div>
        <form>
          <div className="formGroup">
            <label htmlFor="email">Email</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" id="email" placeholder="Enter your email" />
          </div>
          <div className="formGroup">
            <label htmlFor="password">Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="password"
              placeholder="Enter your password"
            />
          </div>
          <button type="submit" className="signupBtn" onClick={user_auth}>
            Login
          </button>
        </form>
        <div className="loginRedirect">
          <span>New to OLX? </span>
          <Link to={'/signup'}>
            <button className="loginBtn">SignUp</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
