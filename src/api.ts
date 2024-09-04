export const loginUser = async (userData: { telegram_id: string }) => {
    return fetch("http://127.0.0.1:8000/telegram-login/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userData)
    });
};
