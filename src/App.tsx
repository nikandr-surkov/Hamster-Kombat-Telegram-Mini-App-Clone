// src/App.tsx
import React, { useContext, useState } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
import Login from './components/LoginPage';
import Friends from './components/Friends/Friends';
import Airdrop from './components/Airdrop/Airdrop';
import ReferralPage from './components/ReferralPage'; // Import the ReferralPage component
import Hamster from './icons/Hamster';
import { binanceLogo, dailyCipher, dailyCombo, dailyReward, dollarCoin, mainCharacter } from './images';
import Info from './icons/Info';
import Settings from './icons/Settings';

const levelNames = ["Level 1", "Level 2", "Level 3"]; // Example level names

// Calculate progress function
const calculateProgress = (currentPoints: number, pointsForNextLevel: number) => {
  return (currentPoints / pointsForNextLevel) * 100;
};

// Format profit per hour function
const formatProfitPerHour = (profit: number) => {
  return `${profit.toFixed(2)} coins/hour`;
};

// ProtectedRoute component to protect routes
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    return <Navigate to="/login" />;
  }

  const { user } = authContext;
  return user ? <>{children}</> : <Navigate to="/login" />;
};

const App: React.FC = () => {
  const [levelIndex, setLevelIndex] = useState(0);
  const [points, setPoints] = useState(0);
  const [profitPerHour, setProfitPerHour] = useState(0);
  const [clicks, setClicks] = useState<{ id: number; x: number; y: number }[]>([]);
  const [dailyRewardTimeLeft, setDailyRewardTimeLeft] = useState("00:00:00");
  const [dailyCipherTimeLeft, setDailyCipherTimeLeft] = useState("00:00:00");
  const [dailyComboTimeLeft, setDailyComboTimeLeft] = useState("00:00:00");

  const handleCardClick = (e: React.MouseEvent) => {
    const newClick = {
      id: Date.now(),
      x: e.clientX,
      y: e.clientY,
    };
    setClicks([...clicks, newClick]);
    setPoints(points + 10); // Increment points by 10 for each click
    setProfitPerHour(profitPerHour + 1); // Increment profit per hour for each click
  };

  const handleAnimationEnd = (id: number) => {
    setClicks((prevClicks) => prevClicks.filter((click) => click.id !== id));
  };

  const handleTabChange = (tab: string) => {
    console.log(`Tab changed to: ${tab}`);
  };

  const pointsForNextLevel = 100; // Example points required to level up

  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={
          <ProtectedRoute>
            <div className="bg-black flex justify-center">
              <div className="w-full bg-black text-white h-screen font-bold flex flex-col max-w-xl">
                <div className="px-4 z-10">
                  <div className="flex items-center space-x-2 pt-4">
                    <div className="p-1 rounded-lg bg-[#1d2025]">
                      <Hamster size={24} className="text-[#d4d4d4]" />
                    </div>
                    <div>
                      <p className="text-sm">Nikandr (CEO)</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between space-x-4 mt-1">
                    <div className="flex items-center w-1/3">
                      <div className="w-full">
                        <div className="flex justify-between">
                          <p className="text-sm">{levelNames[levelIndex]}</p>
                          <p className="text-sm">{levelIndex + 1} <span className="text-[#95908a]">/ {levelNames.length}</span></p>
                        </div>
                        <div className="w-full bg-[#16181c] rounded-full h-2">
                          <div className="bg-gradient-to-r from-[#ff5151] to-[#fa3dff] h-2 rounded-full" style={{ width: `${calculateProgress(points, pointsForNextLevel)}%` }}></div>
                        </div>
                      </div>
                    </div>
                    <div className="w-1/3">
                      <img src={binanceLogo} alt="Binance Logo" className="h-auto max-w-full" />
                    </div>
                    <div className="w-1/3 flex justify-end">
                      <div className="text-sm flex items-center">
                        <p>+10</p>
                        <img src={dollarCoin} alt="Dollar Coin" className="ml-1 h-5 w-auto" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="relative grow" onClick={handleCardClick}>
                  <img
                    src={mainCharacter}
                    alt="Main Character"
                    className="absolute left-1/2 top-1/2 w-1/2 h-auto transform -translate-x-1/2 -translate-y-1/2"
                  />
                  {clicks.map((click) => (
                    <div
                      key={click.id}
                      className="absolute pointer-events-none"
                      style={{ left: click.x, top: click.y }}
                      onAnimationEnd={() => handleAnimationEnd(click.id)}
                    >
                      <img src={dollarCoin} alt="Dollar Coin" className="h-6 w-auto animate-fade" />
                    </div>
                  ))}
                </div>
                <div className="relative grow bg-[#1d2025] p-4 rounded-t-2xl mt-4 z-10">
                  <div className="grid grid-cols-3 gap-4 text-[#95908a]">
                    <button onClick={() => handleTabChange('rewards')} className="flex flex-col items-center">
                      <img src={dailyReward} alt="Daily Reward" className="h-8 w-auto" />
                      <p className="text-xs mt-1">{dailyRewardTimeLeft}</p>
                    </button>
                    <button onClick={() => handleTabChange('cipher')} className="flex flex-col items-center">
                      <img src={dailyCipher} alt="Daily Cipher" className="h-8 w-auto" />
                      <p className="text-xs mt-1">{dailyCipherTimeLeft}</p>
                    </button>
                    <button onClick={() => handleTabChange('combo')} className="flex flex-col items-center">
                      <img src={dailyCombo} alt="Daily Combo" className="h-8 w-auto" />
                      <p className="text-xs mt-1">{dailyComboTimeLeft}</p>
                    </button>
                  </div>
                  <div className="text-sm mt-4 flex items-center justify-between">
                    <div>
                      <p>Total points:</p>
                      <p className="text-white">{points}</p>
                    </div>
                    <div>
                      <p>Profit per hour:</p>
                      <p className="text-white">{formatProfitPerHour(profitPerHour)}</p>
                    </div>
                    <button onClick={() => handleTabChange('info')} className="p-2 bg-[#1d2025] rounded-lg">
                      <Info size={24} className="text-[#d4d4d4]" />
                    </button>
                    <button onClick={() => handleTabChange('settings')} className="p-2 bg-[#1d2025] rounded-lg">
                      <Settings size={24} className="text-[#d4d4d4]" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </ProtectedRoute>
        } />
        <Route path="/friends" element={<ProtectedRoute><Friends /></ProtectedRoute>} />
        <Route path="/airdrop" element={<ProtectedRoute><Airdrop /></ProtectedRoute>} />
        <Route path="/referrals" element={<ProtectedRoute><ReferralPage /></ProtectedRoute>} /> {/* Add the new route */}
      </Routes>
    </div>
  );
};

export default App;
