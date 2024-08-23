// src/components/DepositBox.jsx
import React from 'react';

const DepositBox = () => {
  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-md flex flex-col items-center space-y-4">
      <h2 className="text-2xl font-semibold">Deposit TRX</h2>
      <p className="text-gray-500">Send TRX to the address below to make a deposit.</p>
      <div className="bg-gray-100 p-4 rounded-md text-center">
        <p className="font-mono text-sm break-all">
          {/* Dynamic TRX Address will be placed here */}
          your-tron-subaddress-here
        </p>
      </div>
      <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
        Copy Address
      </button>
      <p className="text-xs text-gray-400">Your deposit will be automatically detected.</p>
    </div>
  );
}

export default DepositBox;
