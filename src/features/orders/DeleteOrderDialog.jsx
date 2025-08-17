import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

import { deleteOrder } from '@/services/apiOrders';

import { Trash2 } from 'lucide-react';

import { toast } from 'sonner';

export default function DeleteOrderConfirm({ orderId }) {
    const [open, setOpen] = useState(false);
    ////
    const queryClient = useQueryClient();
    ////
    const mutation = useMutation({
        mutationFn: () => deleteOrder(orderId),
        onSuccess: () => {
            toast.success('Order deleted');
            queryClient.invalidateQueries(['orders']);
            setOpen(false);
        },
        onError: (err) => {
            toast.error('Failed to delete: ' + err.message);
        },
    });

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button size='icon' variant='ghost'>
                    <Trash2 className='w-4 h-4 text-red-500' />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Delete Order</DialogTitle>
                </DialogHeader>
                <p className='text-sm text-muted-foreground mb-4'>
                    Are you sure you want to delete this order? This action
                    cannot be undone.
                </p>
                <div className='flex justify-end gap-2'>
                    <Button variant='outline' onClick={() => setOpen(false)}>
                        Cancel
                    </Button>
                    <Button
                        variant='destructive'
                        onClick={() => mutation.mutate()}
                        disabled={mutation.isLoading}
                    >
                        {mutation.isLoading ? 'Deleting...' : 'Delete'}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
