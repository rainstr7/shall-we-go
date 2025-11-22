import '@/types/telegram';

export const initTelegramApp = () => {
    if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
        const tg = window.Telegram.WebApp;
        tg.expand();
        tg.enableClosingConfirmation();
        return tg;
    }
    return null;
};

export const getUserData = () => {
    return window.Telegram?.WebApp?.initDataUnsafe?.user;
};
