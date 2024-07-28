interface TelegramUser {
    id: number;
    first_name: string;
    last_name: string;
    username?: string;
  }
  
  interface TelegramInitDataUnsafe {
    user: TelegramUser;
    query_id: string;
  }
  
  interface TelegramWebApp {
    initData: string;
    initDataUnsafe: TelegramInitDataUnsafe;
    MainButton: {
      text: string;
      show(): void;
      hide(): void;
    };
    ready(): void;
  }
  
  interface TelegramWindow extends Window {
    Telegram: {
      WebApp: TelegramWebApp;
    };
  }
  
  declare const window: TelegramWindow;
  