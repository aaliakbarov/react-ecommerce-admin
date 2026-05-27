import { supabase } from '@/services/supabaseClient';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import {
    updateEmail,
    updatePassword,
    getCurrentUserEmail,
} from '@/services/apiSettings';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

import { Eye, EyeOff } from 'lucide-react';

const schema = z
    .object({
        email: z
            .string()
            .transform((val) => (val === '' ? undefined : val))
            .optional()
            .refine((val) => !val || /\S+@\S+\.\S+/.test(val), {
                message: 'Invalid email',
            }),
        newPassword: z
            .string()
            .transform((val) => (val === '' ? undefined : val))
            .optional()
            .refine((val) => !val || val.length >= 6, {
                message: 'Password must be at least 6 characters',
            }),
    })
    .refine((data) => data.email || data.newPassword, {
        message: 'Please update at least one field',
    });

export default function ProfileSettings() {
    // Form field states and definitions
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [pendingEmail, setPendingEmail] = useState(null);
    const [currentEmail, setCurrentEmail] = useState('');
    const {
        register,
        handleSubmit,
        resetField,
        setValue,
        watch,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(schema),
        defaultValues: {
            email: '',
            newPassword: '',
        },
    });
    const watchedEmail = watch('email');
    const watchedPassword = watch('newPassword');
    const hasChanges =
        (watchedEmail && watchedEmail !== currentEmail) ||
        (watchedPassword && watchedPassword.length > 0);

    // Load email on mount
    useEffect(() => {
        const loadEmail = async () => {
            const storedPending = localStorage.getItem('pendingEmail');

            try {
                const email = await getCurrentUserEmail();
                setValue('email', email);
                setCurrentEmail(email);

                if (storedPending && email === storedPending) {
                    setPendingEmail(null);
                    localStorage.removeItem('pendingEmail');
                } else if (storedPending) {
                    setPendingEmail(storedPending);
                }
            } catch {
                toast.error('Failed to load email');
            }
        };

        loadEmail();
    }, [setValue]);

    // Reasonable submit handler
    const onSubmit = async (data) => {
        setLoading(true);

        try {
            const user = await supabase.auth.getUser();
            const confirmedEmail = user?.data?.user?.email;

            const emailChanged = data.email && data.email !== confirmedEmail;
            const passwordSet = data.newPassword && data.newPassword.length > 0;

            // Prevent both updates at once
            if (emailChanged && passwordSet) {
                toast.error('Please update email and password separately.');
                resetField('newPassword');
                setLoading(false);
                return;
            }

            if (emailChanged) {
                if (pendingEmail === data.email) {
                    toast.error(
                        'A confirmation email was already sent to this address.'
                    );
                } else {
                    await updateEmail(data.email);
                    setPendingEmail(data.email);
                    localStorage.setItem('pendingEmail', data.email);
                    toast.success('Confirmation link sent to new email.');
                    const refreshedEmail = await getCurrentUserEmail();
                    setValue('email', refreshedEmail);
                }
            }

            if (passwordSet) {
                await updatePassword(data.newPassword);
                toast.success('Password updated successfully.');
                resetField('newPassword');
            }
        } catch (err) {
            toast.error(`Update failed, ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle className='text-lg'>Profile Settings</CardTitle>
                {errors?.root?.message && (
                    <p className='text-xs text-yellow-600'>
                        {errors.root.message}
                    </p>
                )}
            </CardHeader>
            <CardContent>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className='flex flex-col space-y-6'
                >
                    {/* Email Field */}
                    <div className='flex flex-col space-y-2'>
                        <Label htmlFor='email'>Email</Label>
                        <Input
                            id='email'
                            {...register('email')}
                            onChange={(e) =>
                                setValue(
                                    'email',
                                    e.target.value.replace(/\s/g, '')
                                )
                            }
                            disabled={!!pendingEmail}
                        />
                        {pendingEmail && (
                            <div className='flex items-center gap-2 text-sm text-yellow-600 mt-1'>
                                <span>
                                    Confirmation pending:{' '}
                                    <span className='font-medium'>
                                        {pendingEmail}
                                    </span>
                                </span>
                                <Button
                                    variant='ghost'
                                    size='sm'
                                    className='text-xs text-muted-foreground'
                                    onClick={async () => {
                                        setPendingEmail(null);
                                        localStorage.removeItem('pendingEmail');
                                        const email =
                                            await getCurrentUserEmail();
                                        setValue('email', email);
                                    }}
                                >
                                    Cancel
                                </Button>
                            </div>
                        )}
                        {errors.email && (
                            <p className='text-xs text-red-500 mt-1'>
                                {errors.email.message}
                            </p>
                        )}
                    </div>

                    {/* New Password Field */}
                    <div className='flex flex-col space-y-2'>
                        <Label htmlFor='newPassword'>New Password</Label>
                        <div className='relative'>
                            <Input
                                id='newPassword'
                                type={showPassword ? 'text' : 'password'}
                                {...register('newPassword')}
                                className='pr-10'
                                onChange={(e) =>
                                    setValue(
                                        'newPassword',
                                        e.target.value.replace(/\s/g, '')
                                    )
                                }
                            />
                            <Button
                                type='button'
                                variant='ghost'
                                size='icon'
                                onClick={() => setShowPassword((prev) => !prev)}
                                className='absolute right-2 top-1/2 -translate-y-1/2 h-5 w-5 p-0 text-muted-foreground'
                                tabIndex={-1}
                            >
                                {showPassword ? (
                                    <EyeOff className='h-4 w-4' />
                                ) : (
                                    <Eye className='h-4 w-4' />
                                )}
                            </Button>
                        </div>
                        {errors.newPassword && (
                            <p className='text-xs text-red-500 mt-1'>
                                {errors.newPassword.message}
                            </p>
                        )}
                    </div>

                    {/* Action Button */}
                    <div className='flex flex-col space-y-4'>
                        <div className='flex justify-end'>
                            <Button
                                type='submit'
                                disabled={loading || !hasChanges}
                            >
                                {loading ? 'Saving...' : 'Save Changes'}
                            </Button>
                        </div>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}
