import { supabase } from '@/services/supabaseClient';
import { useQuery } from '@tanstack/react-query';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { Loader2 } from 'lucide-react';

export default function RecentOrdersCard() {
    const {
        data: recentOrders = [],
        isLoading,
        isError,
    } = useQuery({
        queryKey: ['recentOrders'],
        queryFn: async () => {
            const { data, error } = await supabase
                .from('Orders')
                .select('id, customer_id, amount, status, created_at')
                .order('created_at', { ascending: false })
                .limit(5);

            if (error) throw error;
            return data;
        },
    });

    return (
        <Card>
            <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
            </CardHeader>
            <CardContent className='overflow-x-auto'>
                {isLoading && (
                    <div className='flex justify-center items-center h-40'>
                        <Loader2 className='animate-spin h-6 w-6 text-muted-foreground' />
                    </div>
                )}
                {isError && (
                    <p className='text-red-500'>Failed to load products.</p>
                )}
                <table className='w-full text-sm text-left'>
                    <thead>
                        <tr className='border-b'>
                            <th className='py-2'>Order</th>
                            <th>Customer</th>
                            <th>Amount</th>
                            <th>Status</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {recentOrders.map((order) => (
                            <tr key={order.id} className='border-b'>
                                <td className='py-2'>#{order.id.slice(-4)}</td>
                                <td className='font-mono text-xs py-2'>
                                    {order.customer_id.slice(0, 8)}...
                                </td>
                                <td className='py-2'>
                                    ${order.amount?.toFixed(2)}
                                </td>
                                <td className='py-2'>
                                    <Badge
                                        variant={
                                            order.status === 'shipped'
                                                ? 'default'
                                                : order.status === 'pending'
                                                ? 'secondary'
                                                : 'destructive'
                                        }
                                    >
                                        {order.status}
                                    </Badge>
                                </td>
                                <td className='py-2'>
                                    {new Date(
                                        order.created_at
                                    ).toLocaleDateString()}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </CardContent>
        </Card>
    );
}
