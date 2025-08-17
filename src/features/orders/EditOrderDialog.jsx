import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

import { updateOrder } from '@/services/apiOrders';

import { toast } from 'sonner';
import { Pencil } from 'lucide-react';

export default function EditOrderDialog({ order }) {
    const [open, setOpen] = useState(false);
    ////
    const queryClient = useQueryClient();
    ////
    const { register, handleSubmit } = useForm({
        defaultValues: {
            status: order.status,
        },
    });
    ////
    const mutation = useMutation({
        mutationFn: (updates) => updateOrder(order.id, updates),
        onSuccess: () => {
            toast.success('Order updated');
            queryClient.invalidateQueries(['orders']);
            setOpen(false);
        },
        onError: (err) => {
            toast.error('Failed to update: ' + err.message);
        },
    });

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button size='icon' variant='ghost'>
                    <Pencil className='w-4 h-4' />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Order</DialogTitle>
                </DialogHeader>

                <form
                    onSubmit={handleSubmit((data) => mutation.mutate(data))}
                    className='space-y-4'
                >
                    <div>
                        <Label>Status</Label>
                        <select
                            {...register('status')}
                            className='w-full border p-2 rounded-md'
                        >
                            <option value='pending'>Pending</option>
                            <option value='shipped'>Shipped</option>
                            <option value='cancelled'>Cancelled</option>
                        </select>
                    </div>

                    <Button
                        type='submit'
                        disabled={mutation.isLoading}
                        className='w-full'
                    >
                        {mutation.isLoading ? 'Saving...' : 'Update Order'}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}
