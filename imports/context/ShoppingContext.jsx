import * as React from "react";

const ShoppingContext = React.createContext();

function ShoppingProvider({ children }) {
  const [cart, setCart] = React.useState([]);
  const value = { cart, setCart };
  return (
    <ShoppingContext.Provider value={value}>
      {children}
    </ShoppingContext.Provider>
  );
}

function useCart() {
  const context = React.useContext(ShoppingContext);
  if (!context) {
    throw new Error("useCart must be used within a WalletProvider");
  }
  return context;
}

export { ShoppingProvider, useCart };
