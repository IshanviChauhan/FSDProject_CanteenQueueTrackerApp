import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { CheckCircle, Clock, Loader, ArrowLeft } from 'lucide-react';
import { useOrders } from '../context/OrderContext';
import { OrderDetails } from '../components/orders/OrderDetails';
import { Button } from '../components/ui/Button';

export const OrderConfirmationPage = () => {
  const { orderId } = useParams();
  const { getOrderById } = useOrders();
  const navigate = useNavigate();
  
  const order = orderId ? getOrderById(orderId) : null;
  
  // Redirect if order not found
  useEffect(() => {
    if (!order && orderId) {
      // Short delay before redirect
      const timeout = setTimeout(() => {
        navigate('/orders');
      }, 2000);
      
      return () => clearTimeout(timeout);
    }
  }, [order, orderId, navigate]);
  
  if (!order) {
    return (
      <div className="text-center py-12">
        <Loader className="h-12 w-12 mx-auto animate-spin text-primary-500" />
        <p className="mt-4 text-gray-600">Loading order details...</p>
      </div>
    );
  }
  
  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center p-3 bg-success-100 rounded-full text-success-600 mb-4">
          <CheckCircle size={32} />
        </div>
        <h1 className="text-3xl font-bold text-gray-900">Order Confirmed!</h1>
        <p className="text-gray-600 mt-2">
          Your order #{order.queueNumber} has been placed successfully
        </p>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <div className="mb-6 p-4 bg-primary-50 rounded-lg border border-primary-100">
          <div className="flex items-start">
            <div className="mr-4 mt-1">
              <Clock className="h-6 w-6 text-primary-500" />
            </div>
            <div>
              <h3 className="font-medium text-primary-900">Order Status</h3>
              <p className="text-primary-700">
                Your order is now being prepared. You'll receive a notification when it's ready for collection.
              </p>
              <div className="mt-3 relative pt-1">
                <div className="flex mb-2 items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold inline-block text-primary-600">
                      Order Progress
                    </span>
                  </div>
                </div>
                <div className="flex h-2 mb-4 overflow-hidden text-xs bg-primary-200 rounded">
                  <div 
                    className="flex flex-col justify-center text-center text-white bg-primary-500 shadow-none whitespace-nowrap" 
                    style={{ width: order.status === 'pending' ? '25%' : '50%' }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs text-gray-600">
                  <span className={order.status === 'pending' ? 'font-semibold text-primary-600' : ''}>Order Placed</span>
                  <span className={order.status === 'preparing' ? 'font-semibold text-primary-600' : ''}>Preparing</span>
                  <span className={order.status === 'ready' ? 'font-semibold text-primary-600' : ''}>Ready</span>
                  <span className={order.status === 'collected' ? 'font-semibold text-primary-600' : ''}>Collected</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <OrderDetails order={order} />
      </div>
      
      <div className="flex justify-between">
        <Link to="/menu">
          <Button variant="outline" leftIcon={<ArrowLeft size={18} />}>
            Back to Menu
          </Button>
        </Link>
        
        <Link to="/orders">
          <Button>
            View My Orders
          </Button>
        </Link>
      </div>
    </div>
  );
};