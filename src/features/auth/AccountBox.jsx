import { supabase } from '@/services/supabaseClient';
import { useState } from 'react';
import { useAuth } from '@/features/auth/AuthContext';
import { Link, redirect } from 'react-router-dom';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
} from '@/components/ui/dropdown-menu';

export function AccountBox() {
    const { user } = useAuth();
    ////
    const [open, setOpen] = useState(false);

    const handleLogout = async () => {
        const { error } = await supabase.auth.signOut();

        if (error) {
            console.error('Logout error:', error.message);
        } else {
            redirect('/login');
        }
    };

    return (
        <DropdownMenu open={open} onOpenChange={setOpen}>
            <DropdownMenuTrigger asChild>
                <Avatar className='cursor-pointer w-[2.5em] h-[2.5em]'>
                    <AvatarImage src='/admin-avatar.png' alt='Admin' />
                    <AvatarFallback className='text-lg bg-gray-300'>
                        {user.email.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
                <DropdownMenuItem
                    onClick={() => {
                        setOpen(false);
                    }}
                >
                    <Link to='settings'>Profile Settings</Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>
                    Logout
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
