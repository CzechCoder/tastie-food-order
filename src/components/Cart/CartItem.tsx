import classes from "./CartItem.module.css";
import { CartItemProps } from "../../types";

const CartItem = (props: CartItemProps) => {
  // format price
  const price = `$${props.price.toFixed(2)}`;

  return (
    <li className={classes["cart-item"]} key={props.id}>
      <div>
        <h2>{props.name}</h2>
        <div className={classes.summary}>
          <span className={classes.price}>{price}</span>
          <span className={classes.amount}>x {props.amount}</span>
        </div>
      </div>
      <div className={classes.actions}>
        <button onClick={props.onRemove}>-</button>
        <button onClick={props.onAdd}>+</button>
      </div>
    </li>
  );
};

export default CartItem;
