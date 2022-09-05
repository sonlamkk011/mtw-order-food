import classNames from "classnames";
import {
  CartDispatchContext, CartStateContext, removeFromCart,
  toggleCartPopup
} from "contexts/cart";
import publicService from "contexts/PublicService";
import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { formatCurrencyToVND } from "ulti/formatDate";

const CartPreview = () => {
  const [open, setOpen] = React.useState(false);
  const [cartItems, setCartItems] = React.useState([]);


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
    setOpen(true);
    return removeFromCart(dispatch, productId);
  };

  const handleProceedCheckout = () => {
    if (items == 0) {
    } else {
      toggleCartPopup(dispatch);
      history.push("/checkout");
    }
    
  };

  const shoppingCart = async ()  => {
  const cartItems = await publicService.createShoppingCart()
  .then((response) => response)
  setCartItems(cartItems.data)
  
  }
  
  useEffect(() => {
    shoppingCart()
    console.log(cartItems)
  }, [])
  
  return (
    <div className={classNames("cart-preview", { active: isCartOpen })}>
      {cartItems == "" ? (
        <div className="empty-cart">
          <img
            src="https://res.cloudinary.com/sivadass/image/upload/v1495427934/icons/empty-cart.png"
            alt="empty-cart"
          />
          <h2>You cart is empty!</h2>
        </div>
      ) : (
        <ul className="cart-items">
          {cartItems?.data?.map((product) => {
            return (
              <li className="cart-item" key={product.items.id}>
                <img className="product-image" src={product.items.images} />
                <div className="product-info">
                  <p className="product-name">{product.items.name}</p>
                  <p className="product-price">
                    {formatCurrencyToVND(product.items.unitPrice)}
                  </p>
                </div>
                <div className="product-total">
                  <p className="quantity">
                    {`${product.items.quantity} ${
                      product.items.quantity > 1 ? "Nos." : "No."
                    }`}
                  </p>
                  <p className="amount">
                    {formatCurrencyToVND(product.items.quantity * product.items.unitPrice)}{" "}
                  </p>
                </div>
                <button
                  className="product-remove"
                  onClick={() => handleRemove(product.items.id)}
                >
                  ×
                </button>
              </li>
            );
          })}
        </ul>
      )}

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
