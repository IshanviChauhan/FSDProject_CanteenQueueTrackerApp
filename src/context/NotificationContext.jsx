import React, { createContext, useContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

const NotificationContext = createContext(undefined);

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};

export const NotificationProvider = ({ children, userId }) => {
  const [notifications, setNotifications] = useState([]);
  
  // Load notifications from localStorage on mount
  useEffect(() => {
    const storedNotifications = localStorage.getItem('notifications');
    if (storedNotifications) {
      setNotifications(JSON.parse(storedNotifications));
    }
  }, []);
  
  // Save notifications to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('notifications', JSON.stringify(notifications));
  }, [notifications]);
  
  // Filter notifications for the current user
  const userNotifications = userId 
    ? notifications.filter(notification => notification.userId === userId)
    : [];
  
  // Count unread notifications
  const unreadCount = userNotifications.filter(notification => !notification.read).length;
  
  const createNotification = (userId, title, message) => {
    const newNotification = {
      id: uuidv4(),
      userId,
      title,
      message,
      read: false,
      createdAt: new Date().toISOString(),
    };
    
    setNotifications(prevNotifications => [
      newNotification,
      ...prevNotifications,
    ]);
  };
  
  const markAsRead = (notificationId) => {
    setNotifications(prevNotifications =>
      prevNotifications.map(notification =>
        notification.id === notificationId
          ? { ...notification, read: true }
          : notification
      )
    );
  };
  
  const markAllAsRead = () => {
    if (!userId) return;
    
    setNotifications(prevNotifications =>
      prevNotifications.map(notification =>
        notification.userId === userId
          ? { ...notification, read: true }
          : notification
      )
    );
  };
  
  const clearNotifications = () => {
    if (!userId) return;
    
    setNotifications(prevNotifications =>
      prevNotifications.filter(notification => notification.userId !== userId)
    );
  };
  
  return (
    <NotificationContext.Provider
      value={{
        notifications,
        userNotifications,
        unreadCount,
        createNotification,
        markAsRead,
        markAllAsRead,
        clearNotifications,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};