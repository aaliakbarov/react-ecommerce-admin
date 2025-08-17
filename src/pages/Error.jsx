import { Ghost } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export default function NotFoundPage() {
    return (
        <div className='min-h-screen flex flex-col items-center justify-center px-6 py-10 bg-background text-foreground text-center'>
            <div className='flex flex-col items-center max-w-md space-y-4'>
                <div className='flex justify-center'>
                    <Ghost className='h-16 w-16 text-muted-foreground animate-bounce' />
                </div>
                {/* <h1 className='text-6xl font-bold tracking-tight'>404</h1> */}
                <p className='text-xl text-muted-foreground'>
                    Oops, the page you're looking for doesn't exist.
                </p>
                <p className='text-sm text-muted-foreground'>
                    You might have mistyped the address or the page has been
                    moved.
                </p>
                <Button asChild className='mt-4'>
                    <Link to='/'>Return to Dashboard</Link>
                </Button>
            </div>
        </div>
    );
}
