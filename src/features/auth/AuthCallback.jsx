import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { supabase } from '@/services/supabaseClient';

import { toast } from 'sonner';

export default function AuthCallback() {
    const navigate = useNavigate();
    ////
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        // const type = params.get('type');
        const access_token = params.get('access_token');
        const refresh_token = params.get('refresh_token');

        // console.log('callback type:', type);
        // console.log('access_token:', access_token);
        // console.log('refresh_token:', refresh_token);

        if (access_token && refresh_token) {
            supabase.auth
                .setSession({ access_token, refresh_token })
                .then(() => {
                    toast.success('Email confirmed.');
                    navigate('/settings');
                })
                .catch((err) => {
                    console.error('Set session error:', err.message);
                    toast.error('Failed to restore session.');
                    navigate('/login');
                });
        } else {
            toast.error('Missing session info in callback.');
            navigate('/login');
        }
        //eslint-disable-next-line
    }, []);

    return <p className='text-center mt-10'>Restoring session...</p>;
}
