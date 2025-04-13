import React, { useState } from 'react';
import './LoginComponent.css';
export default function LoginComponent() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className='container'>

      <div className="side-image">
        <img src="https://dashboard.codeparrot.ai/api/image/Z_Qe1IDi91IKZZkN/search-r.png" alt="description" />
      </div>

      <div className='form-container'>
        <div className='form-toggle'>
          <button className={isLogin ? 'active' : ""} onClick={() => setIsLogin(true)}>Login</button>
          <button className={!isLogin ? 'active' : ""} onClick={() => setIsLogin(false)}>Sign Up</button>
        </div>

        {isLogin ? (
          <div className='form'>
            <h2>Namaste! Please Login to your account</h2>
            <input type='email' placeholder='Write your email here' />
            <input type='password' placeholder='Password' />
            <a href='#'>Forgot Password?</a>
            <button>Login</button>
            <p>Not a Member? <a href="#" onClick={() => setIsLogin(false)}>Sign Up now!</a></p>
          </div>
        ) : (
          <div className="form">
            <h2>Sign Up and discover great opportunities</h2>
            <input type='email' placeholder='Your email ID' />
            <input type='password' placeholder='Enter a strong password' />
            <input type='password' placeholder='Confirm your password' />
            <button>Sign Up</button>
            <p>Already a member? <a href="#" onClick={() => setIsLogin(true)}>Login here!</a></p>
          </div>
        )}
      </div>
      
    </div>
  );
}