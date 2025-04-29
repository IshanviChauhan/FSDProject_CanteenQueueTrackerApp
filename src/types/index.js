// User object structure
export const User = {
  id: '',
  name: '',
  email: '',
  role: 'student', // or 'staff'
  orderHistory: [], // Array of Order IDs
};

// MenuItem object structure
export const MenuItem = {
  id: '',
  name: '',
  description: '',
  price: 0,
  image: '',
  category: 'main', // or 'side', 'drink', 'dessert'
  available: true,
  preparationTime: 0, // in minutes
};

// CartItem object structure
export const CartItem = {
  menuItemId: '',
  quantity: 0,
  notes: '', // Optional
};

// OrderStatus values
export const OrderStatus = ['pending', 'preparing', 'ready', 'collected', 'cancelled'];

// Order object structure
export const Order = {
  id: '',
  userId: '',
  items: [
    {
      menuItemId: '',
      name: '',
      price: 0,
      quantity: 0,
      notes: '', // Optional
    },
  ],
  totalAmount: 0,
  status: 'pending', // Default status
  queueNumber: 0,
  createdAt: '',
  updatedAt: '',
  estimatedReadyTime: '', // Optional
};

// Notification object structure
export const Notification = {
  id: '',
  userId: '',
  title: '',
  message: '',
  read: false,
  createdAt: '',
};