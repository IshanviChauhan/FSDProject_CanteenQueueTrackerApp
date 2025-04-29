import React from 'react';
import { CheckSquare, Bell } from 'lucide-react';
import { useNotifications } from '../../context/NotificationContext';
import { formatDistanceToNow } from '../../utils/dateUtils';
import { Button } from '../ui/Button';

export const NotificationDropdown = () => {
  const { userNotifications, markAsRead, markAllAsRead } = useNotifications();
  
  return (
    <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg overflow-hidden z-10">
      <div className="p-3 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
        <h3 className="text-sm font-medium text-gray-900 flex items-center">
          <Bell size={16} className="mr-2" />
          Notifications
        </h3>
        {userNotifications.length > 0 && (
          <Button 
            size="sm" 
            variant="ghost" 
            onClick={() => markAllAsRead()}
            className="text-xs"
          >
            Mark all as read
          </Button>
        )}
      </div>
      
      <div className="max-h-96 overflow-y-auto">
        {userNotifications.length === 0 ? (
          <div className="p-4 text-center text-gray-500">
            <p>No notifications yet</p>
          </div>
        ) : (
          <div>
            {userNotifications.map(notification => (
              <div 
                key={notification.id}
                className={`p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                  notification.read ? 'opacity-70' : 'bg-primary-50'
                }`}
                onClick={() => markAsRead(notification.id)}
              >
                <div className="flex justify-between items-start">
                  <h4 className="text-sm font-medium text-gray-900">{notification.title}</h4>
                  <span className="text-xs text-gray-500">
                    {formatDistanceToNow(new Date(notification.createdAt))}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                
                {!notification.read && (
                  <div className="mt-2 flex justify-end">
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-xs text-primary-600"
                      onClick={(e) => {
                        e.stopPropagation();
                        markAsRead(notification.id);
                      }}
                    >
                      <CheckSquare size={14} className="mr-1" />
                      Mark as read
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};