'use client';

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';
import type { DateRange } from '@/types';
import { useRoleColors } from '@/hooks/useTheme';
import { ChartDateFilter } from '@/components/ui/ChartDateFilter';

const weeklyData = [
    { month: 'Mon', enrollments: 18 },
    { month: 'Tue', enrollments: 24 },
    { month: 'Wed', enrollments: 32 },
    { month: 'Thu', enrollments: 20 },
    { month: 'Fri', enrollments: 28 },
    { month: 'Sat', enrollments: 12 },
    { month: 'Sun', enrollments: 8 },
];

const monthlyData = [
    { month: 'Jan', enrollments: 120 },
    { month: 'Feb', enrollments: 150 },
    { month: 'Mar', enrollments: 180 },
    { month: 'Apr', enrollments: 160 },
    { month: 'May', enrollments: 200 },
    { month: 'Jun', enrollments: 220 },
    { month: 'Jul', enrollments: 190 },
    { month: 'Aug', enrollments: 250 },
    { month: 'Sep', enrollments: 280 },
    { month: 'Oct', enrollments: 260 },
    { month: 'Nov', enrollments: 300 },
    { month: 'Dec', enrollments: 320 },
];

const yearlyData = [
    { month: 'Jan', enrollments: 1440 },
    { month: 'Feb', enrollments: 1800 },
    { month: 'Mar', enrollments: 2160 },
    { month: 'Apr', enrollments: 1920 },
    { month: 'May', enrollments: 2400 },
    { month: 'Jun', enrollments: 2640 },
    { month: 'Jul', enrollments: 2280 },
    { month: 'Aug', enrollments: 3000 },
    { month: 'Sep', enrollments: 3360 },
    { month: 'Oct', enrollments: 3120 },
    { month: 'Nov', enrollments: 3600 },
    { month: 'Dec', enrollments: 3840 },
];

const dataMap: Record<DateRange, typeof monthlyData> = {
    '7d': weeklyData,
    '30d': monthlyData,
    '12m': yearlyData,
};

function EnrollmentsChartInner() {
    const colors = useRoleColors();
    const [range, setRange] = useState<DateRange>('30d');
    const data = useMemo(() => dataMap[range], [range]);

    return (
        <motion.div
            className="rounded-2xl border border-gray-200 dark:border-gray-700/50 bg-white dark:bg-gray-800/50 backdrop-blur-sm p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
        >
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-base font-semibold text-gray-900 dark:text-white">
                    Monthly Enrollments
                </h3>
                <ChartDateFilter value={range} onChange={setRange} />
            </div>
            <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                        <CartesianGrid
                            strokeDasharray="3 3"
                            stroke="currentColor"
                            className="text-gray-200 dark:text-gray-700"
                            vertical={false}
                        />
                        <XAxis
                            dataKey="month"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fontSize: 12 }}
                            className="text-gray-500"
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fontSize: 12 }}
                            className="text-gray-500"
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: 'rgba(17, 24, 39, 0.95)',
                                border: 'none',
                                borderRadius: '12px',
                                padding: '10px 14px',
                                boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
                            }}
                            labelStyle={{ color: '#9ca3af', fontSize: 12, marginBottom: 4 }}
                            itemStyle={{ color: '#fff', fontSize: 13, fontWeight: 500 }}
                            formatter={(value: unknown) => [Number(value), 'Enrollments']}
                            cursor={{ fill: 'rgba(107, 114, 128, 0.1)' }}
                        />
                        <Bar
                            dataKey="enrollments"
                            fill={colors.primaryLight}
                            radius={[8, 8, 0, 0]}
                            animationDuration={1500}
                            animationEasing="ease-out"
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </motion.div>
    );
}

export const EnrollmentsChart = React.memo(EnrollmentsChartInner);
