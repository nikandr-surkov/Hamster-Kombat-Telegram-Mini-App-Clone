import React, { useState } from 'react';
import './ProfitCalculator.css'; // Import CSS file for styling

const stakePlans = [
  { value: '1_day', label: '1 day - 1% Profit' },
  { value: '7_days', label: '7 days - 10.5% Profit' },
  { value: '14_days', label: '14 days - 28% Profit' },
  { value: '30_days', label: '30 days - 90% Profit' },
];

const referralBonuses = [
  { value: 2, bonus: 20 },
  { value: 5, bonus: 50 },
  { value: 10, bonus: 100 },
  { value: 20, bonus: 200 },
  { value: 50, bonus: 1000 },
  { value: 100, bonus: 10000 },
];

const calculateProfit = (amount, plan, referrals) => {
  const planProfits = {
    '1_day': 0.01,
    '7_days': 0.105,
    '14_days': 0.28,
    '30_days': 0.90,
  };

  const planProfit = amount * planProfits[plan];
  const referralBonus = referralBonuses
    .filter(bonus => referrals >= bonus.value)
    .reduce((acc, bonus) => bonus.bonus, 0);

  return planProfit + referralBonus;
};

const ProfitCalculator = () => {
  const [investment, setInvestment] = useState('');
  const [selectedPlan, setSelectedPlan] = useState('');
  const [numReferrals, setNumReferrals] = useState('');
  const [totalProfit, setTotalProfit] = useState(null);

  const handleCalculate = () => {
    const profit = calculateProfit(
      parseFloat(investment),
      selectedPlan,
      parseInt(numReferrals)
    );
    setTotalProfit(profit);
  };

  return (
    <div className="profit-calculator">
      <div className="input-group">
        <input
          type="number"
          placeholder="Investment Amount"
          value={investment}
          onChange={(e) => setInvestment(e.target.value)}
        />
      </div>
      <div className="input-group">
        <select
          value={selectedPlan}
          onChange={(e) => setSelectedPlan(e.target.value)}
        >
          <option value="" disabled>Select Stake Plan</option>
          {stakePlans.map(plan => (
            <option key={plan.value} value={plan.value}>
              {plan.label}
            </option>
          ))}
        </select>
      </div>
      <div className="input-group">
        <select
          value={numReferrals}
          onChange={(e) => setNumReferrals(e.target.value)}
        >
          <option value="" disabled>Select Number of Referrals</option>
          {referralBonuses.map(bonus => (
            <option key={bonus.value} value={bonus.value}>
              {bonus.value} referrals
            </option>
          ))}
        </select>
      </div>
      <button onClick={handleCalculate} className="calculate-btn">
        Calculate Profit
      </button>
      {totalProfit !== null && (
        <div className="total-profit">
          Total Profit: ${totalProfit.toFixed(2)}
        </div>
      )}
    </div>
  );
};

export default ProfitCalculator;