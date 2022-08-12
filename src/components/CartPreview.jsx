import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import classNames from "classnames";
import {
  CartStateContext,
  CartDispatchContext,
  removeFromCart,
  toggleCartPopup
} from "contexts/cart";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Alert from "@mui/material/Alert";



const CartPreview = () => {
  const [open, setOpen] = React.useState(false);
  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    setOpen(false);
  };





  const { items, isCartOpen } = useContext(CartStateContext);
  const dispatch = useContext(CartDispatchContext);
  const history = useHistory();

  const handleRemove = (productId) => {
    setOpen(true)
    return removeFromCart(dispatch, productId);

  };

  const handleProceedCheckout = () => {
    if (items == 0) {

    } else {
      toggleCartPopup(dispatch);
      history.push("/checkout");
    }

  };

  return (
    <div className={classNames("cart-preview", { active: isCartOpen })}>
      <ul className="cart-items">
        {items.map((product) => {
          return (
            <li className="cart-item" key={product.name}>
              <img className="product-image" src={product.image} />
              <div className="product-info">
                <p className="product-name">{product.name}</p>
                <p className="product-price">{product.price}.000</p>
              </div>
              <div className="product-total">
                <p className="quantity">
                  {`${product.quantity} ${product.quantity > 1 ? "Nos." : "No."
                    }`}
                </p>
                <p className="amount">{product.quantity * product.price}.000 </p>
              </div>
              <button
                className="product-remove"
                onClick={() => handleRemove(product.id)}
              >
                ×
              </button>
              {/* <div>
                <Stack spacing={2} sx={{ width: '100%' }}>
                  <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="error"  sx={{ width: '100%', marginTop: -190, marginLeft: 190 }} >
                      Đã xóa {product.name} khỏi giỏ hàng
                    </Alert>
                  </Snackbar>
                </Stack>
              </div> */}
            </li>
          );
        })}

      </ul>
      <div className="action-block">
        <button
          type="button"
          className={classNames({ disabled: items && items.length === 0 })}
          onClick={handleProceedCheckout}
        >
          PROCEED TO CHECKOUT
        </button>

      </div>

    </div>
  );
};

export default CartPreview;
