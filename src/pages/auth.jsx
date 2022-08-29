// import { Button } from "antd"
// import GoogleButton from "react-google-button"
// import { Link } from "react-router-dom"

// const Login = () => {
//   return (
//     <>
//       <div>
//         <GoogleButton
//           className="g-btn"
//           type="dark"
//         // onClick={handleGoogleSignIn}
//         />
//       </div>

//       <Link to="/phonesignup">
//         <div className="d-grid gap-2 mt-3" >
//           <Button variant="success" type="Submit" >
//             Sign in with Phone
//           </Button>
//         </div>
//       </Link>

//     </>
//   )
// }
// export default Login


import React, { useContext } from "react";
import { Formik, Form, Field } from "formik";
import { Link, useHistory, useLocation } from "react-router-dom";
import * as Yup from "yup";
import _get from "lodash.get";
import { AuthDispatchContext, signIn } from "contexts/auth";
import Input from "components/core/form-controls/Input";
import PhoneInput from "react-phone-input-2";
import { useState } from "react";

const LoginSchema = Yup.object().shape({
  password: Yup.string().required("Password is required!"),
  username: Yup.string().required("Mobile Number  required!")
});

const AuthPage = () => {
  const authDispatch = useContext(AuthDispatchContext);
  const [phoneNumber, setPhoneNumber] = useState("");
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
          <PhoneInput
            style={{ marginLeft: "25px" }}
            country={'vn'}
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e)}
           
          />


          <button className="auth-button block" onClick={() => { }}>
            Login
          </button>

          <p>
            New here?{" "}
            <Link to="/register" onClick={goToRegister}>
              Sign Up Now!
            </Link>
          </p>
        </Form>
      )}
    </Formik>
  );
};

export default AuthPage;