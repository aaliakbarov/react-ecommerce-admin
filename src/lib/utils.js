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
