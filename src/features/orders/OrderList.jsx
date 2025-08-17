import { useQuery } from '@tanstack/react-query';

import EditOrderDialog from '@/features/orders/EditOrderDialog';
import DeleteOrderConfirm from '@/features/orders/DeleteOrderDialog';

import { fetchProducts } from '@/services/apiProducts';

import { Badge } from '@/components/ui/badge';

export function OrderList({ paginated }) {
    const { data: products = [] } = useQuery({
        queryKey: ['products'],
        queryFn: fetchProducts,
    });

    return (
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            {paginated.length > 0 ? (
                paginated.map((order) => (
                    <div
                        key={order.id}
                        className='rounded-lg border bg-white p-4 shadow-sm hover:bg-muted/40 transition'
                    >
                        <div className='flex flex-col sm:flex-row sm:justify-between sm:items-center'>
                            <div>
                                <div className='font-medium text-base'>
                                    {order.order_number}
                                </div>
                                <p className='text-sm text-muted-foreground'>
                                    Customer ID:{' '}
                                    <span className='font-mono'>
                                        {order.customer_id.slice(0, 12)}
                                        ...
                                    </span>
                                </p>
                                <p className='text-xs text-muted-foreground font-mono'>
                                    Created:{' '}
                                    {new Date(
                                        order.created_at
                                    ).toLocaleDateString()}
                                </p>
                            </div>
                            <div className='flex items-center gap-4 mt-2 sm:mt-0'>
                                <Badge
                                    variant={
                                        order.status === 'pending'
                                            ? 'secondary'
                                            : order.status === 'shipped'
                                            ? 'default'
                                            : 'destructive'
                                    }
                                >
                                    {order.status}
                                </Badge>
                                <EditOrderDialog order={order} />
                                <DeleteOrderConfirm orderId={order.id} />
                            </div>
                        </div>

                        {Array.isArray(order.items) &&
                        order.items.length > 0 ? (
                            <div className='bg-muted/10 p-4 rounded-md'>
                                <p className='text-lg font-semibold mb-2 text-center'>
                                    Order Receipt
                                </p>
                                <ul className='text-xs text-muted-foreground space-y-1'>
                                    {order.items.map((item, idx) => {
                                        const product = products.find(
                                            (p) => p.id === item.product_id
                                        );
                                        if (!product) return null;
                                        const itemTotal =
                                            product.price * item.qnt;
                                        return (
                                            <li
                                                key={idx}
                                                className='flex justify-between py-1'
                                            >
                                                <span>
                                                    {product.name} × {item.qnt}
                                                </span>
                                                <span className='font-mono'>
                                                    ${itemTotal.toFixed(2)}
                                                </span>
                                            </li>
                                        );
                                    })}
                                </ul>
                                <div className='flex justify-between font-semibold text-sm pt-2 mt-2 border-t'>
                                    <span className='text-muted-foreground'>
                                        Total
                                    </span>
                                    <span className='text-lg font-bold'>
                                        ${order.amount.toFixed(2)}
                                    </span>
                                </div>
                            </div>
                        ) : (
                            <p className='text-sm italic text-muted-foreground'>
                                No items in this order.
                            </p>
                        )}
                    </div>
                ))
            ) : (
                <p className='text-muted-foreground text-center text-xl py-8'>
                    ...
                </p>
            )}
        </div>
    );
}
