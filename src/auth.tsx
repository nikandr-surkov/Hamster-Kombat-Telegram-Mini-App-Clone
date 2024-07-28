import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { postTelegramAuth } from './apiService';  // Adjust the import path as needed

declare global {
  interface Window {
    Telegram?: {
      WebApp: {
        initData: string;
        initDataUnsafe: {
          user?: {
            id: number;
            first_name: string;
            last_name: string;
            username: string;
          };
        };
        MainButton: {
          text: string;
          show: () => void;
        };
        ready: () => void;
      };
    };
  }
}

const Auth: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (typeof window.Telegram !== 'undefined') {
      const tg = window.Telegram.WebApp;
      tg.ready();
      console.log('Telegram WebApp initialized:', tg);

      tg.MainButton.text = "Authenticating...";
      tg.MainButton.show();

      const initData = tg.initData;

      if (!initData) {
        console.error('No initData available');
        return;
      }

      const user = tg.initDataUnsafe?.user;

      if (user) {
        const authData = {
          id: user.id,
          first_name: user.first_name,
          last_name: user.last_name,
          username: user.username,
        };

        postTelegramAuth({
          user: authData,
          auth_date: Math.floor(Date.now() / 1000),
          hash: tg.initData,
        })
        .then(data => {
          if (data.token) {
            localStorage.setItem('token', data.token);
            navigate('/');
          } else {
            console.error('Authentication failed', data);
          }
        })
        .catch(error => {
          console.error('Error:', error);
        });
      } else {
        console.error('No user data available');
      }
    } else {
      // Simulate Telegram environment for local testing
      console.warn('Telegram Web App not available, using mock data for testing');

      const mockUser = {
        id: 123456789,
        first_name: 'Test',
        last_name: 'User',
        username: 'testuser',
      };

      postTelegramAuth({
        user: mockUser,
        auth_date: Math.floor(Date.now() / 1000),
        hash: 'mockHash', // Use a mock hash for testing
      })
      .then(data => {
        if (data.token) {
          localStorage.setItem('token', data.token);
          navigate('/');
        } else {
          console.error('Authentication failed', data);
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
    }
  }, [navigate]);

  return (
    <div className="auth-container">
      Authenticating with Telegram...
    </div>
  );
};

export default Auth;
