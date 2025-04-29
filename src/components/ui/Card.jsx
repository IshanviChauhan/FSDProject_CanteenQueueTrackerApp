import React from 'react';
import { twMerge } from 'tailwind-merge';

export const Card = ({
  children,
  className,
  hoverable = false,
  ...props
}) => {
  return (
    <div
      className={twMerge(
        'bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden',
        hoverable && 'transition-all duration-200 hover:shadow-md hover:-translate-y-1',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export const CardHeader = ({
  children,
  className,
  ...props
}) => {
  return (
    <div
      className={twMerge('p-4 border-b border-gray-200', className)}
      {...props}
    >
      {children}
    </div>
  );
};

export const CardTitle = ({
  children,
  className,
  ...props
}) => {
  return (
    <h3
      className={twMerge('text-lg font-semibold', className)}
      {...props}
    >
      {children}
    </h3>
  );
};

export const CardContent = ({
  children,
  className,
  ...props
}) => {
  return (
    <div
      className={twMerge('p-4', className)}
      {...props}
    >
      {children}
    </div>
  );
};

export const CardFooter = ({
  children,
  className,
  ...props
}) => {
  return (
    <div
      className={twMerge('p-4 border-t border-gray-200', className)}
      {...props}
    >
      {children}
    </div>
  );
};