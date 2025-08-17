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

export default function AddOrderDialog() {
    const [open, setOpen] = useState(false);
    ////
    const queryClient = useQueryClient();
    ////
    const { data: customers = [] } = useQuery({
        queryKey: ['customers'],
        queryFn: fetchCustomers,
    });
    ////
    const { data: products = [] } = useQuery({
        queryKey: ['products'],
        queryFn: fetchProducts,
    });
    ////
    const {
        register,
        handleSubmit,
        watch,
        control,
        reset,
        formState: { errors },
    } = useForm({
        defaultValues: {
            customer_id: '',
            items: [{ product_id: '', qnt: 1 }],
        },
    });
    const watchedItems = watch('items');
    ////
    const { fields, append, remove } = useFieldArray({
        control,
        name: 'items',
    });
    ////
    const mutation = useMutation({
        mutationFn: (formData) => CreateOrder(formData, customers, products),
        onSuccess: () => {
            toast.success('Order added');
            queryClient.invalidateQueries(['orders']);
            setOpen(false);
            reset();
        },
        onError: (err) => {
            toast.error('Failed to add order: ' + err.message);
        },
    });
    ////
    const calcItemTotal = (item) => {
        if (!item.product_id) return 0; // guard empty or undefined
        const product = products.find(
            (p) => String(p.id) === String(item.product_id)
        );
        return product ? product.price * item.qnt : 0;
    };

    const total = watchedItems.reduce(
        (sum, item) => sum + calcItemTotal(item),
        0
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
                    onSubmit={handleSubmit((data) => {
                        mutation.mutate(data);
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
                                    {calcItemTotal(
                                        watchedItems[index] || {}
                                    ).toFixed(2)}
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
                        disabled={mutation.isLoading}
                        className='w-full'
                    >
                        {mutation.isLoading ? 'Submitting...' : 'Create Order'}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}
