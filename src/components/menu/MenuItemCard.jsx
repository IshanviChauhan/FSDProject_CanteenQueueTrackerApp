import React from 'react';
import { PlusCircle, MinusCircle, Info } from 'lucide-react';
import { MenuItem } from '../../types';
import { useCart } from '../../context/CartContext';
import { Card, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';

export const MenuItemCard = ({ 
  item, 
  showActions = true
}) => {
  const { addToCart, items, updateQuantity, removeFromCart } = useCart();
  
  const cartItem = items.find(i => i.menuItemId === item.id);
  const itemQuantity = cartItem?.quantity || 0;
  
  const handleAddToCart = () => {
    addToCart(item.id, 1);
  };
  
  const handleIncreaseQuantity = () => {
    updateQuantity(item.id, itemQuantity + 1);
  };
  
  const handleDecreaseQuantity = () => {
    if (itemQuantity === 1) {
      removeFromCart(item.id);
    } else {
      updateQuantity(item.id, itemQuantity - 1);
    }
  };
  
  return (
    <Card hoverable className="h-full flex flex-col">
      <div className="relative h-48 overflow-hidden rounded-t-lg">
        <img 
          src={item.image} 
          alt={item.name}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
        <div className="absolute top-2 right-2">
          <Badge variant={item.available ? 'success' : 'error'}>
            {item.available ? 'Available' : 'Sold Out'}
          </Badge>
        </div>
      </div>
      
      <CardContent className="flex-grow flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-semibold text-gray-800">{item.name}</h3>
            <span className="font-semibold text-primary-600">Rs.{item.price.toFixed(2)}</span>
          </div>
          
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">{item.description}</p>
          
          <div className="flex items-center text-xs text-gray-500 mb-4">
            <Info size={14} className="mr-1" />
            <span>Prep time: {item.preparationTime} mins</span>
          </div>
        </div>
        
        {showActions && item.available && (
          <div className="mt-auto">
            {itemQuantity === 0 ? (
              <Button 
                onClick={handleAddToCart} 
                fullWidth
                variant="primary"
                leftIcon={<PlusCircle size={16} />}
              >
                Add to Cart
              </Button>
            ) : (
              <div className="flex items-center justify-between">
                <Button 
                  onClick={handleDecreaseQuantity}
                  variant="outline"
                  size="sm"
                >
                  <MinusCircle size={16} />
                </Button>
                
                <span className="font-medium px-4">{itemQuantity}</span>
                
                <Button 
                  onClick={handleIncreaseQuantity}
                  variant="outline"
                  size="sm"
                >
                  <PlusCircle size={16} />
                </Button>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};