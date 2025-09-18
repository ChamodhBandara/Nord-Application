import React from 'react';

const CustomerListPage = () => {
  return (
    <div className="card">
      <h2>All Customers</h2>
      <p>This page will display a list of all customers once the backend API is connected.</p>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Company Name</th>
              <th>Contact Person</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {/* Placeholder Data */}
            <tr>
              <td>Innovate Inc.</td>
              <td>Jane Doe</td>
              <td>Active</td>
            </tr>
            <tr>
              <td>Tech Solutions</td>
              <td>John Smith</td>
              <td>Active</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CustomerListPage;