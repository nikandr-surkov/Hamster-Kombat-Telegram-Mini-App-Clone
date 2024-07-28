// src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App.tsx';
import { AuthProvider } from './context/AuthContext'; // Import AuthProvider
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router>
      <AuthProvider> {/* Wrap the app with AuthProvider */}
        <App />
      </AuthProvider>
    </Router>
  </React.StrictMode>,
);
);
