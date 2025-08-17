import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

import { updateCustomer } from '@/services/apiCustomers';

import { toast } from 'sonner';

const formSchema = z.object({
    name: z.string().min(2, 'Name is too short'),
    email: z.string().email('Invalid email'),
    status: z.enum(['active', 'inactive', 'banned']),
});

export default function EditCustomerDialog({ customer }) {
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
            name: customer.name,
            email: customer.email,
            status: customer.status || 'active',
        },
    });
    ////
    const mutation = useMutation({
        mutationFn: (data) =>
            updateCustomer({ id: customer.id, updates: data }),
        onSuccess: () => {
            toast.success('Customer updated successfully');
            queryClient.invalidateQueries(['customers']);
            setOpen(false);
        },
        onError: (err) => {
            toast.error('Failed to update: ' + err.message);
        },
    });

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button size='sm' variant='outline'>
                    Edit
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Customer</DialogTitle>
                </DialogHeader>
                <form
                    onSubmit={handleSubmit((data) => mutation.mutate(data))}
                    className='space-y-4'
                >
                    <div>
                        <Label>Name</Label>
                        <Input {...register('name')} />
                        {errors.name && (
                            <p className='text-sm text-red-500'>
                                {errors.name.message}
                            </p>
                        )}
                    </div>
                    <div>
                        <Label>Email</Label>
                        <Input {...register('email')} />
                        {errors.email && (
                            <p className='text-sm text-red-500'>
                                {errors.email.message}
                            </p>
                        )}
                    </div>
                    <div>
                        <Label>Status</Label>
                        <select
                            {...register('status')}
                            className='w-full border rounded-md p-2 text-sm'
                        >
                            <option value='active'>Active</option>
                            <option value='inactive'>Inactive</option>
                            <option value='banned'>Banned</option>
                        </select>
                        {errors.status && (
                            <p className='text-sm text-red-500'>
                                {errors.status.message}
                            </p>
                        )}
                    </div>

                    <Button
                        type='submit'
                        className='w-full'
                        disabled={mutation.isLoading}
                    >
                        {mutation.isLoading ? (
                            <span className='flex items-center gap-2 justify-center'>
                                <Loader2 className='w-4 h-4 animate-spin' />
                                Saving...
                            </span>
                        ) : (
                            'Save Changes'
                        )}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}
