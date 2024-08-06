import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { retrieveLaunchParams } from '@telegram-apps/sdk';

export const AuthContext = createContext({
    telegramId: null as string | null,
    setTelegramId: (id: string) => {}
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [telegramId, setTelegramId] = useState<string | null>(null);

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

                const telegramId2 = user.id;
                if (!telegramId2) {
                    console.error("Telegram user ID is missing");
                    return;
                }

                console.log("Telegram ID:", telegramId2);
                setTelegramId(telegramId2);

                const response = await fetch("http://127.0.0.1:8000/api/login/", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ telegram_id: telegramId2 })
                });

                if (!response.ok) {
                    console.error("Failed to fetch Telegram ID from backend. Status:", response.status);
                    return;
                }

                const data = await response.json();
                console.log("Backend response:", data);

                if (data.message === 'Login successful!') {
                    setTelegramId(telegramId2); // Only set the actual ID
                } else {
                    console.error("Unexpected response format from backend");
                }
            } catch (error) {
                console.error("Error fetching Telegram ID:", error);
            }
        };

        fetchTelegramId();
    }, []);

    return (
        <AuthContext.Provider value={{ telegramId, setTelegramId }}>
            {children}
        </AuthContext.Provider>
    );
};
