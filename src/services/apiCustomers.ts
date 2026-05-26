import type { Customer, UpdateCustomer } from '@/types/customers';
import { supabase } from './supabaseClient';

export const fetchCustomers = async (): Promise<Customer[]> => {
    const { data, error } = await supabase
        .from('Customers')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
};

export const updateCustomer = async ({
    id,
    updates,
}: {
    id: Customer['id'];
    updates: UpdateCustomer;
}) => {
    const { error } = await supabase
        .from('Customers')
        .update(updates)
        .eq('id', id);
    if (error) throw error;
};

export const deleteCustomer = async (id: Customer['id']) => {
    const { error } = await supabase.from('Customers').delete().eq('id', id);
    if (error) throw error;
};
