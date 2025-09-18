import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:8081/api', // Your Spring Boot backend URL
});

// Function to get auth headers
const getAuthHeaders = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user && user.auth) {
    return {
      Authorization: `Basic ${user.auth}`,
    };
  }
  return {};
};

// Interceptor to add auth headers to every request
apiClient.interceptors.request.use((config) => {
  config.headers = {
    ...config.headers,
    ...getAuthHeaders(),
  };
  return config;
});

// --- Auth Service ---
export const login = (username, password) => {
  const auth = btoa(`${username}:${password}`); // Base64 encode credentials
  return apiClient.get('/auth/login/success', {
    headers: {
      Authorization: `Basic ${auth}`,
    },
  });
};

export const register = (userData) => {
  return apiClient.post('/auth/register', userData);
};

// --- Admin Service ---
export const getAdminRequests = () => {
  return apiClient.get('/admin/requests');
};

export const getAdminEmployees = () => {
  return apiClient.get('/admin/employees');
};

export const approveRequest = (id) => {
  return apiClient.post(`/admin/requests/approve/${id}`);
};

export const rejectRequest = (id) => {
  return apiClient.delete(`/admin/requests/reject/${id}`);
};

// --- User Service ---
export const getUserDetails = () => {
  return apiClient.get('/user/details');
};

export const updateUsername = (newUsername) => {
  return apiClient.put('/user/update/username', { newUsername });
};

export const updatePassword = (newPassword) => {
  return apiClient.put('/user/update/password', { newPassword });
};