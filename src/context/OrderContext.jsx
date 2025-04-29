import React, { createContext, useContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useAuth } from './AuthContext';
import { useCart } from './CartContext';
import { useMenuItems } from '../hooks/useMenuItems';
import { useNotifications } from './NotificationContext';

const OrderContext = createContext(undefined);

export const useOrders = () => {
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error('useOrders must be used within an OrderProvider');
  }
  return context;
};

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  const [currentOrder, setCurrentOrder] = useState(null);
  const [lastQueueNumber, setLastQueueNumber] = useState(0);
  const { user } = useAuth();
  const { items, getTotalPrice, clearCart } = useCart();
  const { menuItems } = useMenuItems();
  const { createNotification } = useNotifications();
  
  // Load orders and last queue number from localStorage on mount
  useEffect(() => {
    const storedOrders = localStorage.getItem('orders');
    const storedQueueNumber = localStorage.getItem('lastQueueNumber');
    
    if (storedOrders) {
      setOrders(JSON.parse(storedOrders));
    }
    
    if (storedQueueNumber) {
      setLastQueueNumber(parseInt(storedQueueNumber, 10));
    }
  }, []);
  
  // Save orders and last queue number to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('orders', JSON.stringify(orders));
  }, [orders]);
  
  useEffect(() => {
    localStorage.setItem('lastQueueNumber', lastQueueNumber.toString());
  }, [lastQueueNumber]);
  
  // Filter orders for the current user
  const userOrders = user 
    ? orders.filter(order => order.userId === user.id)
    : [];
  
  const getNextQueueNumber = () => {
    const nextNumber = lastQueueNumber + 1;
    setLastQueueNumber(nextNumber);
    return nextNumber;
  };
  
  const placeOrder = async () => {
    if (!user) throw new Error('User must be logged in to place an order');
    if (items.length === 0) throw new Error('Cart is empty');
    
    // Process cart items to order items
    const orderItems = items.map(item => {
      const menuItem = menuItems.find(mi => mi.id === item.menuItemId);
      if (!menuItem) throw new Error(`Menu item not found: ${item.menuItemId}`);
      
      return {
        menuItemId: item.menuItemId,
        name: menuItem.name,
        price: menuItem.price,
        quantity: item.quantity,
        notes: item.notes,
      };
    });
    
    // Get next queue number
    const queueNumber = getNextQueueNumber();
    
    // Create new order
    const newOrder = {
      id: uuidv4(),
      userId: user.id,
      items: orderItems,
      totalAmount: getTotalPrice(),
      status: 'pending',
      queueNumber,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Add order to state
    setOrders(prevOrders => [...prevOrders, newOrder]);
    setCurrentOrder(newOrder);
    
    // Clear the cart
    clearCart();
    
    // Create notification for the user
    createNotification(
      user.id,
      'Order Confirmed',
      `Your order #${queueNumber} has been confirmed and is being prepared.`
    );
    
    return newOrder;
  };
  
  const updateOrderStatus = (orderId, status) => {
    setOrders(prevOrders => 
      prevOrders.map(order => {
        if (order.id === orderId) {
          const updatedOrder = {
            ...order,
            status,
            updatedAt: new Date().toISOString(),
          };
          
          // If order is marked as ready, notify the user
          if (status === 'ready' && order.status !== 'ready') {
            createNotification(
              order.userId,
              'Order Ready for Collection',
              `Your order #${order.queueNumber} is now ready for collection!`
            );
          }
          
          return updatedOrder;
        }
        return order;
      })
    );
  };
  
  const getOrderById = (orderId) => {
    return orders.find(order => order.id === orderId);
  };
  
  return (
    <OrderContext.Provider
      value={{
        orders,
        userOrders,
        currentOrder,
        placeOrder,
        updateOrderStatus,
        getOrderById,
        getNextQueueNumber,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};