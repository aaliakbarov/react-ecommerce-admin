import CountUp from 'react-countup';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { StatCardProps } from '@/types/uiProps';

export default function StatCard({
    title,
    value,
    prefix = '',
    suffix = '',
}: StatCardProps) {
    return (
        <Card>
            <CardHeader className='pb-2'>
                <CardTitle className='text-sm font-medium text-muted-foreground'>
                    {title}
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className='text-2xl font-semibold'>
                    <CountUp
                        end={value}
                        duration={1.5}
                        prefix={prefix}
                        suffix={suffix}
                        separator=','
                    />
                </div>
            </CardContent>
        </Card>
    );
}
