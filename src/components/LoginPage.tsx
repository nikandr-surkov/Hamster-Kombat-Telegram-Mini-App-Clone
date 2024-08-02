import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { retrieveLaunchParams, LaunchParams as SdkLaunchParams } from '@telegram-apps/sdk';
import { AuthContext } from '../context/AuthContext';
import { InitData, User } from '../utils/types';
import { loginUser } from '../api';

const LoginPage: React.FC = () => {
  const { setTelegramId } = useContext(AuthContext);
  const [status, setStatus] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleLogin = async () => {
      try {
        const { initData } = retrieveLaunchParams() as SdkLaunchParams & { initData: InitData };

        if (initData && initData.user) {
          const userData: User = {
            // Ensure these fields match the backend's expectations
            telegram_id: initData.user.id.toString(), // Ensure you are sending the correct ID field
          };

          setTelegramId(userData.telegram_id);

          try {
            const response = await loginUser(userData);
            setStatus('Login successful!');
            navigate('/'); // Redirect to the main page after successful login
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
