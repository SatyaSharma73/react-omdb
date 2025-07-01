import React, { useState } from 'react';
import './Loginpage.scss'; // External CSS for styling
import { Link, useNavigate  } from 'react-router-dom';
import { useUserAuth } from '../../Context/UserAuthContext';


const LoginPage = () => {
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [error,setError]=useState("");
  const {Login}=useUserAuth();
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
          {/* <button className="login-button">Log In With Google</button> */}
        <p className="login-footer">
          New to FilmoraX ? <Link to="/signup">Create an account</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
