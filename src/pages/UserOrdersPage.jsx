import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useOrders } from '../context/OrderContext';
import { OrderCard } from '../components/orders/OrderCard';
import { Button } from '../components/ui/Button';
import { OrderStatus } from '../types';

export const UserOrdersPage = () => {
  const { userOrders } = useOrders();
  const [activeTab, setActiveTab] = useState<'active' | 'past'>('active');
  
  const activeOrders = userOrders.filter(
    order => ['pending', 'preparing', 'ready'].includes(order.status)
  );
  
  const pastOrders = userOrders.filter(
    order => ['collected', 'cancelled'].includes(order.status)
  );
  
  const ordersToDisplay = activeTab === 'active' ? activeOrders : pastOrders;
  
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">My Orders</h1>
        <p className="text-gray-600 mt-2">View and track your current and past orders</p>
      </div>
      
      <div className="flex border-b border-gray-200 mb-6">
        <button
          className={`py-2 px-4 font-medium text-sm focus:outline-none ${
            activeTab === 'active'
              ? 'text-primary-600 border-b-2 border-primary-500'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('active')}
        >
          Active Orders ({activeOrders.length})
        </button>
        <button
          className={`py-2 px-4 font-medium text-sm focus:outline-none ${
            activeTab === 'past'
              ? 'text-primary-600 border-b-2 border-primary-500'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('past')}
        >
          Past Orders ({pastOrders.length})
        </button>
      </div>
      
      {ordersToDisplay.length === 0 ? (
        <div className="text-center py-8 bg-white rounded-lg shadow-sm">
          <p className="text-gray-600 mb-4">
            {activeTab === 'active'
              ? "You don't have any active orders."
              : "You don't have any past orders."}
          </p>
          <Link to="/menu">
            <Button>Order Now</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {ordersToDisplay.map(order => (
            <Link 
              key={order.id} 
              to={`/order-confirmation/${order.id}`}
              className="block transition-transform hover:-translate-y-1"
            >
              <OrderCard order={order} />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};