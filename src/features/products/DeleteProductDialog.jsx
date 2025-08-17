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

import { deleteProduct } from '@/services/apiProducts';

import { toast } from 'sonner';

import { Trash2 } from 'lucide-react';

export default function DeleteProductDialog({ id }) {
    const [open, setOpen] = useState(false);
    ////
    const queryClient = useQueryClient();
    ////
    const mutation = useMutation({
        mutationFn: () => deleteProduct(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['products'] });
            toast.success('Product deleted');
            setOpen(false);
        },
        onError: (err) => {
            toast.error('Delete failed: ' + err.message);
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
                    <DialogTitle>Confirm deletion?</DialogTitle>
                </DialogHeader>
                <p>This product will be permanently deleted.</p>
                <DialogFooter>
                    <Button variant='ghost' onClick={() => setOpen(false)}>
                        Cancel
                    </Button>
                    <Button
                        variant='destructive'
                        onClick={() => mutation.mutate()}
                        disabled={mutation.isLoading}
                    >
                        Delete
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
