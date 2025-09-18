import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="home-container">
      <div className="home-content">
        <h1 className="home-title">Employee Management System</h1>
        <p className="home-subtitle">
          A robust platform for managing employee registration and access.
        </p>
        <div className="home-actions">
          <Link to="/login" className="btn btn-primary">
            Admin / User Login
          </Link>
          <Link to="/register" className="btn btn-secondary">
            Register New User
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;