import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

// Function to fetch referral link
const fetchReferralLink = async (telegramId) => {
  try {
    const response = await fetch(`http://127.0.0.1:8000/api/referral-link/?telegram_id=${telegramId}`);
    const contentType = response.headers.get('content-type');

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to fetch referral link: ${errorText}`);
    }

    if (contentType && contentType.includes('application/json')) {
      const data = await response.json();
      return data.referral_link;
    } else {
      const text = await response.text();
      throw new Error(`Expected JSON, but got: ${text}`);
    }
  } catch (error) {
    console.error(`fetchReferralLink: ${error}`);
    throw error;
  }
};

// Function to fetch referrals
const fetchReferrals = async (telegramId) => {
  try {
    const response = await fetch(`http://127.0.0.1:8000/api/referrals/?telegram_id=${telegramId}`);
    const contentType = response.headers.get('content-type');

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to fetch referral data: ${errorText}`);
    }

    if (contentType && contentType.includes('application/json')) {
      const data = await response.json();
      return data.referrals;
    } else {
      const text = await response.text();
      throw new Error(`Expected JSON, but got: ${text}`);
    }
  } catch (error) {
    console.error(`fetchReferrals: ${error}`);
    throw error;
  }
};

const Friends = () => {
  const [referralLink, setReferralLink] = useState('');
  const [referrals, setReferrals] = useState([]);
  const [error, setError] = useState(null);
  const { telegramId } = useContext(AuthContext);

  useEffect(() => {
    if (telegramId) {
      const getReferralData = async () => {
        try {
          // Fetch referral link
          const link = await fetchReferralLink(telegramId);
          setReferralLink(link);

          // Fetch referrals
          const referralData = await fetchReferrals(telegramId);
          setReferrals(referralData);
        } catch (error) {
          setError(error.message);
        }
      };

      getReferralData();
    }
  }, [telegramId]);

  return (
    <div>
      <h1>Friends</h1>
      {error ? (
        <p>Error: {error}</p>
      ) : (
        <>
          <p>Referral Link: <a href={referralLink} target="_blank" rel="noopener noreferrer">{referralLink}</a></p>
          <p>Telegram ID: {telegramId}</p>
          <h2>Referred Users:</h2>
          <ul>
            {referrals.map((referral) => (
              <li key={referral.telegram_id}>
                Username: {referral.username}, Telegram ID: {referral.telegram_id}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default Friends;
