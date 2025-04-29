import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, ArrowRight, CreditCard } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useMenuItems } from '../hooks/useMenuItems';
import { useAuth } from '../context/AuthContext';
import { useOrders } from '../context/OrderContext';
import { CartItemComponent } from '../components/cart/CartItem';
import { Button } from '../components/ui/Button';

export const CartPage = () => {
  const { items, getTotalPrice, clearCart } = useCart();
  const { menuItems } = useMenuItems();
  const { user } = useAuth();
  const { placeOrder } = useOrders();
  const navigate = useNavigate();
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');
  
  const cartItemsWithDetails = items.map(item => {
    const menuItem = menuItems.find(mi => mi.id === item.menuItemId);
    if (!menuItem) return null;
    
    return { menuItem, quantity: item.quantity, notes: item.notes };
  }).filter(Boolean);
  
  const handleCheckout = async () => {
    if (!user) {
      navigate('/login', { state: { redirectTo: '/cart' } });
      return;
    }
    
    if (items.length === 0) {
      setError('Your cart is empty');
      return;
    }
    
    setIsProcessing(true);
    setError('');
    
    try {
      const order = await placeOrder();
      navigate(`/order-confirmation/${order.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to place order');
      setIsProcessing(false);
    }
  };
  
  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Your Cart</h1>
        <p className="text-gray-600 mt-2">Review your order before checkout</p>
      </div>
      
      {items.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
          <div className="flex justify-center mb-4">
            <ShoppingCart size={64} className="text-gray-300" />
          </div>
          <h2 className="text-xl font-semibold mb-2">Your cart is empty</h2>
          <p className="text-gray-600 mb-6">Looks like you haven't added anything to your cart yet.</p>
          <Button onClick={() => navigate('/menu')}>
            Browse Menu
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="p-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold">Cart Items ({items.length})</h2>
              </div>
              
              <div className="divide-y divide-gray-200">
                {cartItemsWithDetails.map((item, index) => (
                  item && (
                    <div key={`${item.menuItem.id}-${index}`} className="p-4">
                      <CartItemComponent
                        menuItem={item.menuItem}
                        quantity={item.quantity}
                        notes={item.notes}
                      />
                    </div>
                  )
                ))}
              </div>
              
              <div className="p-4 border-t border-gray-200 bg-gray-50">
                <Button
                  variant="outline"
                  onClick={() => clearCart()}
                  size="sm"
                >
                  Clear Cart
                </Button>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-4 sticky top-20">
              <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
              
              <div className="space-y-3">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>${getTotalPrice().toFixed(2)}</span>
                </div>
                
                <div className="border-t border-gray-200 pt-3 mt-3">
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span>${getTotalPrice().toFixed(2)}</span>
                  </div>
                </div>
              </div>
              
              {error && (
                <div className="mt-4 p-3 bg-error-50 text-error-700 rounded-md text-sm">
                  {error}
                </div>
              )}
              
              <div className="mt-6">
                <Button
                  onClick={handleCheckout}
                  fullWidth
                  isLoading={isProcessing}
                  leftIcon={<CreditCard size={18} />}
                  rightIcon={<ArrowRight size={18} />}
                >
                  {isProcessing ? 'Processing...' : 'Proceed to Checkout'}
                </Button>
              </div>
              
              <p className="text-xs text-gray-500 mt-4 text-center">
                By clicking the button above, you agree to our terms of service and privacy policy.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};