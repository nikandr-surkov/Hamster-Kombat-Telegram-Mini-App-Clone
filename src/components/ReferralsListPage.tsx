import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { fetchReferrals } from '../services/apiService';

const ReferralsListPage: React.FC = () => {
  const [referrals, setReferrals] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchReferralsList = async () => {
      if (user) {
        try {
          const referralsList = await fetchReferrals(user.token);
          setReferrals(referralsList);
        } catch (error) {
          console.error('Failed to fetch referrals:', error);
        }
      }
    };
    fetchReferralsList();
  }, [user]);

  return (
    <div>
      <h2>Your Referrals</h2>
      <ul>
        {referrals.map((referral) => (
          <li key={referral.id}>{referral.username}</li>
        ))}
      </ul>
    </div>
  );
};

export default ReferralsListPage;
