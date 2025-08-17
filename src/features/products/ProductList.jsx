import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import EditProductDialog from '@/features/products/EditProductDialog';
import DeleteProductDialog from '@/features/products/DeleteProductDialog';

import { fetchProducts } from '@/services/apiProducts';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

import { Loader2 } from 'lucide-react';
import Pagination from '@/components/ui/Pagination';

export function ProductList() {
    const {
        data: products,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ['products'],
        queryFn: fetchProducts,
    });
    ////
    const [page, setPage] = useState(1);

    const itemsPerPage = 10;
    const paginated = products?.slice(
        (page - 1) * itemsPerPage,
        page * itemsPerPage
    );
    const totalPages = products ? Math.ceil(products.length / itemsPerPage) : 1;
    const pagination = { page, totalPages, setPage };
    ////
    useEffect(() => {
        setPage(1);
    }, [products?.length]);

    return (
        <Card>
            <CardHeader>
                <CardTitle>All Products</CardTitle>
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
                {products && (
                    <table className='w-full text-sm text-left'>
                        <thead>
                            <tr className='border-b'>
                                <th className='py-2'>ID</th>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Stock</th>
                                <th>Status</th>
                                <th className='text-right'>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginated.map((product) => (
                                <tr key={product.id} className='border-b'>
                                    <td className='py-1 pr-1'>{product.id}</td>
                                    <td className='py-1'>{product.name}</td>
                                    <td className='py-1'>{product.price}</td>
                                    <td className='py-1'>{product.stock}</td>
                                    <td className='py-1'>
                                        <Badge
                                            variant={
                                                product.status === 'Active'
                                                    ? 'default'
                                                    : 'destructive'
                                            }
                                        >
                                            {product.status}
                                        </Badge>
                                    </td>
                                    <td className='py-1 text-right space-x-2'>
                                        <EditProductDialog product={product} />
                                        <DeleteProductDialog id={product.id} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
                {products?.length === 0 && (
                    <p className='text-center text-lg mt-3'>
                        Nothing is added to list yet..
                    </p>
                )}

                {products?.length > 0 && totalPages > 1 && (
                    <Pagination pagination={pagination} />
                )}
            </CardContent>
        </Card>
    );
}
