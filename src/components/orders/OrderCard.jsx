import React from 'react';
import { Clock, ShoppingBag } from 'lucide-react';
import { Card, CardContent, CardFooter } from '../ui/Card';
import { OrderStatusBadge } from './OrderStatusBadge';
import { formatDate } from '../../utils/dateUtils';
import { Button } from '../ui/Button';

export const OrderCard = ({ 
  order, 
  isStaff = false,
  onStatusUpdate,
}) => {
  const handleStatusUpdate = (status) => {
    if (onStatusUpdate) {
      onStatusUpdate(order.id, status);
    }
  };
  
  const renderItemsSummary = () => {
    if (order.items.length <= 2) {
      return order.items.map(item => item.name).join(', ');
    }
    
    const displayedItems = order.items.slice(0, 2);
    const remainingCount = order.items.length - 2;
    
    return `${displayedItems.map(item => item.name).join(', ')} and ${remainingCount} more`;
  };
  
  const renderStaffActions = () => {
    switch (order.status) {
      case 'pending':
        return (
          <Button onClick={() => handleStatusUpdate('preparing')} size="sm">
            Start Preparing
          </Button>
        );
      case 'preparing':
        return (
          <Button onClick={() => handleStatusUpdate('ready')} size="sm">
            Mark as Ready
          </Button>
        );
      case 'ready':
        return (
          <Button onClick={() => handleStatusUpdate('collected')} size="sm">
            Mark as Collected
          </Button>
        );
      default:
        return null;
    }
  };
  
  return (
    <Card className="animate-fade-in">
      <CardContent className="pt-4">
        <div className="flex justify-between items-start mb-4">
          <div>
            <span className="text-sm text-gray-600 mb-1 block">Order #{order.queueNumber}</span>
            <div className="flex items-center gap-1">
              <ShoppingBag size={16} className="text-gray-500" />
              <span className="text-sm">{order.items.length} items</span>
            </div>
          </div>
          <OrderStatusBadge status={order.status} />
        </div>
        
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium text-gray-900 mb-1">Order Summary</h3>
            <p className="text-sm text-gray-600">{renderItemsSummary()}</p>
          </div>
          
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-1">
              <Clock size={16} className="text-gray-500" />
              <span className="text-sm text-gray-600">{formatDate(order.createdAt)}</span>
            </div>
            <span className="font-medium">${order.totalAmount.toFixed(2)}</span>
          </div>
        </div>
      </CardContent>
      
      {isStaff && (
        <CardFooter className="border-t border-gray-100 bg-gray-50">
          <div className="w-full flex justify-end">
            {renderStaffActions()}
          </div>
        </CardFooter>
      )}
    </Card>
  );
};