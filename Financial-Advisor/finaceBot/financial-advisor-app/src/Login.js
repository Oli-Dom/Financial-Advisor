import React from 'react';
import { Link } from 'react-router-dom';
import "./Login.css"

const Login = () => {
  return (
    <div className="login-container">
      <h2>Login</h2>
      <div className="input-container">
        <input type="text" placeholder="Username" className="input-field" />
        <input type="password" placeholder="Password" className="input-field" />
        {/* Link to Home component */}
        <Link to="/home">
          <button className="login-btn">Login</button>
        </Link>
      </div>
    </div>
  );
};

export default Login;

