import React, { useContext, useEffect, useState } from "react";
import { Link, useHistory, useParams, Redirect } from "react-router-dom";
import classNames from "classnames";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { Alert, Snackbar, Stack } from "@mui/material";
import MuiAlert from "@mui/material/Alert";

import {
  CheckoutStateContext,
  CheckoutDispatchContext,
  CHECKOUT_STEPS,
  setCheckoutStep,
  saveShippingAddress
} from "contexts/checkout";
import {
  CartDispatchContext,
  CartStateContext,
  removeCart,
  removeFromCart
} from "contexts/cart";
import { AuthStateContext, AuthDispatchContext, signOut } from "contexts/auth";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import _get from "lodash.get";
import Input from "components/core/form-controls/Input";
import { phoneRegExp } from "constants/common";
import axios from "axios";
import OrderDetails from "./OrderDetails/OrderDetails";

const AddressSchema = Yup.object().shape({
  // fullName: Yup.string().required("Full Name is required"),
  // phoneNumber: Yup.string()
  //   .required("Phone Number is required")
  //   .matches(phoneRegExp, "Phone Number is not a valid 10 digit number")
  //   .min(10, "Phone Number is too short")
  //   .max(10, "Phone Number is too long")
});
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Checkout = () => {
  const [fullName, setfullName] = React.useState("");
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [note, setNote] = React.useState("");
  const [openAlerts, setOpenAlerts] = React.useState(false);
  const [products, setProducts] = React.useState([]);
  const { items = [] } = useContext(CartStateContext);
  const [open, setOpen] = React.useState(false);
  const checkoutDispatch = useContext(CheckoutDispatchContext);
  const totalItems = items.length;
  let total = 0;
  const history = useHistory();
  const dispatch = useContext(CartDispatchContext);
  const [openalert, setOpenAlert] = React.useState(false);
  let { id } = useParams();

  const handleClick = () => {
    setOpenAlerts(true);
  };

  const handleClickOpen = () => {
    if (fullName || phoneNumber !== "") {
      setOpen(true);
    } else {
      setOpenAlert(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleContinueShopping = () => {
    history.push("/");
  };
  const handleSaveAddress = (addressData) => {
    saveShippingAddress(checkoutDispatch, addressData);
  };

  const handleClickTimeline = (nextStep) => {
    setCheckoutStep(checkoutDispatch, nextStep);
  };
  const handleChangeName = (ev) => {
    setfullName(ev.target.value);
  };
  const handleChangePhone = (ev) => {
    setPhoneNumber(ev.target.value);
  };
  const handleChangeNote = (ev) => {
    setNote(ev.target.value);
  };

  const orderNow = () => {
    setOpenAlerts(true);
    setOpen(false);
    const newArr = [];
    items.map((e) => {
      newArr.push({ foodId: e.id, quantity: e.quantity });
    });
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        foods: newArr,
        fullName: fullName,
        note: note,
        phone: phoneNumber
      })
    };

    fetch("https://order-foods.herokuapp.com/api/v1/orders/create", options)
      .then((response) => response.json())
      .then((products) => {
        setProducts(products);
        console.log("dasdsadsa", products);
        localStorage.removeItem("cartItems")
        history.push(`/order-details/${products.id}`);
      })
      .catch((err) => {
        console.log(err);
      });

  };

  const handleRemove = (items) => {
    return removeCart(dispatch, items);
  };

  const handleCloseAlert = () => {
    setOpenAlert(false);
  };
  return (
    <>
      <div className="checkout-page">
        <div className="container">
          <div className="order-summary">
            <h2>
              Summary
              <span>{` (${totalItems}) Items`}</span>
            </h2>
            <ul className="cart-items">
              {items.map((product) => {
                total += product.quantity * product.price;
                return (
                  <li className="cart-item" key={product.name}>
                    <img className="product-image" src={product.image} />
                    <div className="product-info">
                      <p className="product-name">{product.name}</p>

                      <p className="product-price">{product.price}.000</p>
                    </div>
                    <button
                      className="product-remove"
                      onClick={() => handleRemove(product.id)}
                    >
                      ×
                    </button>

                    <div className="product-total">
                      <p className="quantity">
                        {`${product.quantity} ${
                          product.quantity > 1 ? "Nos." : "No."
                        }`}
                      </p>

                      <p className="amount">
                        {product.quantity * product.price}.000
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>

            <ul className="total-breakup">
              <li>
                <h2>Total :</h2>
                <h2>{total}.000 vnd</h2>
              </li>
            </ul>
          </div>
          <div className="order-details" style={{ marginLeft: "50px" }}>
            <div className="detail-container">
              <ul className="timeline"></ul>
              <h2>Personal Information</h2>
              <Formik
                initialValues={{
                  fullName: "",
                  phoneNumber: ""
                }}
                validationSchema={AddressSchema}
                onSubmit={async (values, { resetForm }) => {
                  try {
                    const addressData = { ...values };
                    resetForm();
                    handleSaveAddress(addressData);
                  } catch (err) {
                    console.error(err);
                  }
                }}
              >
                {() => (
                  <Form>
                    <div className="field-group">
                      <Field
                        id="fullName"
                        name="fullName"
                        type="text"
                        value={fullName.value}
                        placeholder="Full Name"
                        onChange={handleChangeName}
                        component={Input}
                        style={{ outline: "none" }}
                      />
                      <Field
                        id="phoneNumber"
                        name="phoneNumber"
                        value={phoneNumber.value}
                        type="text"
                        placeholder="Phone Number"
                        onChange={handleChangePhone}
                        component={Input}
                        style={{ outline: "none" }}
                      />
                    </div>
                    <Field
                      name="note"
                      type="text"
                      value={note.value}
                      onChange={handleChangeNote}
                      placeholder="Ghi chú món ăn"
                      component={Input}
                      style={{ height: "70px", outline: "none" }}
                    />

                    <div className="actions">
                      <button
                        type="button"
                        className="outline"
                        onClick={() => handleContinueShopping()}
                        style={{
                          backgroundColor: "lime",
                          color: "black",
                          marginTop: "112px"
                        }}
                      >
                        <i className="rsc-icon-arrow_back" /> Shoping
                      </button>
                      {/* <Link to="/order-details"> */}

                      <button
                        disabled={items == ""}
                        type="submit"
                        onClick={handleClickOpen}
                        style={{ backgroundColor: "lime", color: "black" }}
                      >
                        Order
                        <i className="rsc-icon-arrow_forward" />
                      </button>
                      <Dialog
                        open={open}
                        TransitionComponent={Transition}
                        keepMounted
                        onClose={handleClose}
                        aria-describedby="alert-dialog-slide-description"
                      >
                        <DialogTitle style={{ color: "rgb(11, 193, 34)" }}>
                          <CheckCircleOutlineIcon />{" "}
                          {"Bạn Có Chắc Chắn Muốn Order ?"}{" "}
                        </DialogTitle>
                        <DialogContent>
                          <DialogContentText id="alert-dialog-slide-description">
                            <p>
                              -- Hãy kiểm tra lại các mặt hàng đã chọn và thông
                              tin của bạn.
                            </p>
                            <p style={{ marginTop: "5px" }}>
                              -- Vui lòng ấn OK để Order các sản phẩm mà đã
                              chọn.{" "}
                            </p>
                          </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                          <Button
                            onClick={handleClose}
                            style={{
                              backgroundColor: "lime",
                              color: "black",
                              marginRight: "21rem",
                              marginTop: "30px",
                              borderRadius: "12px"
                            }}
                          >
                            Cancel
                          </Button>
                          {/* <Link to={`/order-details/${id}`}> */}
                          <Button
                            onClick={orderNow}
                            style={{
                              backgroundColor: "lime",
                              color: "black",
                              marginTop: "30px",
                              borderRadius: "12px"
                            }}
                          >
                            ok
                          </Button>

                          {/* </Link> */}
                        </DialogActions>
                      </Dialog>
                      {/* </Link> */}
                    </div>
                    <Stack spacing={2} sx={{ width: "100%" }}>
                      <Snackbar
                        open={openalert}
                        autoHideDuration={6000}
                        onClose={handleCloseAlert}
                      >
                        <Alert
                          onClose={handleCloseAlert}
                          severity="error"
                          sx={{
                            width: "100%",
                            marginLeft: 180,
                            marginTop: -190
                          }}
                        >
                          Vui lòng nhập thông tin của bạn !
                        </Alert>
                      </Snackbar>
                    </Stack>
                    <div>
                      <Snackbar
                        open={openAlerts}
                        autoHideDuration={6000}
                        onClose={handleClose}
                      >
                        <Alert
                          onClose={handleClose}
                          severity="success"
                          sx={{ 
                            width: "100%",
                            marginLeft:"980px",
                            marginTop:"-1000px",
                            
                         }}
                        >
                          Bạn đã order thành công !
                        </Alert>
                      </Snackbar>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>

            {/* {step === CHECKOUT_STEPS.SHIPPING && <AddressStep />} */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
