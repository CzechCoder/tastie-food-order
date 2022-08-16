import React, { useContext, useEffect, useState } from "react";
import classes from "./HeaderCartBtn.module.css";
import CartIcon from "../Cart/CartIcon";
import CartContext from "../../store/cart-context";
import { ShowCart } from "../../types";

const HeaderCartBtn = (props: ShowCart) => {
  const [badgeIsHighlighted, setBadgeIsHighlighted] = useState(false);

  // taking context store from the context
  const cartCtx = useContext(CartContext);

  // extracting items from the context store
  const { items } = cartCtx;

  // display number of items in cart
  const numberOfCartItems = cartCtx.items.reduce((curNumber, item) => {
    return curNumber + item.amount;
  }, 0);

  // animating badge showing number of items in the cart
  const badgeClasses = `${classes.badge} ${
    badgeIsHighlighted ? classes.bump : ""
  }`;

  // watch for a change in number of items in cart, validate that it's higher than 0, then run the animation
  useEffect(() => {
    if (cartCtx.items.length === 0) {
      return;
    }
    setBadgeIsHighlighted(true);
    const timer = setTimeout(() => {
      setBadgeIsHighlighted(false);
    }, 300);

    // cleanup
    return () => {
      clearTimeout(timer);
    };
  }, [items]);

  return (
    <button className={classes.button} onClick={props.showCart}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span className={classes["cart-text"]}>Your Cart</span>
      <span className={badgeClasses}>{numberOfCartItems}</span>
    </button>
  );
};

export default HeaderCartBtn;
