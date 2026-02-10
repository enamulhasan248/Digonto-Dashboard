'use client';

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    Tooltip,
    Legend,
} from 'recharts';
import type { DateRange } from '@/types';
import { ChartDateFilter } from '@/components/ui/ChartDateFilter';

const weeklyData = [
    { name: 'Free', value: 95, color: '#6366f1' },
    { name: 'Premium', value: 52, color: '#10b981' },
    { name: 'Enterprise', value: 18, color: '#f59e0b' },
];

const monthlyData = [
    { name: 'Free', value: 650, color: '#6366f1' },
    { name: 'Premium', value: 420, color: '#10b981' },
    { name: 'Enterprise', value: 175, color: '#f59e0b' },
];

const yearlyData = [
    { name: 'Free', value: 7800, color: '#6366f1' },
    { name: 'Premium', value: 5040, color: '#10b981' },
    { name: 'Enterprise', value: 2100, color: '#f59e0b' },
];

const dataMap: Record<DateRange, typeof monthlyData> = {
    '7d': weeklyData,
    '30d': monthlyData,
    '12m': yearlyData,
};

function UserTypesChartInner() {
    const [range, setRange] = useState<DateRange>('30d');
    const data = useMemo(() => dataMap[range], [range]);

    return (
        <motion.div
            className="rounded-2xl border border-gray-200 dark:border-gray-700/50 bg-white dark:bg-gray-800/50 backdrop-blur-sm p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
        >
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-base font-semibold text-gray-900 dark:text-white">
                    User Types
                </h3>
                <ChartDateFilter value={range} onChange={setRange} />
            </div>
            <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            innerRadius={65}
                            outerRadius={100}
                            paddingAngle={4}
                            dataKey="value"
                            animationDuration={1200}
                            animationEasing="ease-out"
                            stroke="none"
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Pie>
                        <Tooltip
                            contentStyle={{
                                backgroundColor: 'rgba(17, 24, 39, 0.95)',
                                border: 'none',
                                borderRadius: '12px',
                                padding: '10px 14px',
                                boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
                            }}
                            itemStyle={{ color: '#fff', fontSize: 13, fontWeight: 500 }}
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            formatter={((value: any, name: any) => [Number(value), name]) as any}
                        />
                        <Legend
                            verticalAlign="bottom"
                            iconType="circle"
                            iconSize={8}
                            formatter={(value) => (
                                <span className="text-xs text-gray-600 dark:text-gray-400 ml-1">
                                    {value}
                                </span>
                            )}
                        />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </motion.div>
    );
}

export const UserTypesChart = React.memo(UserTypesChartInner);
