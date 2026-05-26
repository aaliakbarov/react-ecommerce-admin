import { supabase } from '@/services/supabaseClient';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
    return twMerge(clsx(inputs));
}

export function aggregateRevenueByDay(orders) {
    const result = {};

    for (const order of orders) {
        const date = new Date(order.created_at).toISOString().split('T')[0]; // e.g. '2025-06-06'
        result[date] = (result[date] || 0) + order.amount;
    }

    // Convert to array
    return Object.entries(result).map(([date, total]) => ({
        date,
        revenue: Number((total * 0.7).toFixed(2)),
    }));
}

export const checkStatus = async (setDbStatus, setLatency) => {
    const start = performance.now();
    try {
        const { error } = await supabase.from('Orders').select('*').limit(1);
        const end = performance.now();
        if (error) throw error;
        setDbStatus({ label: 'Connected', color: 'text-green-600' });
        setLatency(`${Math.round(end - start)}ms`);
    } catch {
        setDbStatus({ label: 'Unavailable', color: 'text-red-600' });
        setLatency('–');
    }
};

// Helper to count orders per customer
export const getOrderCount = (customerId, ordersData) => {
    return ordersData.filter((order) => order.customer_id === customerId)
        .length;
};
