import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { retrieveLaunchParams } from '@telegram-apps/sdk';

interface AuthContextType {
    telegramId: string | null;
    address: string | null;
    setTelegramId: (id: string) => void;
    setAddress: (address: string) => void;
}

export const AuthContext = createContext<AuthContextType>({
    telegramId: null,
    address: null,
    setTelegramId: () => {},
    setAddress: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [telegramId, setTelegramId] = useState<string | null>(null);
    const [address, setAddress] = useState<string | null>(null);

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
                const response = await fetch("https://aa72-51-75-120-6.ngrok-free.app/user/telegram-login/", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ telegram_id: telegramId2 })
                });

                if (!response.ok) {
                    console.error("Failed to fetch data from backend. Status:", response.status);
                    const responseBody = await response.text();
                    console.error("Response body:", responseBody);
                    return;
                }

                const data = await response.json();
                console.log("Backend response:", data);

                // Check if the backend response is successful
                if (data.message === 'Login successful!') {
                    // Address validation logic
                    if (data.address && typeof data.address.address === 'string') { // Fixing the access issue here
                        setAddress(data.address.address);  // Set the address if valid
                    } else {
                        console.error("Address is missing or not a string in backend response");
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
        <AuthContext.Provider value={{ telegramId, address, setTelegramId, setAddress }}>
            {children}
        </AuthContext.Provider>
    );
};
