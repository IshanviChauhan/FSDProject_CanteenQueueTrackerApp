import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Utensils, Clock, Bell } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/Button';

export const HomePage = () => {
  const { user } = useAuth();
  
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="relative">
        <div className="bg-primary-500 rounded-xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-primary-400 opacity-90 z-0"></div>
          <img 
            src="https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
            alt="Campus Food" 
            className="absolute inset-0 w-full h-full object-cover mix-blend-overlay"
          />
          <div className="relative z-10 px-6 py-12 md:py-20 lg:py-24 max-w-2xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 animate-fade-in">
              Skip the Line, Savor the Flavor
            </h1>
            <p className="text-white text-lg mb-8 animate-fade-in animation-delay-150">
              Order from the campus canteen, get notified when your food is ready, and collect without waiting.
            </p>
            <div className="flex justify-center space-x-4 animate-fade-in animation-delay-300">
              <Link to="/menu">
                <Button size="lg" leftIcon={<ShoppingBag size={18} />}>
                  Order Now
                </Button>
              </Link>
              {!user && (
                <Link to="/register">
                  <Button variant="outline" size="lg" className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white border-white">
                    Sign Up
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>
      
      {/* How It Works */}
      <section>
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">How It Works</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">Our easy three-step process gets you your food without the wait</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 text-center animate-fade-in">
            <div className="inline-flex items-center justify-center p-3 bg-primary-100 rounded-full text-primary-600 mb-4">
              <ShoppingBag size={24} />
            </div>
            <h3 className="text-xl font-semibold mb-2">1. Order Online</h3>
            <p className="text-gray-600">Browse the menu, select your items, and complete your payment securely.</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 text-center animate-fade-in animation-delay-150">
            <div className="inline-flex items-center justify-center p-3 bg-primary-100 rounded-full text-primary-600 mb-4">
              <Bell size={24} />
            </div>
            <h3 className="text-xl font-semibold mb-2">2. Get Notified</h3>
            <p className="text-gray-600">Receive a notification when your order is ready for collection.</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 text-center animate-fade-in animation-delay-300">
            <div className="inline-flex items-center justify-center p-3 bg-primary-100 rounded-full text-primary-600 mb-4">
              <Utensils size={24} />
            </div>
            <h3 className="text-xl font-semibold mb-2">3. Collect & Enjoy</h3>
            <p className="text-gray-600">Skip the line and collect your freshly prepared order from the pickup counter.</p>
          </div>
        </div>
      </section>
      
      {/* Featured Menu */}
      <section>
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Today's Specials</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">Check out some of our most popular items</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100 animate-fade-in hover:shadow-md transition-shadow">
            <img 
              src="" 
              alt="Veg Burger" 
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="font-semibold mb-1">Veg Burger</h3>
              <p className="text-gray-600 text-sm mb-3">Juicy potato patty with lettuce, tomato, and our special sauce</p>
              <div className="flex justify-between items-center">
                <span className="font-bold text-primary-600">Rs.70</span>
                <div className="flex items-center text-sm text-gray-500">
                  <Clock size={14} className="mr-1" />
                  <span>12 mins</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100 animate-fade-in animation-delay-150 hover:shadow-md transition-shadow">
            <img 
              src="" 
              alt="Pasta" 
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="font-semibold mb-1">Pasta</h3>
              <p className="text-gray-600 text-sm mb-3">Crisp romaine lettuce with grilled chicken, parmesan, and dressing</p>
              <div className="flex justify-between items-center">
                <span className="font-bold text-primary-600">Rs.60</span>
                <div className="flex items-center text-sm text-gray-500">
                  <Clock size={14} className="mr-1" />
                  <span>10 mins</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100 animate-fade-in animation-delay-300 hover:shadow-md transition-shadow">
            <img 
              src="" 
              alt="Cold Coffee" 
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="font-semibold mb-1">Cold Coffee</h3>
              <p className="text-gray-600 text-sm mb-3">Cold brewed coffee served over ice</p>
              <div className="flex justify-between items-center">
                <span className="font-bold text-primary-600">Rs.60</span>
                <div className="flex items-center text-sm text-gray-500">
                  <Clock size={14} className="mr-1" />
                  <span>2 mins</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="text-center mt-8">
          <Link to="/menu">
            <Button>
              View Full Menu
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};