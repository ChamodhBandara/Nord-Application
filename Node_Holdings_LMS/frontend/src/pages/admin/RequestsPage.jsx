import React, { useState, useEffect } from 'react';
import { getAdminRequests, approveRequest, rejectRequest } from '../../services/api';

const RequestsPage = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchRequests = async () => {
    try {
      setLoading(true);
      const response = await getAdminRequests();
      setRequests(response.data);
    } catch (err) {
      setError('Failed to fetch registration requests.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleApprove = async (id) => {
    try {
      await approveRequest(id);
      fetchRequests();
    } catch (err) {
        console.error(err);
      alert('Failed to approve request.');
    }
  };

  const handleReject = async (id) => {
    try {
      await rejectRequest(id);
      fetchRequests();
    } catch (err) {
        console.error(err);
      alert('Failed to reject request.');
    }
  };

  if (loading) return <p>Loading requests...</p>;
  if (error) return <p className="error-message">{error}</p>;

  return (
    <div className="card">
      <h2>Registration Requests</h2>
      {requests.length === 0 ? (
        <p>There are no pending registration requests.</p>
      ) : (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Username</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((req) => (
                <tr key={req.id}>
                  <td>{req.name}</td>
                  <td>{req.username}</td>
                  <td>{req.email}</td>
                  <td>
                    <button onClick={() => handleApprove(req.id)} className="btn btn-success">
                      Approve
                    </button>
                    <button onClick={() => handleReject(req.id)} className="btn btn-danger">
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default RequestsPage;