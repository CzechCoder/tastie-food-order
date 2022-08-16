import { createContext } from "react";
import { ItemProps } from "../types";

interface CartContextInterface {
  items: ItemProps[];
  totalAmount: number;
  addItem: (item: ItemProps) => void;
  removeItem: (item: string) => void;
  clearCart: () => void;
}

// default cart context
const DeafultCartContext: CartContextInterface = {
  items: [],
  totalAmount: 0,
  addItem: (item) => {},
  removeItem: (item) => {},
  clearCart: () => {},
};

const CartContext = createContext(DeafultCartContext);

export default CartContext;
