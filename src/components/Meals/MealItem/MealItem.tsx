import React, { useContext } from "react";
import CartContext from "../../../store/cart-context";
import { MealItemProps } from "../../../types";
import classes from "./MealItem.module.css";
import MealItemForm from "./MealItemForm";

const MealItem = (props: MealItemProps) => {
  // taking context store from the context
  const cartCtx = useContext(CartContext);

  // price format
  const price = `$${props.price.toFixed(2)}`;

  // adding item to context store
  const addToCartHandler = (amount: number) => {
    cartCtx.addItem({
      id: props.id,
      name: props.name,
      amount: amount,
      price: props.price,
    });
  };

  return (
    <li className={classes.meal}>
      <div>
        <h3>{props.name}</h3>
        <div className={classes.description}>{props.description}</div>
        <div className={classes.price}>{price}</div>
      </div>
      <div>
        <MealItemForm onAddToCart={addToCartHandler} id={props.id} />
      </div>
    </li>
  );
};

export default MealItem;
