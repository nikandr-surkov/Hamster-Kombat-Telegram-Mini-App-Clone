import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { retrieveLaunchParams } from '@telegram-apps/sdk';

interface AuthContextType {
    telegramId: string | null;
    subaddress: string | null;
    setTelegramId: (id: string) => void;
    setSubaddress: (address: string) => void;
}

export const AuthContext = createContext<AuthContextType>({
    telegramId: null,
    subaddress: null,
    setTelegramId: () => {},
    setSubaddress: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [telegramId, setTelegramId] = useState<string | null>(null);
    const [subaddress, setSubaddress] = useState<string | null>(null);

    useEffect(() => {
        const fetchTelegramId = async () => {
            try {
                const launchParams = retrieveLaunchParams();
                console.log("Retrieved launchParams:", launchParams);

                if (!launchParams || !launchParams.initData || !launchParams.initData.user) {
                    console.error("Telegram user information is missing or launchParams is null");
                    return;
                }

                const user = launchParams.initData.user;
                console.log("Retrieved user object:", user);

                const telegramId2 = user.id?.toString(); // Convert number to string
                if (!telegramId2) {
                    console.error("Telegram user ID is missing or invalid");
                    return;
                }

                console.log("Telegram ID:", telegramId2);
                setTelegramId(telegramId2);
                localStorage.setItem('telegram_id', telegramId2);  // Store telegram_id in localStorage

                // Send the Telegram ID to the backend
                const response = await fetch("https://6861-51-75-120-6.ngrok-free.app/api/telegram-login/", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ telegram_id: telegramId2 })
                });

                if (!response.ok) {
                    console.error("Failed to fetch data from backend. Status:", response.status);
                    // Log the response body for debugging purposes
                    const responseBody = await response.text();
                    console.error("Response body:", responseBody);
                    return;
                }

                const data = await response.json();
                console.log("Backend response:", data);

                if (data.message === 'Login successful!') {
                    if (data.subaddress) {
                        setSubaddress(data.subaddress); // Set the subaddress from backend
                    } else {
                        console.error("Subaddress is missing in backend response");
                    }
                } else {
                    console.error("Unexpected response format from backend. Message:", data.message);
                }
            } catch (error) {
                console.error("Error fetching Telegram ID:", error);
            }
        };

        fetchTelegramId();
    }, []);

    return (
        <AuthContext.Provider value={{ telegramId, subaddress, setTelegramId, setSubaddress }}>
            {children}
        </AuthContext.Provider>
    );
};
