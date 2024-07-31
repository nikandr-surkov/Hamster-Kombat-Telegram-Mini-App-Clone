import React, { useContext } from 'react';
import { retrieveLaunchParams } from '@telegram-apps/sdk';
import { AuthContext } from '../context/AuthContext';

const LoginPage: React.FC = () => {
  const { login } = useContext(AuthContext);

  const handleLogin = async () => {
    const { initDataRaw } = retrieveLaunchParams();

    try {
      const response = await fetch(' https://00b8-95-162-147-85.ngrok-free.app/api/auth/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `tma ${initDataRaw}`
        },
      });

      const data = await response.json();
      if (response.ok) {
        const { token, telegramId } = data;  // Assuming data contains telegramId
        login(token, telegramId);  // Pass token and Telegram ID
      } else {
        console.error('Login failed', data);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <button onClick={handleLogin}>Login with Telegram</button>
    </div>
  );
};

export default LoginPage;
