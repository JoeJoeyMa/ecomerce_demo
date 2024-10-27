"use client";

import { createContext, useState } from "react";

export const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  return (
    <StoreContext.Provider value={{ open, setOpen }}>
      {children}
    </StoreContext.Provider>
  );
};
