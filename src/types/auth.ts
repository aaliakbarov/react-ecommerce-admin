import type { User } from '@supabase/supabase-js';

export type Credentials = {
    email: string;
    password: string;
};

export type AuthContextType = {
    user: User | null;
    loading: boolean;
    // login: (email: string, password: string) => Promise<void>;
    // logout: () => Promise<void>;
    // refreshSession: () => Promise<void>;
};
