"use client";
import React from "react";
import { store, persist } from "./store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

const Providers = ({ children }: { children: React.ReactNode }) => (
  <Provider store={store}>
    <PersistGate persistor={persist}>{children}</PersistGate>
  </Provider>
);

export default Providers;
