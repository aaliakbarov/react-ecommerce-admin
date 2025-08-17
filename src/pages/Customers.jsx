import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';

import { Input } from '@/components/ui/input';
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from '@/components/ui/select';
import Pagination from '@/components/ui/Pagination';

import CustomerList from '@/features/customers/CustomerList';

import { fetchCustomers } from '@/services/apiCustomers';

import { Loader2 } from 'lucide-react';

export default function Customers() {
    const {
        data: customersData,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ['customers'],
        queryFn: fetchCustomers,
    });

    const customers = customersData || [];

    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');

    const filtered = customers.filter((c) => {
        const matchSearch =
            c.name.toLowerCase().includes(search.toLowerCase()) ||
            c.email.toLowerCase().includes(search.toLowerCase()) ||
            c.id.toLowerCase().includes(search.toLowerCase());

        const matchStatus = statusFilter === 'all' || c.status === statusFilter;
        return matchSearch && matchStatus;
    });

    const [page, setPage] = useState(1);

    const itemsPerPage = 8;
    const totalPages = Math.ceil(filtered.length / itemsPerPage);
    const paginated = filtered.slice(
        (page - 1) * itemsPerPage,
        page * itemsPerPage
    );
    const pagination = { page, totalPages, setPage };

    useEffect(() => {
        setPage(1);
    }, [search, statusFilter]);

    return (
        <div className='space-y-6'>
            <div className='flex flex-wrap items-center justify-between gap-4'>
                <h1 className='text-2xl font-semibold'>Customers</h1>
            </div>

            <div className='flex flex-wrap gap-4 justify-between items-center'>
                <Input
                    placeholder='Search by name, email or id...'
                    className='max-w-sm'
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <Select onValueChange={setStatusFilter} defaultValue='all'>
                    <SelectTrigger className='w-[180px]'>
                        <SelectValue placeholder='Filter by status' />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value='all'>All</SelectItem>
                        <SelectItem value='active'>Active</SelectItem>
                        <SelectItem value='inactive'>Inactive</SelectItem>
                        <SelectItem value='banned'>Banned</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {isLoading && (
                <div className='flex justify-center items-center h-40'>
                    <Loader2 className='animate-spin h-6 w-6 text-muted-foreground' />
                </div>
            )}

            {isError && (
                <p className='text-red-500'>Failed to load customers.</p>
            )}

            {!isLoading && <CustomerList paginated={paginated} />}

            {filtered.length > 0 && totalPages > 1 && (
                <Pagination pagination={pagination} />
            )}
        </div>
    );
}
