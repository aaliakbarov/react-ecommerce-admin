import { toast } from 'sonner';
import { supabase } from './supabaseClient';

export async function getCurrentUserEmail(): Promise<string> {
    const { data, error } = await supabase.auth.getUser();
    if (error) throw error;
    return data?.user?.email || '';
}

export async function updateEmail(email: string) {
    const { error } = await supabase.auth.updateUser({ email });

    if (error) {
        toast.error('Email update failed.');
    }

    return;
}

export async function updatePassword(newPassword: string) {
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    if (error) {
        console.error('Password update error:', error.message);
        throw error;
    }
}
