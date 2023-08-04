import React from 'react';
import { Link } from 'react-router-dom';
import "./Login.css"

const Login = () => {
  return (
    <div className="login_body">
      <div className="container">
        <div className="screen">
          <div className="screen__content">
            <form className="login">
              <div className="login__field">
                <i className="login__icon fas fa-user" />
                <input type="text" className="login__input" placeholder="User name / Email" />
              </div>
              <div className="login__field">
                <i className="login__icon fas fa-lock" />
                <input type="password" className="login__input" placeholder="Password" />
              </div>
              <Link to="/home">
                <button className="button login__submit">
                  <span className="button__text">Log In Now</span>
                  <i className="button__icon fas fa-chevron-right" />
                </button>
              </Link>
            </form>
          </div>
          <div className="screen__background">
            <span className="screen__background__shape screen__background__shape4" />
            <span className="screen__background__shape screen__background__shape3" />
            <span className="screen__background__shape screen__background__shape2" />
            <span className="screen__background__shape screen__background__shape1" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

