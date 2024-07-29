import React, { useEffect, useState } from 'react';
import './Friends.css';

interface Friend {
  id: number;
  name: string;
}

interface FriendsProps {
  telegramId: string | null;  // Accept Telegram ID as a prop
}

const Friends: React.FC<FriendsProps> = ({ telegramId }) => {
  const [friendsList, setFriendsList] = useState<Friend[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (telegramId) {
      const fetchFriends = async () => {
        try {
          const response = await fetch(`http://127.0.0.1:8000/api/referral/`, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`, // Assuming token is stored in localStorage
            },
          });

          if (response.ok) {
            const data = await response.json();
            setFriendsList(data); // Adjust according to actual response structure
          } else {
            setError('Failed to fetch friends');
          }
        } catch (error) {
          setError('An error occurred while fetching friends');
        } finally {
          setLoading(false);
        }
      };

      fetchFriends();
    } else {
      setLoading(false);
      setError('Telegram ID is missing');
    }
  }, [telegramId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="friends-container">
      <div className="referral-box">
        <h2 className="referral-title">Referral Link</h2>
        <p className="referral-link">{`https://example.com/referral?user=${telegramId}`}</p>
        <button className="copy-button" onClick={() => navigator.clipboard.writeText(`https://example.com/referral?user=${telegramId}`)}>
          Copy Link
        </button>
      </div>
      <div className="friends-list-box">
        <h2 className="friends-list-title">Friends Connected</h2>
        <ul className="friends-list">
          {friendsList.length > 0 ? (
            friendsList.map(friend => (
              <li key={friend.id} className="friend-item">{friend.name}</li>
            ))
          ) : (
            <li>No friends found</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Friends;
