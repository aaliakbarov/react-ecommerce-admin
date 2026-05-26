import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

import { deleteCustomer } from '@/services/apiCustomers';

import { Trash2 } from 'lucide-react';

import { toast } from 'sonner';

import type { Customer } from '@/types/customers';

export default function DeleteCustomerDialog({ id }: { id: Customer['id'] }) {
    const [open, setOpen] = useState(false);
    ////
    const queryClient = useQueryClient();
    ////
    const mutation = useMutation({
        mutationFn: deleteCustomer,
        onSuccess: () => {
            toast.success('Customer deleted');
            queryClient.invalidateQueries({ queryKey: ['customers'] });
            setOpen(false);
        },
        onError: (err) => toast.error('Delete failed: ' + err.message),
    });

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant='ghost' size='icon'>
                    <Trash2 className='w-4 h-4 text-red-500' />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Confirm deletion</DialogTitle>
                </DialogHeader>
                <p className='text-sm text-muted-foreground mb-4'>
                    This will permanently delete the customer.
                </p>
                <DialogFooter>
                    <Button variant='ghost' onClick={() => setOpen(false)}>
                        Cancel
                    </Button>
                    <Button
                        variant='destructive'
                        onClick={() => mutation.mutate(id)}
                        disabled={mutation.isPending}
                    >
                        {mutation.isPending ? 'Deleting...' : 'Delete'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
