export type IconProps = {
    size?: number;
    className?: string;
}

// src/types/interfaces.ts

// src/types/interfaces.ts

// src/types/telegram.ts

export interface User {
    id: number;
    first_name: string;
    last_name: string;
    username: string;
    language_code: string;
    is_premium: boolean;
    allows_write_to_pm: boolean;
  }
  
  export interface InitData {
    user?: string; // User data as a JSON string
    chat_instance?: string;
    chat_type?: string;
    auth_date?: number;
    hash?: string;
    [key: string]: unknown; // For additional properties
  }
  
  export interface LaunchParams {
    initData?: InitData;
    initDataRaw?: string;
    [key: string]: unknown; // For additional properties
  }
  