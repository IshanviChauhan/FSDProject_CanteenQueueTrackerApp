import React from 'react';
import { MinusCircle, PlusCircle, Trash2 } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { Button } from '../ui/Button';

export const CartItemComponent = ({ menuItem, quantity, notes }) => {
  const { updateQuantity, updateNotes, removeFromCart } = useCart();
  
  const handleIncreaseQuantity = () => {
    updateQuantity(menuItem.id, quantity + 1);
  };
  
  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      updateQuantity(menuItem.id, quantity - 1);
    } else {
      removeFromCart(menuItem.id);
    }
  };
  
  const handleRemove = () => {
    removeFromCart(menuItem.id);
  };
  
  const handleNotesChange = (e) => {
    updateNotes(menuItem.id, e.target.value);
  };
  
  return (
    <div className="flex py-4 border-b border-gray-200 animate-fade-in">
      <div className="w-20 h-20 flex-shrink-0 overflow-hidden rounded-md">
        <img 
          src={menuItem.image} 
          alt={menuItem.name}
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="ml-4 flex-1 flex flex-col">
        <div className="flex justify-between">
          <div>
            <h3 className="text-base font-medium text-gray-900">{menuItem.name}</h3>
            <p className="mt-1 text-sm text-gray-500">${menuItem.price.toFixed(2)}</p>
          </div>
          <div className="flex items-center">
            <p className="text-base font-medium text-gray-900">
              ${(menuItem.price * quantity).toFixed(2)}
            </p>
          </div>
        </div>
        
        <div className="flex-1 flex items-end justify-between text-sm">
          <div className="flex items-center space-x-2">
            <Button
              onClick={handleDecreaseQuantity}
              variant="ghost"
              size="sm"
              aria-label="Decrease quantity"
            >
              <MinusCircle size={18} />
            </Button>
            
            <span className="font-medium">{quantity}</span>
            
            <Button
              onClick={handleIncreaseQuantity}
              variant="ghost"
              size="sm"
              aria-label="Increase quantity"
            >
              <PlusCircle size={18} />
            </Button>
          </div>
          
          <Button
            onClick={handleRemove}
            variant="ghost"
            size="sm"
            aria-label="Remove"
            className="text-error-600 hover:text-error-900"
          >
            <Trash2 size={18} />
            <span className="ml-1">Remove</span>
          </Button>
        </div>
        
        <textarea
          placeholder="Special instructions..."
          value={notes || ''}
          onChange={handleNotesChange}
          className="mt-2 text-sm p-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
          rows={2}
        />
      </div>
    </div>
  );
};