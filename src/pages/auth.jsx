import React, { useContext } from "react";
import { Formik, Form, Field } from "formik";
import { Link, useHistory, useLocation } from "react-router-dom";
import * as Yup from "yup";
import _get from "lodash.get";
import { AuthDispatchContext, signIn } from "contexts/auth";
import Input from "components/core/form-controls/Input";
import { Button } from "antd";

const LoginSchema = Yup.object().shape({
  password: Yup.string().required("Password is required!"),
  username: Yup.string().required("Mobile Number or Email Address is required!")
});

const AuthPage = () => {
  const authDispatch = useContext(AuthDispatchContext);
  const history = useHistory();
  const location = useLocation();
  const fromUrl = _get(location, "state.from.pathname");
  console.log("location => ", location);
  const goToForgotPassword = (e) => {
    e.preventDefault();
  };

  const goToRegister = (e) => {
    e.preventDefault();
  };

  const signInSuccess = (userData) => {
    signIn(authDispatch, userData);
    if (fromUrl) {
      history.push(fromUrl);
    } else {
      history.push("/");
    }
  };


  const handleSubmit = () => {
    history.push("/")
    
  }

  return (
    <Formik
      initialValues={{
        username: "",
        password: ""
      }}
      validationSchema={LoginSchema}
      onSubmit={async (values, { resetForm }) => {
        try {
          const userData = { ...values };
          resetForm();
          signInSuccess(userData);
        } catch (err) {
          console.error(err);
        }
      }}
    >
      {() => (
        <Form>
          <Field
            name="username"
            type="text"
            placeholder="Mobile Number or Email Address"
            component={Input}
          />
          <Field
            name="password"
            type="password"
            placeholder="Password"
            component={Input}
          />

          <p>
            <a href="/#" onClick={goToForgotPassword}>
              Forgot Password?
            </a>
          </p>
          <Button className="auth-button block" onClick={handleSubmit}>
            Login
          </Button>

          <p>
            New here?{" "}
            <Link to="/#" onClick={goToRegister}>
              Sign Up Now!
            </Link>
          </p>
        </Form>
      )}
    </Formik>
  );
};

export default AuthPage;
