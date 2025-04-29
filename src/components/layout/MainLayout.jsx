import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import { useAuth } from '../../context/AuthContext';
import { NotificationProvider } from '../../context/NotificationContext';

export const MainLayout = () => {
  const { user } = useAuth();
  
  return (
    <NotificationProvider userId={user?.id}>
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-6 md:py-8">
          <Outlet />
        </main>
        <Footer />
      </div>
    </NotificationProvider>
  );
};