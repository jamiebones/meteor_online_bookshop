import * as React from "react";

const StripeContext = React.createContext();

function StripeProvider({ children }) {
  const [clientSecret, setClientSecret] = React.useState("");
  const value = { clientSecret, setClientSecret };
  return (
    <StripeContext.Provider value={value}>
      {children}
    </StripeContext.Provider>
  );
}

function useStripeContext() {
  const context = React.useContext(StripeContext);
  if (!context) {
    throw new Error("useStripeContext must be used within a Stripe Provider");
  }
  return context;
}

export { StripeProvider, useStripeContext };