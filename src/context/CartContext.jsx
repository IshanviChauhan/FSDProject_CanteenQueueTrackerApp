import React, { createContext, useContext, useState, useEffect } from 'react';
import { useMenuItems } from '../hooks/useMenuItems';

const CartContext = createContext(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const { menuItems } = useMenuItems();
  
  // Load cart from localStorage on mount
  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setItems(JSON.parse(storedCart));
    }
  }, []);
  
  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);
  
  const addToCart = (menuItemId, quantity = 1, notes) => {
    setItems(prevItems => {
      const existingItemIndex = prevItems.findIndex(item => item.menuItemId === menuItemId);
      
      if (existingItemIndex >= 0) {
        // Item already exists in cart, update quantity
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + quantity,
          notes: notes || updatedItems[existingItemIndex].notes,
        };
        return updatedItems;
      } else {
        // Add new item to cart
        return [...prevItems, { menuItemId, quantity, notes }];
      }
    });
  };
  
  const removeFromCart = (menuItemId) => {
    setItems(prevItems => prevItems.filter(item => item.menuItemId !== menuItemId));
  };
  
  const updateQuantity = (menuItemId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(menuItemId);
      return;
    }
    
    setItems(prevItems => 
      prevItems.map(item => 
        item.menuItemId === menuItemId ? { ...item, quantity } : item
      )
    );
  };
  
  const updateNotes = (menuItemId, notes) => {
    setItems(prevItems => 
      prevItems.map(item => 
        item.menuItemId === menuItemId ? { ...item, notes } : item
      )
    );
  };
  
  const clearCart = () => {
    setItems([]);
  };
  
  const getTotalPrice = () => {
    return items.reduce((total, item) => {
      const menuItem = menuItems.find(mi => mi.id === item.menuItemId);
      return total + (menuItem ? menuItem.price * item.quantity : 0);
    }, 0);
  };
  
  const getTotalItems = () => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };
  
  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        updateNotes,
        clearCart,
        getTotalPrice,
        getTotalItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};