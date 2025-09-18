import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AdminLayout from './components/layouts/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import RequestsPage from './pages/admin/RequestsPage';
import UserLayout from './components/layouts/UserLayout';
import UserDashboard from './pages/user/UserDashboard';
import ProtectedRoute from './components/ProtectedRoute';

// Import the new customer pages
import CustomerListPage from './pages/admin/CustomerListPage';
import CustomerDetailsPage from './pages/admin/CustomerDetailsPage';

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* Admin Routes */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute role="ADMIN">
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<AdminDashboard />} />
        <Route path="requests" element={<RequestsPage />} />
        {/* Add new customer routes */}
        <Route path="customers" element={<CustomerListPage />} />
        <Route path="customer/:customerId" element={<CustomerDetailsPage />} />
      </Route>

      {/* User Routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute role="USER">
            <UserLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<UserDashboard />} />
      </Route>
    </Routes>
  );
}

export default App;