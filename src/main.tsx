import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App.tsx';
import Friends from './components/Friends/Friends.tsx';
import Airdrop from './components/Airdrop/Airdrop.tsx'; // Import the Airdrop component
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/friends" element={<Friends />} />
        <Route path="/airdrop" element={<Airdrop />} /> {/* Add the Airdrop route */}
      </Routes>
    </Router>
  </React.StrictMode>,
);
