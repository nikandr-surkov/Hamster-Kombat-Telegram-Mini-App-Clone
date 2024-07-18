import React from 'react';
import './Friends.css';

const Friends: React.FC = () => {
  const referralLink = "https://example.com/referral?user=12345"; // Replace with dynamic link if necessary
  const friendsList = [
    { id: 1, name: "John Doe" },
    { id: 2, name: "Jane Smith" },
    { id: 3, name: "Alice Johnson" }
  ]; // Replace with dynamic list if necessary

  return (
    <div className="friends-container">
      <div className="referral-box">
        <h2 className="referral-title">Referral Link</h2>
        <p className="referral-link">{referralLink}</p>
        <button className="copy-button" onClick={() => navigator.clipboard.writeText(referralLink)}>
          Copy Link
        </button>
      </div>
      <div className="friends-list-box">
        <h2 className="friends-list-title">Friends Connected</h2>
        <ul className="friends-list">
          {friendsList.map(friend => (
            <li key={friend.id} className="friend-item">{friend.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Friends;
