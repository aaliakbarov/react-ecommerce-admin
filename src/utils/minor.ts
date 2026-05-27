import { supabase } from '@/services/supabaseClient';
import type { CreateOrderForm } from '@/types/orders';
import type { Product } from '@/types/products';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Utility to combine class names with Tailwind merging

export function cn(...inputs) {
    return twMerge(clsx(inputs));
}

// Aggregate revenue by day for charting

export function aggregateRevenueByDay(orders) {
    const result = {};

    for (const order of orders) {
        const date = new Date(order.created_at).toISOString().split('T')[0]; // e.g. '2025-06-06'
        result[date] = (result[date] || 0) + order.amount;
    }

    // Convert to array
    return Object.entries(result).map(([date, total]: [string, number]) => ({
        // I HOPE SO
        date,
        revenue: Number((total * 0.7).toFixed(2)),
    }));
}

// Check database connectivity and measure latency

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

// Calculate total amount for an order creation

export const calcItemTotal = (
    item: CreateOrderForm['items'][number],
    products?: Product[],
) => {
    if (!item.product_id) return 0; // guard empty or undefined
    const product = products.find(
        (p) => String(p.id) === String(item.product_id),
    );
    return product ? product.price * item.qnt : 0;
};
