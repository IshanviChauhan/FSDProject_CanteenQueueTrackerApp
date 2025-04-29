import React, { useState, useMemo } from 'react';
import { useOrders } from '../context/OrderContext';
import { OrderCard } from '../components/orders/OrderCard';
import { ChevronDown, ChevronUp, DollarSign, History } from 'lucide-react';
import { Button } from '../components/ui/Button';

export const StaffDashboardPage = () => {
  const { orders, updateOrderStatus } = useOrders();
  const [activeStatus, setActiveStatus] = useState('all');
  const [showHistory, setShowHistory] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(() => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
  });

  // Filter active orders (not collected/cancelled)
  const activeOrders = orders.filter(
    (order) => order.status !== 'collected' && order.status !== 'cancelled'
  );

  // Filter orders based on the active status tab
  const filteredOrders =
    activeStatus === 'all'
      ? activeOrders
      : orders.filter((order) => order.status === activeStatus);

  // Get completed orders for history
  const completedOrders = orders
    .filter((order) => order.status === 'collected')
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  // Calculate monthly revenue
  const monthlyRevenue = useMemo(() => {
    const [year, month] = selectedMonth.split('-').map(Number);
    return orders
      .filter((order) => {
        const orderDate = new Date(order.createdAt);
        return (
          orderDate.getFullYear() === year &&
          orderDate.getMonth() === month - 1 &&
          order.status === 'collected'
        );
      })
      .reduce((total, order) => total + order.totalAmount, 0);
  }, [orders, selectedMonth]);

  // Count orders by status
  const orderCounts = {
    all: activeOrders.length,
    pending: orders.filter((order) => order.status === 'pending').length,
    preparing: orders.filter((order) => order.status === 'preparing').length,
    ready: orders.filter((order) => order.status === 'ready').length,
  };

  // Handle status update
  const handleStatusUpdate = (orderId, newStatus) => {
    updateOrderStatus(orderId, newStatus);
  };

  // Generate month options for the last 12 months
  const monthOptions = useMemo(() => {
    const options = [];
    const today = new Date();
    for (let i = 0; i < 12; i++) {
      const date = new Date(today.getFullYear(), today.getMonth() - i, 1);
      const value = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      const label = date.toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
      options.push({ value, label });
    }
    return options;
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Staff Dashboard</h1>
        <p className="text-gray-600 mt-2">Manage orders and view analytics</p>
      </div>

      {/* Revenue Section */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <DollarSign className="h-6 w-6 text-primary-500 mr-2" />
            <h2 className="text-xl font-semibold">Monthly Revenue</h2>
          </div>
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          >
            {monthOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <div className="text-3xl font-bold text-primary-600">${monthlyRevenue.toFixed(2)}</div>
      </div>

      {/* Active Orders Section */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Active Orders</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          {Object.entries(orderCounts).map(([status, count]) => (
            <div
              key={status}
              className={`bg-white p-4 rounded-lg shadow-sm cursor-pointer transition-colors border-l-4 ${
                activeStatus === status ? 'border-primary-500 bg-primary-50' : 'border-gray-200'
              }`}
              onClick={() => setActiveStatus(status)}
            >
              <div className="font-medium">{status.charAt(0).toUpperCase() + status.slice(1)}</div>
              <div className="text-2xl font-bold">{count}</div>
            </div>
          ))}
        </div>

        {filteredOrders.length === 0 ? (
          <div className="bg-white p-8 rounded-lg shadow-sm text-center">
            <p className="text-gray-600">
              {activeStatus === 'all'
                ? 'There are no active orders at the moment.'
                : `There are no orders with status "${activeStatus}" at the moment.`}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredOrders.map((order) => (
              <OrderCard
                key={order.id}
                order={order}
                isStaff={true}
                onStatusUpdate={handleStatusUpdate}
              />
            ))}
          </div>
        )}
      </div>

      {/* Order History Section */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div
          className="p-4 border-b border-gray-200 flex items-center justify-between cursor-pointer"
          onClick={() => setShowHistory(!showHistory)}
        >
          <div className="flex items-center">
            <History className="h-5 w-5 text-gray-500 mr-2" />
            <h2 className="text-xl font-semibold">Order History</h2>
          </div>
          {showHistory ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
        </div>

        {showHistory && (
          <div className="p-4">
            {completedOrders.length === 0 ? (
              <p className="text-center text-gray-600 py-4">No completed orders yet.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {completedOrders.map((order) => (
                  <OrderCard key={order.id} order={order} isStaff={true} />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};