import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
} from 'recharts';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { Loader2 } from 'lucide-react';

export default function ChartCard({ data, isLoading }) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Revenue Trend (Daily)</CardTitle>
            </CardHeader>
            <CardContent className='h-[300px]'>
                {!isLoading && data.length > 0 ? (
                    <ResponsiveContainer width='100%' height={300}>
                        <LineChart data={data}>
                            <XAxis dataKey='date' />
                            <YAxis />
                            <Tooltip />
                            <Line
                                type='monotone'
                                dataKey='revenue'
                                stroke='#2563eb'
                                strokeWidth={2}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                ) : (
                    <div className='flex justify-center items-center h-40'>
                        <Loader2 className='animate-spin h-6 w-6 text-muted-foreground' />
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
