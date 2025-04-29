import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored user in localStorage on load
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email, password) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // For demo purposes, use hardcoded users based on email
      let mockUser;
      if (email === 'student@example.com' && password === 'abc') {
        mockUser = {
          id: '1',
          name: 'John Student',
          email: 'student@example.com',
          role: 'student',
          orderHistory: [],
        };
      } else if (email === 'student2@example.com' && password === 'abc') {
        mockUser = {
          id: '2',
          name: 'John Student',
          email: 'student2@example.com',
          role: 'student',
          orderHistory: [],
        };
      } else if (email === 'staff@example.com' && password === 'abc') {
        mockUser = {
          id: '3',
          name: 'Jane Staff',
          email: 'staff@example.com',
          role: 'staff',
          orderHistory: [],
        };
      } else {
        throw new Error('Invalid credentials');
      }

      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const register = async (name, email, password, role) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Create a new user
      const newUser = {
        id: Math.random().toString(36).substring(2, 11), // Replaced substr with substring
        name,
        email,
        role,
        orderHistory: [],
      };

      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};