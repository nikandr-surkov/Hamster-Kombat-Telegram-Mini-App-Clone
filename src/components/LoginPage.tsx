import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { retrieveLaunchParams, LaunchParams as SdkLaunchParams } from '@telegram-apps/sdk';
import { AuthContext } from '../context/AuthContext';
import { User } from '../utils/types';
import { loginUser } from '../api';

const LoginPage: React.FC = () => {
  const { setTelegramId } = useContext(AuthContext);
  const [status, setStatus] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleLogin = async () => {
      try {
        const { initData } = retrieveLaunchParams() as SdkLaunchParams & { initData: { user: { id: string } } };

        if (initData && initData.user) {
          const userData: User = {
            telegram_id: initData.user.id.toString(),
          };

          console.log('Retrieved userData:', userData);

          setTelegramId(userData.telegram_id);
          localStorage.setItem('telegram_id', userData.telegram_id);  // Store telegram_id in localStorage
          console.log('Set Telegram ID:', userData.telegram_id);

          try {
            const response = await loginUser(userData);
            console.log('Login API Response:', response);
            const data = await response.json();
            if (data.message === 'Login successful!') {
              setStatus('Login successful!');
              navigate('/'); // Redirect to the main page after successful login
            } else {
              setStatus('Login failed. Please try again.');
            }
          } catch (error) {
            setStatus('Login failed. Please try again.');
            console.error('Error during login API call:', error);
          }
        } else {
          setStatus('Initialization data does not contain user information.');
        }
      } catch (error) {
        setStatus('Error retrieving initialization data. Please check console for details.');
        console.error('Error retrieving initialization data:', error);
      }
    };

    handleLogin();
  }, [setTelegramId, navigate]);

  return (
    <div>
      <h1>{status || 'Logging in...'}</h1>
    </div>
  );
};

export default LoginPage;
