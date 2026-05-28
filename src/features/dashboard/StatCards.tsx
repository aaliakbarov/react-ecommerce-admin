import useStats from '@/hooks/useStats';
import StatCard from '../../components/ui/StatCard';
import type { Order } from '@/types/orders';

export default function StatCards({ orders }: { orders: Order[] }) {
    const { totalOrders, totalSales, uniqueCustomers, revenue } =
        useStats(orders);

    return (
        <>
            <StatCard title='Total Sales' value={totalSales} prefix='$' />
            <StatCard title='Orders' value={totalOrders} />
            <StatCard title='Customers' value={uniqueCustomers} />
            <StatCard title='Revenue' value={revenue} prefix='$' />
        </>
    );
}
