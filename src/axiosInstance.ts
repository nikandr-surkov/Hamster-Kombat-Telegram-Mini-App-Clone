import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/', // Ensure this is correctly set to the base URL of your API
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
