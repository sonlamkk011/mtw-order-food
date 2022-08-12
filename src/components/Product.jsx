import React, { useState, useContext } from "react";
import { CartDispatchContext, addToCart } from "contexts/cart";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Alert from "@mui/material/Alert";




const   ProductCard = ({ data }) => {
  const [isAdded, setIsAdded] = useState(false);
  const dispatch = useContext(CartDispatchContext);
  const { image, name, price, id, stock } = data;
  const [open, setOpen] = React.useState(false);




  const handleClose = () => {
    setOpen(false);
  }

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

  return (
    <div className="product row">
        <div className="col-lg-4">

      <div className="product-image" style={{ borderRadius: "5px" }}>
        <img src={image} alt={name} />
      </div>
      <h1 className="product-name" style={{marginLeft:"1px", color:"#077915"}}>{name}</h1>
      <p className="product-price" >{price}.000 vnd</p>
      <div className="product-action">
        <button
         
          type="button"
          onClick={handleAddToCart}
          className={!isAdded ? "" : "added"}

        >
        {!isAdded ? "ADD TO CART" : "✔️ ADDED"}
        </button>

      </div>
      <div >
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} style={{ height: 50, }}>
          <Alert onClose={handleClose} severity="success" sx={{ width: '100%', marginTop: -190, marginLeft: 190 }}>
            Đã Thêm {name} vào giỏ hàng
          </Alert>
        </Snackbar>
      </div>
    </div>

      </div>



  );
}

export default ProductCard;
