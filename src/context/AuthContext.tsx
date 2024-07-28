import React, { createContext, useState, ReactNode } from 'react';

interface AuthContextProps {
  token: string | null;
  login: (token: string) => void;
}

export const AuthContext = createContext<AuthContextProps>({
  token: null,
  login: () => {},
});

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);

  const login = (token: string) => {
    setToken(token);
    localStorage.setItem('token', token);
  };

  return (
    <AuthContext.Provider value={{ token, login }}>
      {children}
    </AuthContext.Provider>
  );
};
