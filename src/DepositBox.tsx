import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { FiCopy, FiCheckCircle } from 'react-icons/fi';
import { format } from 'date-fns';
import { AuthContext } from './context/AuthContext';

interface Transaction {
  tx_id: string;
  block_number: number;
  amount: number;
  timestamp: string;
}

const DepositBox: React.FC = () => {
  const [address, setAddress] = useState<string>('');
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isAddressCopied, setIsAddressCopied] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const { telegramId, subaddress } = useContext(AuthContext);

  useEffect(() => {
    if (telegramId && subaddress) {
      console.log("Telegram ID and Subaddress are both available.");
      setAddress(subaddress.subaddress); // Access the `subaddress` property within the object
      fetchTransactions();
      setLoading(false);
    } else {
      console.log("Waiting for Telegram ID and Subaddress.");
      setLoading(true);
    }
  }, [telegramId, subaddress]);

  const fetchTransactions = async () => {
    try {
      setLoading(true);

      const transactionsResponse = await axios.get('https://42ba-51-75-120-6.ngrok-free.app/wallet/transactions/', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      const transactionsData = Array.isArray(transactionsResponse.data)
        ? transactionsResponse.data
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
    navigator.clipboard.writeText(address);
    setIsAddressCopied(true);
    setTimeout(() => setIsAddressCopied(false), 2000);
  };

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
    <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-md flex flex-col items-center space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800">Deposit TRX</h2>
      <p className="text-gray-500 text-center">
        Send TRX to the address below to make a deposit.
      </p>
      <div className="bg-gray-100 p-4 rounded-md text-center w-full break-words">
        <p className="font-mono text-sm text-gray-700">{address}</p>
      </div>
      <button
        onClick={handleCopyAddress}
        className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200"
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
      <p className="text-xs text-gray-400 text-center">
        Your deposit will be automatically detected and reflected in your account.
      </p>

      {transactions.length > 0 ? (
        <div className="w-full mt-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Deposit History
          </h3>
          <div className="w-full max-h-64 overflow-y-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="py-2 px-4 bg-gray-200 text-left text-sm font-medium text-gray-700">
                    Date
                  </th>
                  <th className="py-2 px-4 bg-gray-200 text-left text-sm font-medium text-gray-700">
                    Amount (TRX)
                  </th>
                  <th className="py-2 px-4 bg-gray-200 text-left text-sm font-medium text-gray-700">
                    Transaction ID
                  </th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((tx) => (
                  <tr key={tx.tx_id} className="border-b">
                    <td className="py-2 px-4 text-sm text-gray-700">
                      {format(new Date(tx.timestamp), 'dd/MM/yyyy HH:mm')}
                    </td>
                    <td className="py-2 px-4 text-sm text-gray-700">
                      {tx.amount}
                    </td>
                    <td className="py-2 px-4 text-sm text-blue-500 break-all">
                      <a
                        href={`https://tronscan.org/#/transaction/${tx.tx_id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline"
                      >
                        {tx.tx_id.substring(0, 10)}...
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <p className="text-gray-500 mt-6">No deposit history available.</p>
      )}
    </div>
  );
};

export default DepositBox;
