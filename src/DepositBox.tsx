import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { FiCopy, FiCheckCircle } from 'react-icons/fi';
import { format } from 'date-fns';
import { AuthContext } from './context/AuthContext';
import Richman from './assets/richman.png'; // Adjust the path based on where you placed the GIF
import './App.css';

interface Transaction {
  txid: string;
  amount: number;
  created_at: string;
}

const DepositBox: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isAddressCopied, setIsAddressCopied] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const { telegramId, address } = useContext(AuthContext);

  useEffect(() => {
    if (telegramId && address) {
      console.log("Telegram ID and Address are both available.");
      fetchTransactions();
    } else if (!telegramId) {
      console.log("Waiting for Telegram ID.");
    } else if (!address) {
      console.log("Waiting for Address.");
    }
  }, [telegramId, address]);

  const fetchTransactions = async () => {
    try {
      setLoading(true);

      const transactionsResponse = await axios.get('https://aa72-51-75-120-6.ngrok-free.app/wallet/deposit/', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      const transactionsData = Array.isArray(transactionsResponse.data)
        ? transactionsResponse.data.map((tx: any) => ({
            txid: tx.txid,
            amount: tx.amount,
            created_at: tx.created_at,
          }))
        : [];
      setTransactions(transactionsData);
    } catch (err: any) {
      console.error("Error fetching transactions:", err);
      setError('Failed to fetch deposit information. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopyAddress = () => {
    if (address) {
      navigator.clipboard.writeText(address);
      setIsAddressCopied(true);
      setTimeout(() => setIsAddressCopied(false), 2000);
    }
  };

  if (!telegramId || !address) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-500">
          {telegramId ? 'Loading address...' : 'Waiting for Telegram ID...'}
        </p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-16 w-16"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-md mx-auto p-6 bg-red-100 rounded-xl shadow-md text-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-[#0D0D0D] rounded-xl shadow-md flex flex-col items-center space-y-6">
      <h2 className="text-2xl font-semibold text-[#FFFFFF]">Deposit TRX</h2>
      {/* Display GIF in the center of the page */}
      <div className="flex justify-center items-center w-full">
      <img src={Richman} alt="Deposit Instructions" className="max-w-20 h-18" />

      </div>
      <div className="bg-[#1E2A38] p-4 rounded-md text-center w-full break-words">
        <p className="font-mono text-sm text-[#FFFFFF]">{address || 'Loading address...'}</p>
      </div>
      <button
        onClick={handleCopyAddress}
        className={`flex items-center ${isAddressCopied ? 'bg-[#FF6F00]' : 'bg-[#1E2A38]'} text-[#FFFFFF] px-4 py-2 rounded-md hover:bg-[#FF6F00] transition duration-200`}
        disabled={!address}
      >
        {isAddressCopied ? (
          <>
            <FiCheckCircle className="mr-2" />
            Address Copied
          </>
        ) : (
          <>
            <FiCopy className="mr-2" />
            Copy Address
          </>
        )}
      </button>
      <p className="text-xs text-[#E94E77] text-center">
        Your deposit will be automatically detected and reflected in your account.
      </p>

      {transactions.length > 0 ? (
        <div className="w-full mt-6">
          <h3 className="text-xl font-semibold text-[#FFFFFF] mb-4">
            Deposit History
          </h3>
          <div className="w-full max-h-64 overflow-y-auto">
            <table className="min-w-full bg-[#1E2A38]">
              <thead>
                <tr>
                  <th className="py-2 px-4 bg-[#0D0D0D] text-left text-sm font-medium text-[#FFFFFF]">
                    Date
                  </th>
                  <th className="py-2 px-4 bg-[#0D0D0D] text-left text-sm font-medium text-[#FFFFFF]">
                    Amount (TRX)
                  </th>
                  <th className="py-2 px-4 bg-[#0D0D0D] text-left text-sm font-medium text-[#FFFFFF]">
                    Transaction ID
                  </th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((tx) => (
                  <tr key={tx.txid} className="border-b border-[#0D0D0D]">
                    <td className="py-2 px-4 text-sm text-[#FFFFFF]">
                      {format(new Date(tx.created_at), 'dd/MM/yyyy HH:mm')}
                    </td>
                    <td className="py-2 px-4 text-sm text-[#FFFFFF]">
                      {tx.amount}
                    </td>
                    <td className="py-2 px-4 text-sm text-[#FFFFFF]">
                      {tx.txid}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <p className="text-[#FFFFFF] text-center mt-6">No deposit history found.</p>
      )}
    </div>
  );
};

export default DepositBox;
