import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { login as apiLogin } from '../services/api';
import { AuthContext } from './auth-context'; // Import the context from the new file

// This file ONLY exports the AuthProvider component.
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (username, password) => {
    try {
      const response = await apiLogin(username, password);
      const authData = btoa(`${username}:${password}`);
      const role = response.data.roles[0].authority.replace('ROLE_', '');

      const userData = {
        username: response.data.username,
        auth: authData,
        role: role,
      };

      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);

      if (role === 'ADMIN') {
        navigate('/admin');
      } else if (role === 'USER') {
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Login failed:', error);
      throw new Error('Invalid username or password.');
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/login');
  };

  const value = { user, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};