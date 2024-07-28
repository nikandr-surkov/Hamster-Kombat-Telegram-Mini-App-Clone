// src/apiService.ts

import axios from 'axios';

// Set the base URL for the axios instance
const apiClient = axios.create({
  baseURL: 'http://127.0.0.1:8000/',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Access the environment variable using Vite's syntax
const telegramBotToken = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;

if (!telegramBotToken) {
  throw new Error('VITE_TELEGRAM_BOT_TOKEN is not defined');
}

export const fetchReferralLink = async (token: string) => {
  try {
    const response = await apiClient.get('/referral-link/', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return response.data.referral_link;
  } catch (error) {
    console.error('Failed to fetch referral link:', error);
    throw error;
  }
};

export const fetchReferrals = async (token: string) => {
  try {
    const response = await apiClient.get('/referral/', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch referrals:', error);
    throw error;
  }
};
