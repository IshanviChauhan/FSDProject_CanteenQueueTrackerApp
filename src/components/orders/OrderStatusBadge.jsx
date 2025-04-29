import React from 'react';
import { Badge } from '../ui/Badge';

export const OrderStatusBadge = ({ status }) => {
  const statusConfig = {
    pending: { label: 'Pending', variant: 'default' },
    preparing: { label: 'Preparing', variant: 'warning' },
    ready: { label: 'Ready for collection', variant: 'success' },
    collected: { label: 'Collected', variant: 'info' },
    cancelled: { label: 'Cancelled', variant: 'error' },
  };
  
  const config = statusConfig[status];
  
  return (
    <Badge variant={config.variant}>
      {config.label}
    </Badge>
  );
};