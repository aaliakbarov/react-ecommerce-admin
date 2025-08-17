import { useQuery } from '@tanstack/react-query';

import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';

import { fetchOrders } from '@/services/apiOrders';

import EditCustomerDialog from './EditCustomerDialog';
import DeleteCustomerDialog from './DeleteCustomerDialog';

export default function CustomerList({ paginated }) {
    const { data: ordersData = [] } = useQuery({
        queryKey: ['orders'],
        queryFn: fetchOrders,
    });
    // Helper to count orders per customer
    const getOrderCount = (customerId) => {
        return ordersData.filter((order) => order.customer_id === customerId)
            .length;
    };

    return (
        <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
            {paginated.length > 0 ? (
                paginated.map((c) => (
                    <Card
                        key={c.id}
                        className='p-4 hover:shadow-md transition-shadow space-y-3'
                    >
                        <div className='space-y-1'>
                            <div className='text-lg font-medium'>{c.name}</div>
                            <div className='text-sm text-muted-foreground'>
                                {c.email}
                            </div>
                            <div className='text-xs text-muted-foreground font-mono'>
                                ID: {c.id.slice(0, 8)}... | Joined:{' '}
                                {new Date(c.created_at).toLocaleDateString()}
                            </div>
                        </div>
                        <div className='flex items-center gap-4'>
                            <Badge
                                variant={
                                    c.status === 'active'
                                        ? 'default'
                                        : c.status === 'banned'
                                        ? 'destructive'
                                        : 'secondary'
                                }
                            >
                                {c.status?.charAt(0).toUpperCase() +
                                    c.status?.slice(1)}
                            </Badge>
                            <div className='text-sm text-muted-foreground'>
                                {getOrderCount(c.id)} orders
                            </div>
                            <EditCustomerDialog customer={c} />
                            <DeleteCustomerDialog id={c.id} />
                        </div>
                    </Card>
                ))
            ) : (
                <p className='text-muted-foreground text-center mt-8'>
                    No customers match your filters.
                </p>
            )}
        </div>
    );
}
