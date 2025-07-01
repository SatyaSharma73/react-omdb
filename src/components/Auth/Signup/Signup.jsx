import React, { useState } from 'react';
import './SignupPage.scss'; // SCSS styling
import { Link,useNavigate } from 'react-router-dom';
import { useUserAuth } from '../../Context/UserAuthContext';

const SignupPage = () => {
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [confirmpassword,setConfirmPassword]=useState("");
  const {signup}=useUserAuth();
  const [error,setError]=useState("");
  const navigate=useNavigate();
  const handleSubmit= async(e)=>{
    e.preventDefault();
    setError("");
    if(password===confirmpassword)
    {
      try {
        await signup(email,password)
        navigate("/login")
      } catch (error) {
        setError(error.message);
      }
    }else{
      setError("Password didnt match");
    }

  }
  return (
    <div className="signup-container">
      <div className="signup-box">
        <h2 className="signup-title">Create FilmoraX Account</h2>
        {error}
        <form className="signup-form" onSubmit={handleSubmit}>
          <input type="text" placeholder="Full Name" className="signup-input" />
          <input type="email" placeholder="Email" className="signup-input"    onChange={(e)=>setEmail(e.target.value)}/>
          <input type="password" placeholder="Password" className="signup-input"  onChange={(e)=>setPassword(e.target.value)}/>
          <input type="password" placeholder="Confirm Password" className="signup-input" onChange={(e)=>setConfirmPassword(e.target.value)}/>
          <button type="submit" className="signup-button">Sign Up</button>
        </form>
        <p className="signup-footer">
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
