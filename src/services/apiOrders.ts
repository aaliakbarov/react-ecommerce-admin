import type {
    Order,
    CreateOrderPayload,
    RecentOrder,
    UpdateOrder,
} from '@/types/orders';
import { supabase } from './supabaseClient';

export const fetchOrders = async (): Promise<Order[]> => {
    const { data, error } = await supabase
        .from('Orders')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
};

export const fetchRecentOrders = async (): Promise<RecentOrder[]> => {
    const { data, error } = await supabase
        .from('Orders')
        .select('id, customer_id, amount, status, created_at')
        .order('created_at', { ascending: false })
        .limit(5);

    if (error) throw error;
    return data;
};

export async function CreateOrder(payload: CreateOrderPayload) {
    const { error } = await supabase.from('Orders').insert([payload]);
    if (error) throw error;
}

export const updateOrder = async ({
    id,
    updates,
}: {
    id: Order['id'];
    updates: UpdateOrder;
}) => {
    const { error } = await supabase
        .from('Orders')
        .update(updates)
        .eq('id', id);

    if (error) throw error;
};

export const deleteOrder = async (id: Order['id']) => {
    const { error } = await supabase.from('Orders').delete().eq('id', id);

    if (error) throw error;
};
