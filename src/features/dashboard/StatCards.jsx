import StatCard from './StatCard';

export default function StatCards({ orders }) {
    const totalSales =
        orders?.reduce((sum, order) => sum + (order.amount || 0), 0) || 0;
    const totalOrders = orders?.length || 0;
    const uniqueCustomers = orders
        ? new Set(orders.map((o) => o.customer_id)).size
        : 0;
    const estimatedCost = totalSales * 0.3; // assume 30% cost of goods
    const revenue = totalSales - estimatedCost;

    return (
        <>
            <StatCard title='Total Sales' value={totalSales} prefix='$' />
            <StatCard title='Orders' value={totalOrders} />
            <StatCard title='Customers' value={uniqueCustomers} />
            <StatCard title='Revenue' value={revenue} prefix='$' />
        </>
    );
}
