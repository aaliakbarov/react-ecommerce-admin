import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

import { updateProduct } from '@/services/apiProducts';

import { Pencil } from 'lucide-react';

import { toast } from 'sonner';

const formSchema = z.object({
    name: z.string().min(2),
    price: z.coerce.number().min(0),
    stock: z.coerce.number().min(0),
    status: z.enum(['Active', 'Discontinued']),
});

export default function EditProductDialog({ product }) {
    const [open, setOpen] = useState(false);
    ////
    const queryClient = useQueryClient();
    ////
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: product.name,
            price: product.price,
            stock: product.stock,
            status: product.status,
        },
    });
    ////
    const mutation = useMutation({
        mutationFn: (data) => updateProduct({ id: product.id, data }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['products'] });
            toast.success('Product updated!');
            setOpen(false);
        },
        onError: (err) => {
            toast.error('Update failed: ' + err.message);
        },
    });

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button size='icon' variant='outline'>
                    <Pencil className='w-4 h-4' />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Product</DialogTitle>
                </DialogHeader>

                <form
                    onSubmit={handleSubmit((data) => mutation.mutate(data))}
                    className='space-y-4'
                >
                    <div>
                        <Label>Name</Label>
                        <Input {...register('name')} />
                        {errors.name && (
                            <p className='text-sm text-red-600'>
                                {errors.name.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <Label>Price</Label>
                        <Input
                            type='number'
                            step='0.01'
                            {...register('price')}
                        />
                        {errors.price && (
                            <p className='text-sm text-red-600'>
                                {errors.price.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <Label>Stock</Label>
                        <Input type='number' {...register('stock')} />
                        {errors.stock && (
                            <p className='text-sm text-red-600'>
                                {errors.stock.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <Label>Status</Label>
                        <select
                            {...register('status')}
                            className='w-full mt-1 border rounded-md p-2 text-sm'
                        >
                            <option value='Active'>Active</option>
                            <option value='Discontinued'>Discontinued</option>
                        </select>
                        {errors.status && (
                            <p className='text-sm text-red-600'>
                                {errors.status.message}
                            </p>
                        )}
                    </div>

                    <Button type='submit' className='w-full'>
                        Save Changes
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}
