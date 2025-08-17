import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';

import AddOrderDialog from '@/features/orders/AddOrderDialog';
import { OrderList } from '@/features/orders/OrderList';

import { fetchOrders } from '@/services/apiOrders';

import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

import { Loader2 } from 'lucide-react';
import Pagination from '@/components/ui/Pagination';

export default function Orders() {
    const { data, isLoading, isError } = useQuery({
        queryKey: ['orders'],
        queryFn: fetchOrders,
    });

    const orders = data || [];

    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');

    const filtered = orders.filter((order) => {
        const matchSearch = order.order_number
            .toLowerCase()
            .includes(search.toLowerCase());
        const matchStatus =
            statusFilter === 'all' || order.status === statusFilter;
        return matchSearch && matchStatus;
    });

    const [page, setPage] = useState(1);

    const itemsPerPage = 6;
    const paginated = filtered.slice(
        (page - 1) * itemsPerPage,
        page * itemsPerPage
    );
    const totalPages = Math.ceil(filtered.length / itemsPerPage);
    const pagination = { page, totalPages, setPage };

    useEffect(() => {
        setPage(1);
    }, [search]);

    return (
        <div className='space-y-6'>
            <div className='flex flex-wrap items-center justify-between gap-4'>
                <h1 className='text-2xl font-semibold'>Orders</h1>
                <div className='flex gap-3'>
                    <Input
                        placeholder='Search by order number...'
                        className='max-w-sm'
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <Select onValueChange={setStatusFilter} defaultValue='all'>
                        <SelectTrigger className='w-[140px]'>
                            <SelectValue placeholder='Status' />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value='all'>All</SelectItem>
                            <SelectItem value='pending'>Pending</SelectItem>
                            <SelectItem value='shipped'>Shipped</SelectItem>
                            <SelectItem value='cancelled'>Cancelled</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <AddOrderDialog />
            </div>

            {isLoading && (
                <div className='flex justify-center items-center h-40'>
                    <Loader2 className='animate-spin h-6 w-6 text-muted-foreground' />
                </div>
            )}

            {isError && (
                <p className='text-red-500 text-center'>
                    Failed to load orders.
                </p>
            )}

            {!isLoading && <OrderList paginated={paginated} />}

            {filtered.length > 0 && totalPages > 1 && (
                <Pagination pagination={pagination} />
            )}
        </div>
    );
}
