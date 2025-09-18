import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { register } from '../services/api';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    try {
      const response = await register(formData);
      setMessage(response.data);
      setFormData({ name: '', username: '', email: '', password: '' });
    } catch (err) {
      setError('Registration failed. Please try again.');
      console.error(err);
    }
  };

  return (
    <div className="auth-page-container">
      <div className="auth-form-wrapper">
        <h2>Create Account</h2>
        <p>Submit your registration for admin approval.</p>
        <form onSubmit={handleSubmit} className="form-container">
          <div className="form-group">
            <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
          </div>
          {message && <p className="success-message">{message}</p>}
          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="btn btn-primary">
            Register
          </button>
        </form>
        <div className="auth-link">
          <p>
            Already have an account? <Link to="/login">Login here</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;