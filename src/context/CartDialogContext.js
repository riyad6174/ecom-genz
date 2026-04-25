import { createContext, useContext, useState } from 'react';

const CartDialogContext = createContext({ isOpen: false, openDialog: () => {}, closeDialog: () => {} });

export function CartDialogProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <CartDialogContext.Provider value={{ isOpen, openDialog: () => setIsOpen(true), closeDialog: () => setIsOpen(false) }}>
      {children}
    </CartDialogContext.Provider>
  );
}

export const useCartDialog = () => useContext(CartDialogContext);
