import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { Alert, Snackbar, Stack } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Slide from "@mui/material/Slide";
import React, { useContext } from "react";
import { useHistory, useParams } from "react-router-dom";


import Input from "components/core/form-controls/Input";
import { AuthDispatchContext, AuthStateContext, signOut } from "contexts/auth";
import {
  CartDispatchContext,
  CartStateContext,
  removeCart
} from "contexts/cart";
import {
  CheckoutDispatchContext,
  CHECKOUT_STEPS, saveShippingAddress, setCheckoutStep
} from "contexts/checkout";
import publicService from "contexts/PublicService";
import { Field, Form, Formik } from "formik";
import { formatCurrencyToVND } from "ulti/formatDate";
import * as Yup from "yup";

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

const TRIP_TYPE = {
  ONEWAY: 1,
  ROUNDTRIP: 2,
};

const Checkout = () => {
  const [cart, setCart] = React.useState([]);
  const [checkbox, setCheckbox] = React.useState(TRIP_TYPE.ONEWAY);
  const [checkbox1, setCheckbox1] = React.useState(false);

  const [address, setAddress] = React.useState("");
  const [fullName, setfullName] = React.useState("");
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [orderTime, setOrderTime] = React.useState("");
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
  const { user, isLoggedIn } = useContext(AuthStateContext);
  const authDispatch = useContext(AuthDispatchContext);
  const [quantity, setQuantity] = React.useState(1);


  const handleCheckbox = () => {
    setCheckbox1(false);
    setAddress(false);
    setCheckbox(true);
  }

  const handleShiping = (ev) => {
    // setCheckbox(true);
    setCheckbox1(true);
    setCheckbox(false);


  }

  const handleClick = () => {
    setOpenAlerts(true);
  };

  const handleClickOpen = () => {
    if (fullName && phoneNumber !== "") {
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
  const handleChangeOrderTime = (ev) => {
    setOrderTime(ev.target.value);
  }
  const handleChangeAddress = (ev) => {
    setAddress(ev.target.value);
  }


  const orderNow = async () => {
    setOpenAlerts(true);
    setOpen(false);
    const newArr = [];
    items.map((e) => {
      newArr.push({ foodId: e.id, quantity: e.quantity });
    });
    // const options = {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json"
    //   },
    //   body: JSON.stringify({
    //     foods: newArr,
    //     shipName: fullName,
    //     // mealTime: orderTime,
    //     note: note,
    //     shipPhone: phoneNumber
    //   })
    // };

    // fetch("http://13.213.7.133/api/v1/orders", options)
    await publicService.createOrder({
      note: note,
      shipAddress: address,
      // foods: newArr,
      shipName: fullName,
      // mealTime: orderTime,
      shipPhone: phoneNumber,
      shipType: "RESTAURANT"
    })
      .then((response) => {
        if (response != null) {

          console.log('response', response)
        }
        // return response.json()
        //  history.push(`/order-details/${response.data.id}`);
        localStorage.removeItem("cartItems");


      });

    // .then((products) => {
    //   setProducts(products);
    //   console.log("dasdsadsa", products);
    //   localStorage.removeItem("cartItems");
    //   history.push(`/order-details/${products.id}`);
    //   products.push(`/order-management/${products.id}`);
    // })
    // .catch((err) => {
    //   console.log(err);
    // });
  };

  const handleChange = (items) => {
    // const ind = cart.indexOf(items);
    // const arr = cart;
    // setQuantity(items)
    // // arr[ind].quantity = items;

    // if (arr[ind].quantity === 0) arr[ind].quantity = 1;
    // setCart([...arr]);
    if (items == "+") {
      setQuantity(quantity + 1);
    } else if (items == "-" && quantity > 1) {
      setQuantity(quantity - 1);
    }
  };


  const handleRemove = (items) => {
    return removeCart(dispatch, items);
  };

  const handleCloseAlert = () => {
    setOpenAlert(false);
  };
  const handleGotoLogin = () => {
    history.push("/login");
  };
  const handleLoginAsDiffUser = () => {
    signOut(authDispatch);
    history.push("/login");
  };
  const handleProceed = () => {
    setCheckoutStep(checkoutDispatch, CHECKOUT_STEPS.SHIPPING);
  };
  return (
    <>

      <div className="checkout-page container">
        <div >

          <h1
            style={{
              marginBottom: "25px",
              color: "#077915",
              fontSize: "50px",
              // marginTop: "150px"
            }}
          >
            Checkout
          </h1>
          <div className="row">
            <div className="col-lg-8">

              <div className="order-details" >
                <div className="detail-container">
                  <ul className="timeline"></ul>
                  {/* <div className="detail-container">
                    <h2>Sign In now!</h2>
                    <div className="auth-message">
                      {isLoggedIn ? (
                        <>
                          <p>
                            Logged in as <span>{user.username}</span>
                          </p>
                          <button onClick={() => handleLoginAsDiffUser()}>
                            Login as Different User
                          </button>
                        </>
                      ) : (
                        <>
                          <p>Please login to continue.</p>
                          <button onClick={() => handleGotoLogin()}>Login</button>
                        </>
                      )}
                    </div>
                    <div className="actions">

                      <button disabled={!isLoggedIn} onClick={() => handleProceed()}>
                        Proceed
                        <i className="rsc-icon-arrow_forward" />
                      </button>
                    </div>
                  </div> */}
                  <h2>Personal Information</h2>
                  <FormControl>
                    {/* <FormLabel id="demo-row-radio-buttons-group-label">Gender</FormLabel> */}
                    <RadioGroup
                      row
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      name="row-radio-buttons-group"
                    >
                      <FormControlLabel
                        // checked={TRIP_TYPE.ONEWAY == true}
                        checked={checkbox == true}
                        value={checkbox}
                        control={<Radio />}
                        label="Ăn tại quán"
                        // checked={checkbox === TRIP_TYPE.ONEWAY}
                        onChange={handleCheckbox}

                      />

                      <FormControlLabel
                        // checked={TRIP_TYPE.ONEWAY == false}
                        // checked={checkbox1 === TRIP_TYPE.ROUNDTRIP}
                        value={TRIP_TYPE.ROUNDTRIP}
                        control={<Radio />}
                        label="Shipping"
                        onChange={handleShiping}

                      />


                    </RadioGroup>
                  </FormControl>
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
                          disabled={checkbox1 == false}
                          name="addressLine"
                          type="text"
                          placeholder="Door No. & Street"
                          value={address.value}
                          component={Input}
                          onChange={handleChangeAddress}
                        />
                        {/* <div style={{ marginBottom: "10px" }}>

                          <TextField

                            id="time"
                            label="Thời gian nhận đồ"
                            type="time"
                            value={orderTime.value}
                            onChange={handleChangeOrderTime}
                            InputLabelProps={{
                              shrink: true
                            }}
                            inputProps={{
                            }}
                            sx={{ width: 150 }}
                            style={{ display: "flex", justifyContent: "center" }}
                          />
                        </div> */}
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
                              marginTop: "35px"
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
                              Vui lòng nhập đầy đủ thông tin của bạn !
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
                                marginLeft: "980px",
                                marginTop: "-1300px"
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
            <div className="col-lg-4" >
              <div className="order-summary">
                <h2>
                  Summary
                  <span>{` (${totalItems}) Items`}</span>
                </h2>
                <ul className="cart-items">
                  {items.map((product) => {
                    total += product.quantity * product.price;
                    // var {quantity} = product.quantity > 0 ? product : product;
                    return (
                      <li className="cart-item" key={product.name}>
                        <img className="product-image" src={product.images} />
                        <div className="product-info">
                          <p className="product-name">{product.name}</p>
                          <p className="product-price">
                            {formatCurrencyToVND(product.price)}
                          </p>
                        </div>
                        <div className="stepper-input" style={{ marginRight: "25px" }}>
                          <button style={{ borderRadius: "999px" }} onClick={() => handleChange("-")}>–</button>
                          <input
                            type="number"
                            className="quantity"
                            value={quantity}
                            style={{ borderRadius: "999px", height: "40px" }}
                            onChange={() => setQuantity(quantity)}
                          >
                          </input>
                          <button style={{ borderRadius: "999px" }} onClick={() => handleChange("+")}>+</button>
                        </div>
                        <button
                          className="product-remove"
                          onClick={() => handleRemove(product.id)}
                        >
                          ×
                        </button>

                        <div className="product-total">
                          {/* <p className="quantity">
                            {`${product.quantity} ${product.quantity > 1 ? "Nos." : "No."
                              }`}
                          </p> */}

                          <p className="amount">
                            {formatCurrencyToVND(product.quantity * product.price)}
                          </p>
                        </div>
                      </li>
                    );
                  })}
                </ul>

                <ul className="total-breakup">
                  <li>
                    <h2>Total :</h2>
                    <h2>{formatCurrencyToVND(total * quantity)}</h2>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Checkout;
