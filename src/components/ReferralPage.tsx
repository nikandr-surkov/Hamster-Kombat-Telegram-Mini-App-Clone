import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { fetchReferralLink } from '../services/apiService';

const ReferralPage: React.FC = () => {
  const [referralLink, setReferralLink] = useState('');
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchLink = async () => {
      if (user) {
        try {
          const link = await fetchReferralLink(user.token);
          setReferralLink(link);
        } catch (error) {
          console.error('Failed to fetch referral link:', error);
        }
      }
    };
    fetchLink();
  }, [user]);

  return (
    <div>
      <h2>Your Referral Link</h2>
      {referralLink && (
        <p>
          Share this link with your friends: <a href={referralLink}>{referralLink}</a>
        </p>
      )}
    </div>
  );
};

export default ReferralPage;
