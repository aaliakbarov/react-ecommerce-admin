import { useQuery } from '@tanstack/react-query';

import ChartCard from '@/features/dashboard/ChartCard';
import RecentOrdersCard from '@/features/dashboard/RecentOrdersCard';
import SystemStatusCard from '@/features/dashboard/SystemStatusCard';

import { fetchOrders } from '@/services/apiOrders';

import { aggregateRevenueByDay } from '@/lib/utils';
import StatCards from '@/features/dashboard/StatCards';

export default function Dashboard() {
    const { data: orders, isLoading } = useQuery({
        queryKey: ['orders'],
        queryFn: fetchOrders,
    });
    const safeOrders = orders || [];

    const chartData = aggregateRevenueByDay(safeOrders);

    return (
        <div className='space-y-6'>
            <h1 className='text-2xl font-bold'>Dashboard</h1>

            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
                <StatCards orders={orders} />
            </div>

            <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
                <ChartCard data={chartData} isLoading={isLoading} />
                <SystemStatusCard />
            </div>

            <div className='mt-6'>
                <RecentOrdersCard />
            </div>
        </div>
    );
}
