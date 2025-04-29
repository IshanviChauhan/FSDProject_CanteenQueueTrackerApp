import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { OrderStatusBadge } from './OrderStatusBadge';
import { formatDate } from '../../utils/dateUtils';

export const OrderDetails = ({ order }) => {
  return (
    <Card>
      <CardHeader className="flex flex-row justify-between items-center">
        <div>
          <CardTitle>Order #{order.queueNumber}</CardTitle>
          <p className="text-sm text-gray-500">{formatDate(order.createdAt)}</p>
        </div>
        <OrderStatusBadge status={order.status} />
      </CardHeader>
      
      <CardContent>
        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-medium mb-3">Order Items</h3>
            <div className="space-y-3">
              {order.items.map((item, index) => (
                <div 
                  key={`${item.menuItemId}-${index}`}
                  className="flex justify-between py-2 border-b border-gray-100 last:border-0"
                >
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <span className="font-medium">{item.name}</span>
                      <span>${item.price.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-500">
                      <span>Qty: {item.quantity}</span>
                      <span>${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                    {item.notes && (
                      <div className="mt-1 text-sm text-gray-600 bg-gray-50 p-2 rounded">
                        Note: {item.notes}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="pt-4 border-t border-gray-200">
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Subtotal</span>
              <span>${order.totalAmount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-medium text-lg">
              <span>Total</span>
              <span>${order.totalAmount.toFixed(2)}</span>
            </div>
          </div>
          
          {order.status === 'ready' && (
            <div className="p-4 bg-success-50 border border-success-200 rounded-md">
              <p className="text-success-800 text-center">
                Your order is ready for collection! Please proceed to the pickup counter.
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};