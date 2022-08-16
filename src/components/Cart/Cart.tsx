import React, { useState } from "react";
import { useContext } from "react";
import CartContext from "../../store/cart-context";
import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";
import Checkout from "./Checkout";
import { CartProps, OrdersProps, User, OrderedItems } from "../../types";
import Success from "../../assets/green_checkmark.png";

const Cart = (props: CartProps) => {
  const [isCheckout, setIsCheckout] = useState<boolean>(false);
  const [didSubmit, setDidSubmit] = useState<boolean>(false);
  const [orders, setOrders] = useState<OrdersProps>();

  // taking context store from the context
  const cartCtx = useContext(CartContext);

  // format total amount price
  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;

  // return whether the cart it empty or not
  const hasItems = cartCtx.items.length > 0;

  // add item to cart
  const cartItemAddHandler = (item: OrderedItems) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  // remove item from cart
  const cartItemRemoveHandler = (id: string) => {
    cartCtx.removeItem(id);
  };

  // display checkout
  const orderHandler = () => {
    setIsCheckout(true);
  };

  // process order by storing data, display final message, clear cart
  const submitOrderHandler = (userData: User) => {
    const orderData = { user: userData, orderedItems: cartCtx.items };
    setOrders(orderData);
    setDidSubmit(true);
    cartCtx.clearCart();
  };

  // fragment showing buttons in cart before placing order
  const modalActions = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={props.onClose}>
        Close
      </button>
      {hasItems && (
        <button className={classes.button} onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );

  // display items in cart, grouped by type
  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          id={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  // part of cart modal below items list, includes total price, buttons and shipping details (conditionally)
  const cartModalContent = (
    <>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckout && (
        <Checkout onCancel={props.onClose} onConfirm={submitOrderHandler} />
      )}
      {!isCheckout && modalActions}
    </>
  );

  // final message confirming order placement, displays shipping details
  const didSubmitModalContent = (
    <div className={classes["order-submitted"]}>
      <>
        <p>Successfully placed the order!</p>
        <img src={Success} alt="success" />
        <p className={classes["ship-headline"]}>
          Your order will be shipped to:
        </p>
        {orders && <p>{orders.user.name}</p>}
        {orders && <p>{orders.user.street}</p>}
        {orders && <p>{orders.user.city}</p>}
        {orders && <p>{orders.user.postalCode}</p>}
        <button
          className={classes.button}
          style={{ marginTop: "15px" }}
          onClick={props.onClose}
        >
          Close
        </button>
      </>
    </div>
  );

  return (
    <Modal onClose={props.onClose}>
      {!didSubmit && cartModalContent}
      {didSubmit && didSubmitModalContent}
    </Modal>
  );
};

export default Cart;
