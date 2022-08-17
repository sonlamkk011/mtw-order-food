import React, { useState, useContext } from "react";
import {
  CartDispatchContext,
  addToCart,
  CartStateContext
} from "contexts/cart";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Alert from "@mui/material/Alert";
import { formatCurrencyToVND } from "ulti/formatDate";
import { Button, Modal } from "antd";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const ProductCard = ({ data }) => {
  const [isAdded, setIsAdded] = useState(false);
  const dispatch = useContext(CartDispatchContext);
  const { image, name, price, id, stock } = data;
  const [open, setOpen] = React.useState(false);

  const [openImage, setOpenImage] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  const handleAddToCart = () => {
    const product = { ...data, quantity: 1 };
    addToCart(dispatch, product);
    setIsAdded(true);
    setOpen(true);
    setTimeout(() => {
      setIsAdded(false);
      setOpen(false);
    }, 3500);
  };

  const handleAdditems = () => {
    const items = { ...data, quantity: 0 };
    addToCart(dispatch, items);
  };

  const handleClickOpenImage = () => {
    setOpenImage(true);
  };

  const handleCloseImage = () => {
    setOpenImage(false);
  };

  return (
    <div className="product col-lg-4">
      <div>
        <div className="product-image" >
          <img onClick={handleClickOpenImage} src={image} alt={name}></img>
        </div>
        <div>
          <Dialog
            open={openImage}
            onClose={handleCloseImage}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              <img src={image} alt={name} width={"100%"} height={"100%"} style={{borderRadius:"20px"}}></img>
              <div style={{padding:"24px", background:"#f1f1f1", borderRadius:"0 0 4px 4px", width:"100%"}}>
              <span>{name}</span>
              <span style={{float:"right"}}> {formatCurrencyToVND(price)}</span>
              </div>
            </DialogTitle>
          </Dialog>
        </div>
        <h1
          className="product-name"
          // style={{ marginLeft: "1px", color: "#077915" }}
        >
          {name}
        </h1>
        <p className="product-price" >
          {formatCurrencyToVND(price)}
        </p>
        <div className="stepper-input"></div>
        <div className="product-action">
          <button
            type="button"
            onClick={handleAddToCart}
            className={!isAdded ? "" : "added"}
            style={{color:"#fff"}}
          >
            {!isAdded ? "ADD TO CART" : "✔  ADDED"}
          </button>
        </div>
        <div>
          <Snackbar
            open={open}
            autoHideDuration={6000}
            onClose={handleClose}
            style={{ height: 50 }}
          >
            <Alert
              onClose={handleClose}
              severity="success"
              sx={{ width: "100%", marginTop: -190, marginLeft: 190 }}
            >
              Đã Thêm {name} vào giỏ hàng
            </Alert>
          </Snackbar>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
