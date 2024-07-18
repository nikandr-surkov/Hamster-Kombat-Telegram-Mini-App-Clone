import axios from 'axios';

const isProduction = import.meta.env.REACT_APP_PRODUCTION === 'true';
const BASE_URL = isProduction ? 'https://your-production-url.com' : 'http://localhost:8000';

const apiService = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const postTelegramAuth = async (telegramData: any) => {
  const response = await apiService.post('/auth/telegram/callback/', telegramData);
  return response.data;
};

export default apiService;
