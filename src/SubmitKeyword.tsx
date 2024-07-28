import React, { useState } from 'react';
import axios from 'axios';

const SubmitKeyword = () => {
  const [keyword, setKeyword] = useState('');
  const token = localStorage.getItem('token');

  const handleAddKeyword = async () => {
    if (keyword) {
      try {
        await axios.post(
          'http://localhost:8000/users/add_keyword/',
          { telegram_id: window.Telegram.WebApp.initDataUnsafe.user.id, keyword },
          { headers: { Authorization: `Token ${token}` } }
        );
        alert('Keyword added successfully!');
        setKeyword('');
      } catch (error) {
        console.error(error);
        alert('Failed to add keyword.');
      }
    } else {
      alert('Keyword cannot be empty.');
    }
  };

  return (
    <div>
      <input
        type="text"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="Enter a keyword"
      />
      <button onClick={handleAddKeyword}>Submit Keyword</button>
    </div>
  );
};

export default SubmitKeyword;