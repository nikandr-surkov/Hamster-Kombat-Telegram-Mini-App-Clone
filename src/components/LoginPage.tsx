// src/pages/LoginPage.tsx

import React, { useContext, useEffect, useState } from 'react';
import { retrieveLaunchParams, LaunchParams as SdkLaunchParams } from '@telegram-apps/sdk';
import { AuthContext } from '../context/AuthContext';
import { InitData, User } from '../utils/types';

const LoginPage: React.FC = () => {
  const { setTelegramId } = useContext(AuthContext);
  const [status, setStatus] = useState<string | null>(null);

  useEffect(() => {
    try {
      const { initData } = retrieveLaunchParams() as SdkLaunchParams & { initData: InitData };
      console.log('Initialization Data:', initData); // Debugging log

      if (initData) {
        console.log('initData is present'); // Debugging log

        if (initData.user) {
          // Directly use initData.user as User type
          const userData = initData.user as User; // Type assertion
          console.log('User data:', userData); // Debugging log

          if (userData.id) {
            setTelegramId(userData.id.toString());
            setStatus('Login successful!');
          } else {
            setStatus('User ID is not available.');
            console.error('User ID is not available in user data.');
          }
        } else {
          setStatus('Initialization data does not contain user information.');
          console.error('Initialization data does not contain user information.');
        }
      } else {
        setStatus('Initialization data is null or undefined.');
        console.error('Initialization data is null or undefined.');
      }
    } catch (error) {
      setStatus('Error retrieving initialization data. Please check console for details.');
      console.error('Error retrieving initialization data:', error);
    }
  }, [setTelegramId]);

  return (
    <div>
      <h1>{status || 'Logging in...'}</h1>
    </div>
  );
};

export default LoginPage;
