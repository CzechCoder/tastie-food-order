import React, { useState } from "react";
import Cart from "./components/Cart/Cart";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import CartProvider from "./store/CartProvider";

function App() {
  const [cartIsShown, setCartIsShown] = useState<boolean>(false);

  // cart is shown in modal
  const showCart = () => {
    setCartIsShown(true);
  };

  const hideCart = () => {
    setCartIsShown(false);
  };

  return (
    <CartProvider>
      <>
        {cartIsShown && <Cart onClose={hideCart} />}
        <Header showCart={showCart} />
        <main>
          <Meals />
        </main>
      </>
    </CartProvider>
  );
}

export default App;
