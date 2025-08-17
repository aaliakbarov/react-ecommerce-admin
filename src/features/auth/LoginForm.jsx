import { useForm } from 'react-hook-form';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export function LoginForm({ onSubmit }) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className='space-y-4 w-full flex flex-col items-center'
        >
            <div className='flex flex-col items-center w-full sm:w-[80%]'>
                <Input
                    type='email'
                    placeholder='Email'
                    {...register('email', {
                        required: 'Email is required',
                    })}
                    className='text-[15px] w-[70%]'
                />
                {errors.email && (
                    <p className='text-sm text-red-800 mt-1 text-center'>
                        {errors.email.message}
                    </p>
                )}
            </div>

            <div className='flex flex-col items-center w-full sm:w-[80%]'>
                <Input
                    type='password'
                    placeholder='Password'
                    {...register('password', {
                        required: 'Password is required',
                    })}
                    className='text-[15px] w-[70%]'
                />
                {errors.password && (
                    <p className='text-sm text-red-800 mt-1 text-center'>
                        {errors.password.message}
                    </p>
                )}
            </div>

            <Button type='submit' className='w-[30%] text-[15px] mt-1'>
                Login
            </Button>
        </form>
    );
}
