import React, { useState, useEffect } from 'react';
import { getUserDetails, updateUsername, updatePassword } from '../../services/api';
import { useAuth } from '../../hooks/useAuth';

const UserDashboard = () => {
  const [details, setDetails] = useState(null);
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const { logout } = useAuth();

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await getUserDetails();
        setDetails(response.data);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch user details.');
      }
    };
    fetchDetails();
  }, []);

  const handleUsernameUpdate = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    try {
      const response = await updateUsername(newUsername);
      setMessage(response.data);
      alert('Username updated successfully! Please log in again.');
      logout();
    } catch (err) {
        console.error(err);
      setError('Failed to update username.');
    }
  };

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    try {
      const response = await updatePassword(newPassword);
      setMessage(response.data);
      setNewPassword('');
    } catch (err) {
        console.error(err);
      setError('Failed to update password.');
    }
  };

  if (!details) return <p>Loading your details...</p>;

  return (
    <div>
      <div className="card">
        <h2>My Details</h2>
        <p><strong>Name:</strong> {details.name}</p>
        <p><strong>Username:</strong> {details.username}</p>
        <p><strong>Email:</strong> {details.email}</p>
      </div>

      {message && <p className="success-message">{message}</p>}
      {error && <p className="error-message">{error}</p>}

      <div className="card">
        <h2>Update Profile</h2>
        <form onSubmit={handleUsernameUpdate} className="form-container">
          <h3>Reset Username</h3>
          <div className="form-group">
            <input
              type="text"
              placeholder="Enter new username"
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">Update Username</button>
        </form>

        <form onSubmit={handlePasswordUpdate} className="form-container">
          <h3>Reset Password</h3>
          <div className="form-group">
            <input
              type="password"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">Update Password</button>
        </form>
      </div>
    </div>
  );
};

export default UserDashboard;