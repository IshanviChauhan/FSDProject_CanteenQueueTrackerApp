import { useState, useEffect } from 'react';

const mockMenuItems = [
  {
    id: '1',
    name: 'Veg Burger',
    description: 'Juicy potato patty with lettuce, tomato, and our special sauce',
    price: 70,
    image: '',
    category: 'main',
    available: true,
    preparationTime: 12,
  },
  {
    id: '2',
    name: 'Veggie Wrap',
    description: 'Fresh vegetables with hummus in a whole wheat wrap',
    price: 60,
    image: '',
    category: 'main',
    available: true,
    preparationTime: 8,
  },
  {
    id: '3',
    name: 'Pasta',
    description: 'Crisp romaine lettuce with grilled chicken, parmesan, and Caesar dressing',
    price: 60,
    image: '',
    category: 'main',
    available: true,
    preparationTime: 10,
  },
  {
    id: '4',
    name: 'French Fries',
    description: 'Crispy golden fries with a choice of dipping sauce',
    price: 60,
    image: '',
    category: 'side',
    available: true,
    preparationTime: 5,
  },
  {
    id: '5',
    name: 'Chocolate Brownie',
    description: 'Rich chocolate brownie with a scoop of vanilla ice cream',
    price: 70,
    image: '',
    category: 'dessert',
    available: true,
    preparationTime: 3,
  },
  {
    id: '6',
    name: 'Cold Coffee',
    description: 'Cold brewed coffee served over ice',
    price: 60,
    image: '',
    category: 'drink',
    available: true,
    preparationTime: 2,
  },
  {
    id: '7',
    name: 'Pizza Slice',
    description: 'Cheese pizza slice with your choice of toppings',
    price: 50,
    image: '',
    category: 'main',
    available: true,
    preparationTime: 15,
  },
  {
    id: '8',
    name: 'Mango Shake',
    description: 'Blend of seasonal fruits with yogurt and honey',
    price: 30,
    image: '',
    category: 'drink',
    available: true,
    preparationTime: 4,
  },
];

export const useMenuItems = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        setMenuItems(mockMenuItems);
        
        // Extract unique categories
        const uniqueCategories = Array.from(
          new Set(mockMenuItems.map(item => item.category))
        );
        setCategories(uniqueCategories);
        
        setIsLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch menu items'));
        setIsLoading(false);
      }
    };
    
    fetchMenuItems();
  }, []);
  
  return {
    menuItems,
    categories,
    isLoading,
    error,
  };
};