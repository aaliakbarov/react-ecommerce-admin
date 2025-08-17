import { supabase } from '@/services/supabaseClient';

import { useNavigate } from 'react-router-dom';

import { Card, CardContent } from '@/components/ui/card';

import { LoginForm } from '@/features/auth/LoginForm';

import { toast } from 'sonner';

export default function LoginPage() {
    const navigate = useNavigate();

    const onSubmit = async ({ email, password }) => {
        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            toast.error('Login failed: ' + error.message);
        } else {
            toast.success('Welcome back!');
            navigate('/');
        }
    };

    return (
        <div className='min-h-screen flex justify-center items-start md:items-center px-4 bg-gray-50 py-10'>
            <Card className='w-full max-w-sm md:max-w-[20%]'>
                <CardContent className='w-full pt-6 space-y-5'>
                    <h2 className='text-3xl font-light text-center mt-2'>
                        Admin Panel Log In
                    </h2>

                    <LoginForm onSubmit={onSubmit} />
                </CardContent>
            </Card>
        </div>
    );
}
