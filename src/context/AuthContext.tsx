import React, { createContext, useState, ReactNode } from 'react';

interface AuthContextProps {
  token: string | null;
  telegramId: string | null;  // Add Telegram ID
  login: (token: string, telegramId: string) => void;
}

export const AuthContext = createContext<AuthContextProps>({
  token: null,
  telegramId: null,  // Initialize Telegram ID
  login: () => {},
});

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const [telegramId, setTelegramId] = useState<string | null>(null);

  const login = (token: string, telegramId: string) => {
    setToken(token);
    setTelegramId(telegramId);
    localStorage.setItem('token', token);
    localStorage.setItem('telegramId', telegramId);  // Store Telegram ID
  };

  return (
    <AuthContext.Provider value={{ token, telegramId, login }}>
      {children}
    </AuthContext.Provider>
  );
};
