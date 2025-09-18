import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import './CustomerDetailsPage.css'; // We'll create this for tab styles

const CustomerDetailsPage = () => {
  const { customerId } = useParams();
  const [activeTab, setActiveTab] = useState('details');

  // Placeholder data - this would come from an API call using customerId
  const customerData = {
    companyName: 'Innovate Inc.',
    companyId: 'INV-001',
    addresses: ['123 Tech Road, Silicon Valley, CA', '456 Code Lane, Austin, TX'],
    comments: 'Priority client, requires weekly check-ins.',
  };

  return (
    <div className="card">
      <h2>Customer Details: {customerData.companyName} (ID: {customerId})</h2>
      <p>This page will display detailed information for a specific customer.</p>

      <div className="customer-tabs">
        <button onClick={() => setActiveTab('details')} className={activeTab === 'details' ? 'active' : ''}>
          Company Info
        </button>
        <button onClick={() => setActiveTab('addresses')} className={activeTab === 'addresses' ? 'active' : ''}>
          Addresses
        </button>
        <button onClick={() => setActiveTab('comments')} className={activeTab === 'comments' ? 'active' : ''}>
          Comments
        </button>
      </div>

      <div className="tab-content">
        {activeTab === 'details' && (
          <div>
            <h3>Company Details</h3>
            <p><strong>Company Name:</strong> {customerData.companyName}</p>
            <p><strong>Company ID:</strong> {customerData.companyId}</p>
          </div>
        )}
        {activeTab === 'addresses' && (
          <div>
            <h3>Addresses</h3>
            <ul>
              {customerData.addresses.map((addr, index) => (
                <li key={index}>{addr}</li>
              ))}
            </ul>
          </div>
        )}
        {activeTab === 'comments' && (
          <div>
            <h3>Comments</h3>
            <p>{customerData.comments}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerDetailsPage;