import React from "react";
import { Link } from "react-router-dom";

const AuthLayout = ({ children }) => {
  return (
    <div className="auth-container">
      <div className="wrapper">
        <div className="auth-brand">
          
            <img
              className="logo"
              src="http://www.epayment.com.ng/images/blog-wp-login-1200x400.png"
              alt="Veggy Brand Logo"
            />
       
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default AuthLayout;
