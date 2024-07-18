// src/components/ReferralLink.jsx
import React from 'react';

const ReferralLink = ({ telegramId }) => {
  const referralLink = `https://t.me/YOUR_BOT_NAME?start=${telegramId}`;

  return (
    <div>
      <h2>Your Referral Link</h2>
      <input type="text" value={referralLink} readOnly />
      <button
        onClick={() => {
          navigator.clipboard.writeText(referralLink);
          alert('Referral link copied to clipboard!');
        }}
      >
        Copy Link
      </button>
    </div>
  );
};

export default ReferralLink;
