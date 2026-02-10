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
    { month: 'Mon', orders: 5 },
    { month: 'Tue', orders: 8 },
    { month: 'Wed', orders: 12 },
    { month: 'Thu', orders: 6 },
    { month: 'Fri', orders: 14 },
    { month: 'Sat', orders: 4 },
    { month: 'Sun', orders: 3 },
];

const monthlyData = [
    { month: 'Jan', orders: 30 },
    { month: 'Feb', orders: 25 },
    { month: 'Mar', orders: 35 },
    { month: 'Apr', orders: 28 },
    { month: 'May', orders: 40 },
    { month: 'Jun', orders: 32 },
    { month: 'Jul', orders: 45 },
    { month: 'Aug', orders: 38 },
    { month: 'Sep', orders: 50 },
    { month: 'Oct', orders: 42 },
    { month: 'Nov', orders: 55 },
    { month: 'Dec', orders: 48 },
];

const yearlyData = [
    { month: 'Jan', orders: 360 },
    { month: 'Feb', orders: 300 },
    { month: 'Mar', orders: 420 },
    { month: 'Apr', orders: 336 },
    { month: 'May', orders: 480 },
    { month: 'Jun', orders: 384 },
    { month: 'Jul', orders: 540 },
    { month: 'Aug', orders: 456 },
    { month: 'Sep', orders: 600 },
    { month: 'Oct', orders: 504 },
    { month: 'Nov', orders: 660 },
    { month: 'Dec', orders: 576 },
];

const dataMap: Record<DateRange, typeof monthlyData> = {
    '7d': weeklyData,
    '30d': monthlyData,
    '12m': yearlyData,
};

function OrdersChartInner() {
    const colors = useRoleColors();
    const [range, setRange] = useState<DateRange>('30d');
    const data = useMemo(() => dataMap[range], [range]);

    return (
        <motion.div
            className="rounded-2xl border border-gray-200 dark:border-gray-700/50 bg-white dark:bg-gray-800/50 backdrop-blur-sm p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
        >
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-base font-semibold text-gray-900 dark:text-white">
                    Orders Per Month
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
                            formatter={(value: unknown) => [Number(value), 'Orders']}
                            cursor={{ fill: 'rgba(107, 114, 128, 0.1)' }}
                        />
                        <Bar
                            dataKey="orders"
                            fill={colors.primary}
                            radius={[6, 6, 0, 0]}
                            animationDuration={1200}
                            animationEasing="ease-out"
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </motion.div>
    );
}

export const OrdersChart = React.memo(OrdersChartInner);
