import React, { useContext } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import _get from "lodash.get";
import { AuthDispatchContext, signIn } from "contexts/auth";
import { Button } from "antd";
import accountService from "Account/AccountService";
import { useState } from "react";
import { Alert, Box, LinearProgress, Snackbar } from "@mui/material";







const AuthPage = () => {
  // const authDispatch = useContext(AuthDispatchContext);
  const history = useHistory();
  // const location = useLocation();
  const [open, setOpen] = useState(false)



  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  // const fromUrl = _get(location, "state.from.pathname");



  // const signInSuccess = (userData) => {
  //   signIn(authDispatch, userData);
  //   if (fromUrl) {
  //     history.push(fromUrl);
  //   } else {
  //     history.push("/");
  //   }
  // };




  const handleSubmit2 = async (data) => {
    if (username == "" && password == "") {
      setOpen(true)
    } else {
      const data = [
        username = username.value,
        password = password.value
      ]
      await accountService.getUser2(data)
        .then((res) => {
          localStorage.setItem("access_token", res.data);
          window.location.replace("/");     
          
        })
        .catch((err) => {
          console.log(err)
        })
    }


  }




  const handleClose = () => {
    setOpen(false)
  }

  return (
    <>
      <div className="form-login-page">
        <div className="form-login">
          <input className="form-username"
            name="username"
            type="text"
            placeholder="User name"
            required
            value={username.value}
            onChange={(ev) => setUsername(ev, "username")}
          />
        </div>
        <div className="password-form">
          <input
            className="form-password"
            name="password"
            type="password"
            placeholder="Password"
            required
            value={password.value}
            onChange={(ev) => setPassword(ev, "password")}
          />
          <Button className="auth-button block" onClick={handleSubmit2}>
            Login
          </Button>
          <p className="title">
            You don't have an account?{" "}
            <Link to="/register" >
              Sign Up Now!
            </Link>
          </p>
        </div>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error" sx={{ width: '310px', marginTop: - 180, marginLeft: 95 }}>
            This is an error message!
          </Alert>
        </Snackbar>
      </div>
    </>
  );
};

export default AuthPage;
