export default function useStats(orders) {
    const totalSales =
        orders?.reduce((sum, order) => sum + (order.amount || 0), 0) || 0;
    const totalOrders = orders?.length || 0;
    const uniqueCustomers = orders
        ? new Set(orders.map((o) => o.customer_id)).size
        : 0;
    const estimatedCost = totalSales * 0.3; // assume 30% cost of goods
    const revenue = totalSales - estimatedCost;

    return { totalSales, totalOrders, uniqueCustomers, estimatedCost, revenue };
}
