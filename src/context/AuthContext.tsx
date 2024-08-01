import React, { createContext, useState, ReactNode } from 'react';

interface AuthContextProps {
  telegramId: string | null;
  setTelegramId: (telegramId: string) => void;
}

export const AuthContext = createContext<AuthContextProps>({
  telegramId: null,
  setTelegramId: () => {},
});

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [telegramId, setTelegramId] = useState<string | null>(null);

  return (
    <AuthContext.Provider value={{ telegramId, setTelegramId }}>
      {children}
    </AuthContext.Provider>
  );
};
