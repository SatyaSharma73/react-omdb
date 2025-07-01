import React, { useState } from 'react';
import './Loginpage.scss'; // External CSS for styling
import { Link, useNavigate  } from 'react-router-dom';
import { useUserAuth } from '../../Context/UserAuthContext';
import {auth} from "../../../common/firebase"

const LoginPage = () => {
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [error,setError]=useState("");
  const {Login,googleSignin,resetPassword}=useUserAuth();
  const navigate=useNavigate();
  const handlelogin= async(e)=>{
    e.preventDefault();
    setError("");
   
      try {
        await Login(email,password)
        navigate("/")
      } catch (error) {
        setError(error.message);
      }
    }
  
const google=async (e)=>{
  e.preventDefault();
  try {
    await googleSignin();
    navigate("/")
  } catch (error) {
    setError(error.message)
    
  }
}
const Forgetpw = async (e) => {
  e.preventDefault();
  const emailPrompt = prompt("Enter your email address:");
  if (emailPrompt) {
    try {
      await resetPassword(emailPrompt);
      alert("Password reset email sent!");
    } catch (error) {
      alert("Error: " + error.message);
    }
  }
};

return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">Login</h2>
        {error}
        <form className="login-form" onSubmit={handlelogin}>
          <input type="text" placeholder="Username or Email" className="login-input" onChange={(e)=>setEmail(e.target.value)}/>
          <input type="password" placeholder="Password" className="login-input" onChange={(e)=>setPassword(e.target.value)}/>
          <button type="submit" className="login-button">Log In</button>
          <br />
        </form>
          <button className="google-login-btn" onClick={google}>Log In With Google</button>
        <p className="login-footer">
          New to FilmoraX ? <Link to="/signup">Create an account</Link>
        </p>
        <p className="login-footer" onClick={Forgetpw}>
        Forgot Password 
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
