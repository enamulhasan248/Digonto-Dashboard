'use client';

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';
import type { DateRange } from '@/types';
import { useRoleColors } from '@/hooks/useTheme';
import { ChartDateFilter } from '@/components/ui/ChartDateFilter';

const baseData = [
    { month: 'Jan', revenue: 4000 },
    { month: 'Feb', revenue: 3000 },
    { month: 'Mar', revenue: 5000 },
    { month: 'Apr', revenue: 4500 },
    { month: 'May', revenue: 6000 },
    { month: 'Jun', revenue: 5500 },
    { month: 'Jul', revenue: 7000 },
    { month: 'Aug', revenue: 6500 },
    { month: 'Sep', revenue: 8000 },
    { month: 'Oct', revenue: 7500 },
    { month: 'Nov', revenue: 9000 },
    { month: 'Dec', revenue: 8500 },
];

const weeklyData = [
    { month: 'Mon', revenue: 820 },
    { month: 'Tue', revenue: 950 },
    { month: 'Wed', revenue: 1100 },
    { month: 'Thu', revenue: 780 },
    { month: 'Fri', revenue: 1250 },
    { month: 'Sat', revenue: 600 },
    { month: 'Sun', revenue: 420 },
];

const yearlyData = [
    { month: 'Jan', revenue: 48000 },
    { month: 'Feb', revenue: 36000 },
    { month: 'Mar', revenue: 60000 },
    { month: 'Apr', revenue: 54000 },
    { month: 'May', revenue: 72000 },
    { month: 'Jun', revenue: 66000 },
    { month: 'Jul', revenue: 84000 },
    { month: 'Aug', revenue: 78000 },
    { month: 'Sep', revenue: 96000 },
    { month: 'Oct', revenue: 90000 },
    { month: 'Nov', revenue: 108000 },
    { month: 'Dec', revenue: 102000 },
];

const dataMap: Record<DateRange, typeof baseData> = {
    '7d': weeklyData,
    '30d': baseData,
    '12m': yearlyData,
};

function RevenueChartInner() {
    const colors = useRoleColors();
    const [range, setRange] = useState<DateRange>('30d');
    const data = useMemo(() => dataMap[range], [range]);
    const gradientId = 'revenueGradient';

    return (
        <motion.div
            className="rounded-2xl border border-gray-200 dark:border-gray-700/50 bg-white dark:bg-gray-800/50 backdrop-blur-sm p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
        >
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-base font-semibold text-gray-900 dark:text-white">
                    Revenue Over Time
                </h3>
                <ChartDateFilter value={range} onChange={setRange} />
            </div>
            <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                        <defs>
                            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor={colors.primary} stopOpacity={0.3} />
                                <stop offset="100%" stopColor={colors.primary} stopOpacity={0} />
                            </linearGradient>
                        </defs>
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
                            tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
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
                            formatter={(value: unknown) => [`$${Number(value).toLocaleString()}`, 'Revenue']}
                        />
                        <Area
                            type="monotone"
                            dataKey="revenue"
                            stroke={colors.primary}
                            strokeWidth={2.5}
                            fill={`url(#${gradientId})`}
                            animationDuration={1500}
                            animationEasing="ease-out"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </motion.div>
    );
}

export const RevenueChart = React.memo(RevenueChartInner);
