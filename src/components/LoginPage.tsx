import React, { useContext } from 'react';
import { retrieveLaunchParams } from '@telegram-apps/sdk';
import { AuthContext } from '../context/AuthContext';

const LoginPage: React.FC = () => {
  const { login } = useContext(AuthContext);

  const handleLogin = async () => {
    const { initDataRaw } = retrieveLaunchParams();

    try {
      const response = await fetch('http://localhost:8000/api/auth/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `tma ${initDataRaw}`
        },
      });

      const data = await response.json();
      if (response.ok) {
        login(data.token);
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
