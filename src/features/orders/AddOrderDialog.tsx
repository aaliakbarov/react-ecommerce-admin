import { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { fetchCustomers } from '@/services/apiCustomers';
import { fetchProducts } from '@/services/apiProducts';
import { CreateOrder } from '@/services/apiOrders';

import { Plus, Trash2 } from 'lucide-react';

import { toast } from 'sonner';

import type { CreateOrderForm } from '@/types/orders';
import { calcItemTotal } from '@/utils/minor';
import buildOrderPayload from '@/utils/buildOrderPayload';

export default function AddOrderDialog() {
    const [open, setOpen] = useState(false);
    const queryClient = useQueryClient();
    //// fetch customers for the select dropdown
    const { data: customers = [] } = useQuery({
        queryKey: ['customers'],
        queryFn: fetchCustomers,
    });
    //// fetch products for the select dropdown and price calculation
    const { data: products = [] } = useQuery({
        queryKey: ['products'],
        queryFn: fetchProducts,
    });
    //// form setup
    const {
        register,
        handleSubmit,
        watch,
        control,
        reset,
        formState: { errors },
    } = useForm<CreateOrderForm>({
        defaultValues: {
            customer_id: '',
            items: [{ product_id: '', qnt: 1 }],
        },
    });
    const watchedItems = watch('items');
    const { fields, append, remove } = useFieldArray({
        control,
        name: 'items',
    });
    //// mutation for creating order
    const mutation = useMutation({
        mutationFn: CreateOrder,
        onSuccess: () => {
            toast.success('Order added');
            queryClient.invalidateQueries({ queryKey: ['orders'] });
            setOpen(false);
            reset();
        },
        onError: (err) => {
            toast.error('Failed to add order: ' + err.message);
        },
    });
    //// calculate total amount based on watched items and products
    const total = watchedItems.reduce(
        (sum, item) => sum + calcItemTotal(item, products),
        0,
    );

    if (!products.length) return <div>Loading products...</div>;

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button size='sm'>+ New Order</Button>
            </DialogTrigger>
            <DialogContent className='max-w-2xl'>
                <DialogHeader>
                    <DialogTitle>Create New Order</DialogTitle>
                </DialogHeader>

                <form
                    onSubmit={handleSubmit((data: CreateOrderForm) => {
                        const payload = buildOrderPayload(
                            data,
                            customers,
                            products,
                        );
                        mutation.mutate(payload);
                    })}
                    className='space-y-6'
                >
                    <div>
                        <Label>Customer</Label>
                        <select
                            {...register('customer_id')}
                            className='w-full border p-2 rounded-md'
                        >
                            <option value=''>Select customer</option>
                            {customers.map((c) => (
                                <option key={c.id} value={c.id}>
                                    {c.name}
                                </option>
                            ))}
                        </select>
                        {errors.customer_id && (
                            <p className='text-sm text-red-500'>Required</p>
                        )}
                    </div>

                    <div className='space-y-4'>
                        <Label>Products</Label>
                        {fields.map((field, index) => (
                            <div
                                key={field.id}
                                className='flex items-center gap-2 border p-2 rounded-md'
                            >
                                <select
                                    {...register(`items.${index}.product_id`)}
                                    className='flex-1 border p-2 rounded-md'
                                >
                                    <option value=''>Select product</option>
                                    {products.map((p) => (
                                        <option key={p.id} value={p.id}>
                                            {p.name}
                                        </option>
                                    ))}
                                </select>
                                <Input
                                    type='number'
                                    min='1'
                                    className='w-20'
                                    {...register(`items.${index}.qnt`, {
                                        valueAsNumber: true,
                                    })}
                                />

                                <span className='w-20 text-right font-mono'>
                                    $
                                    {watchedItems[index]
                                        ? calcItemTotal(
                                              watchedItems[index],
                                              products,
                                          ).toFixed(2)
                                        : '0.00'}
                                </span>
                                <Button
                                    size='icon'
                                    type='button'
                                    variant='ghost'
                                    onClick={() => remove(index)}
                                >
                                    <Trash2 className='w-4 h-4 text-red-500' />
                                </Button>
                            </div>
                        ))}
                        <Button
                            type='button'
                            variant='outline'
                            onClick={() => append({ product_id: '', qnt: 1 })}
                            size='sm'
                        >
                            <Plus className='w-4 h-4 mr-1' /> Add Product
                        </Button>
                    </div>

                    <div className='text-sm text-muted-foreground flex justify-between'>
                        <span>Total:</span>
                        <span className='text-foreground font-medium'>
                            ${total.toFixed(2)}
                        </span>
                    </div>

                    <Button
                        type='submit'
                        disabled={mutation.isPending}
                        className='w-full'
                    >
                        {mutation.isPending ? 'Submitting...' : 'Create Order'}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}
