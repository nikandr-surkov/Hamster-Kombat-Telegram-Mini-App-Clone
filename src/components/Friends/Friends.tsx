import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import {
  Container,
  Typography,
  List,
  ListItem,
  Button,
  CircularProgress,
  Alert
} from '@mui/material';
import './Friends.css'; // Make sure to import the CSS file

const fetchReferralLink = async (telegramId: string) => {
  try {
    const response = await fetch(`http://127.0.0.1:8000/Referral/referral-link/?telegram_id=${telegramId}`);
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

const fetchReferrals = async (telegramId: string) => {
  try {
    const response = await fetch(`http://127.0.0.1:8000/api/referral-requests/?telegram_id=${telegramId}`);
    const contentType = response.headers.get('content-type');
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to fetch referral data: ${errorText}`);
    }
    
    if (contentType && contentType.includes('application/json')) {
      const data = await response.json();
      return data; // Update based on the actual structure
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
  const [referralLink, setReferralLink] = useState<string>('');
  const [referrals, setReferrals] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { telegramId } = useContext(AuthContext);

  useEffect(() => {
    if (telegramId) {
      const getReferralData = async () => {
        try {
          const link = await fetchReferralLink(telegramId);
          setReferralLink(link);
          const referralData = await fetchReferrals(telegramId);
          setReferrals(referralData); // Update to reflect the new structure
        } catch (error) {
          setError((error as Error).message);
        } finally {
          setLoading(false);
        }
      };

      getReferralData();
    }
  }, [telegramId]);

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Container className="friends-container">
      <Typography variant="h4" gutterBottom className="friends-title">
        Friends
      </Typography>
      {error ? (
        <Alert severity="error">{error}</Alert>
      ) : (
        <>
          <div className="referral-box">
            <Typography variant="h6" className="referral-title">
              Referral Link:
            </Typography>
            <Typography variant="body1" className="referral-link">
              <a href={referralLink} target="_blank" rel="noopener noreferrer" style={{ color: '#f3ba2f' }}>
                {referralLink}
              </a>
            </Typography>
            <Button variant="contained" className="copy-button" onClick={() => navigator.clipboard.writeText(referralLink)}>
              Copy Link
            </Button>
          </div>
          <div className="friends-list-box">
            <Typography variant="h6" className="friends-list-title">
              Referred Users:
            </Typography>
            <List className="friends-list">
              {referrals.map((referral) => (
                <ListItem key={referral.telegram_id} className="friend-item">
                  <Typography variant="body2">
                    Username: {referral.username}, Telegram ID: {referral.telegram_id}
                  </Typography>
                </ListItem>
              ))}
            </List>
          </div>
        </>
      )}
    </Container>
  );
};

export default Friends;
