import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Divider,
  CircularProgress,
  Alert
} from '@mui/material';

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
  const [referralLink, setReferralLink] = useState<string>('');
  const [referrals, setReferrals] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
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
    <Container>
      <Typography variant="h4" gutterBottom>
        Friends
      </Typography>
      {error ? (
        <Alert severity="error">{error}</Alert>
      ) : (
        <>
          <Typography variant="h6" gutterBottom>
            Referral Link:
          </Typography>
          <Typography variant="body1">
            <a href={referralLink} target="_blank" rel="noopener noreferrer">{referralLink}</a>
          </Typography>
          <Typography variant="h6" gutterBottom>
            Telegram ID:
          </Typography>
          <Typography variant="body1">
            {telegramId}
          </Typography>
          <Typography variant="h6" gutterBottom>
            Referred Users:
          </Typography>
          <List>
            {referrals.map((referral) => (
              <ListItem key={referral.telegram_id}>
                <ListItemText
                  primary={`Username: ${referral.username}`}
                  secondary={`Telegram ID: ${referral.telegram_id}`}
                />
              </ListItem>
            ))}
          </List>
        </>
      )}
    </Container>
  );
};

export default Friends;
