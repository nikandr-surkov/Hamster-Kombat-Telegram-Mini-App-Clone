import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/', // Adjust base URL as needed
});

export default axiosInstance;
