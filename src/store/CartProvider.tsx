import React from "react";
import { useReducer } from "react";
import {
  ChildrenProps,
  ItemProps,
  ReducerActionsProps,
  StateProps,
} from "../types";
import CartContext from "./cart-context";

// default state of cart (empty)
const defaultCartState = {
  items: [],
  totalAmount: 0,
};

// reducers
const cartReducer = (state: StateProps, action: ReducerActionsProps) => {
  // item added to cart, checks if it already exists in cart and if yes, only increases its amount, otherwise item is added as new
  if (action.type === "ADD_ITEM") {
    const updatedTotalAmount =
      state.totalAmount + action.item!.price * action.item!.amount;
    const existingCartItemIndex = state.items.findIndex(
      (item: ItemProps) => item.id === action.item!.id
    );
    const existingCartItem = state.items[existingCartItemIndex];
    let updatedItems;

    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item!.amount,
      };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      updatedItems = state.items.concat(action.item);
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }

  // item removed from cart, checks if the item exists only once in cart and removes it altogether, otherwise just lowers amount
  if (action.type === "REMOVE_ITEM") {
    const existingCartItemIndex = state.items.findIndex(
      (item: ItemProps) => item.id === action.id
    );
    const existingItem = state.items[existingCartItemIndex];
    const updatedTotalAmount = state.totalAmount - existingItem.price;
    let updatedItems;
    if (existingItem.amount === 1) {
      updatedItems = state.items.filter(
        (item: ItemProps) => item.id !== action.id
      );
    } else {
      const updatedItem = { ...existingItem, amount: existingItem.amount - 1 };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    }
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }

  // clear cart after placing order
  if (action.type === "CLEAR") {
    return defaultCartState;
  }

  return defaultCartState;
};

// provider for cart
const CartProvider = (props: ChildrenProps) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addItemToCartHandler = (item: ItemProps) => {
    dispatchCartAction({ type: "ADD_ITEM", item: item });
  };

  const removeItemToCartHandler = (id: string) => {
    dispatchCartAction({ type: "REMOVE_ITEM", id: id });
  };

  const clearCartHandler = () => {
    dispatchCartAction({ type: "CLEAR" });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemToCartHandler,
    clearCart: clearCartHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
