import { supabase } from '@/services/supabaseClient';
import { useEffect, useState } from 'react';

const LOGIN_TIMESTAMP_KEY = 'userLoginTimestamp';

export function useUserUptime() {
    const [uptime, setUptime] = useState('Loading...');
    const [startTime, setStartTime] = useState(null);

    useEffect(() => {
        const init = async () => {
            const {
                data: { session },
            } = await supabase.auth.getSession();

            if (session?.user) {
                // Check if we already stored a login timestamp
                const stored = localStorage.getItem(LOGIN_TIMESTAMP_KEY);
                if (stored) {
                    setStartTime(parseInt(stored, 10));
                } else {
                    const now = Date.now();
                    localStorage.setItem(LOGIN_TIMESTAMP_KEY, now.toString());
                    setStartTime(now);
                }
            } else {
                localStorage.removeItem(LOGIN_TIMESTAMP_KEY);
                setStartTime(null);
                setUptime('Not logged in');
            }
        };

        init();

        const { data: authListener } = supabase.auth.onAuthStateChange(
            (_event, session) => {
                if (session?.user) {
                    const stored = localStorage.getItem(LOGIN_TIMESTAMP_KEY);
                    if (stored) {
                        setStartTime(parseInt(stored, 10));
                    } else {
                        const now = Date.now();
                        localStorage.setItem(
                            LOGIN_TIMESTAMP_KEY,
                            now.toString()
                        );
                        setStartTime(now);
                    }
                    setUptime('Loading...');
                } else {
                    localStorage.removeItem(LOGIN_TIMESTAMP_KEY);
                    setStartTime(null);
                    setUptime('Not logged in');
                }
            }
        );

        return () => {
            authListener.subscription.unsubscribe();
        };
    }, []);

    useEffect(() => {
        if (!startTime) return;

        const interval = setInterval(() => {
            const seconds = Math.floor((Date.now() - startTime) / 1000);

            const days = Math.floor(seconds / 86400);
            const hours = Math.floor((seconds % 86400) / 3600);
            const minutes = Math.floor((seconds % 3600) / 60);
            const secs = seconds % 60;

            const formatted = `${
                days > 0 ? `${days}d ` : ''
            }${hours}h ${minutes}m ${secs}s`;
            setUptime(formatted);
        }, 1000);

        return () => clearInterval(interval);
    }, [startTime]);

    return uptime;
}
