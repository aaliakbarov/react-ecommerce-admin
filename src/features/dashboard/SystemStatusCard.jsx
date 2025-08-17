import { useEffect, useState } from 'react';

import { useUserUptime } from '@/hooks/useUserUptime';

import { supabase } from '@/services/supabaseClient';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { CircleCheck, Clock, Database, Wifi } from 'lucide-react';

export default function SystemStatusCard() {
    const [dbStatus, setDbStatus] = useState({
        label: 'Checking...',
        color: 'text-yellow-500',
    });
    const [latency, setLatency] = useState(null);

    const version = import.meta.env.VITE_APP_VERSION || 'Unknown';
    ////
    useEffect(() => {
        const checkStatus = async () => {
            const start = performance.now();
            try {
                const { error } = await supabase
                    .from('Orders')
                    .select('*')
                    .limit(1);
                const end = performance.now();
                if (error) throw error;
                setDbStatus({ label: 'Connected', color: 'text-green-600' });
                setLatency(`${Math.round(end - start)}ms`);
            } catch {
                setDbStatus({ label: 'Unavailable', color: 'text-red-600' });
                setLatency('–');
            }
        };

        checkStatus();
    }, []);
    ////
    const uptime = useUserUptime();

    return (
        <Card className='flex flex-col justify-center h-full'>
            <CardHeader>
                <CardTitle className='text-center text-2xl'>
                    System Status
                </CardTitle>
            </CardHeader>
            <CardContent className='space-y-4 text-sm'>
                <div className='flex items-center gap-3'>
                    <Database className={`w-5 h-5 ${dbStatus.color}`} />
                    <span className='font-medium'>Database:</span>
                    <span className='ml-auto'>{dbStatus.label}</span>
                </div>

                <div className='flex items-center gap-3'>
                    <Wifi className='w-5 h-5 text-blue-500' />
                    <span className='font-medium'>API Latency:</span>
                    <span className='ml-auto'>{latency || '...'}</span>
                </div>

                <div className='flex items-center gap-3'>
                    <Clock className='w-5 h-5 text-yellow-500' />
                    <span className='font-medium'>Uptime:</span>
                    <span className='ml-auto'>
                        {uptime || 'Loading uptime..'}
                    </span>
                </div>

                <div className='flex items-center gap-3'>
                    <CircleCheck className='w-5 h-5 text-muted-foreground' />
                    <span className='font-medium'>App Version:</span>
                    <span className='ml-auto'>v{version}</span>
                </div>
            </CardContent>
        </Card>
    );
}
