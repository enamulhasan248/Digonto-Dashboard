'use client';

import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';
import type { KPIData } from '@/types';
import { useRoleColors } from '@/hooks/useTheme';

interface KPICardProps {
    data: KPIData;
    index: number;
}

function KPICardInner({ data, index }: KPICardProps) {
    const colors = useRoleColors();
    const isPositive = data.trend === 'up';

    const sparklineData = useMemo(
        () => data.sparkline.map((value, i) => ({ value, index: i })),
        [data.sparkline]
    );

    return (
        <motion.div
            className="group relative rounded-2xl border border-gray-200 dark:border-gray-700/50 bg-white dark:bg-gray-800/50 backdrop-blur-sm p-6 overflow-hidden cursor-default"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
        >
            {/* Gradient background on hover */}
            <div className={`absolute inset-0 bg-gradient-to-br ${colors.gradientBg} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

            <div className="relative z-10">
                {/* Title and icon */}
                <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        {data.title}
                    </span>
                    <div className={`p-2 rounded-xl ${isPositive ? 'bg-emerald-50 dark:bg-emerald-950/30' : 'bg-red-50 dark:bg-red-950/30'}`}>
                        {isPositive ? (
                            <TrendingUp className="w-5 h-5 text-emerald-500" />
                        ) : (
                            <TrendingDown className="w-5 h-5 text-red-500" />
                        )}
                    </div>
                </div>

                {/* Value */}
                <div className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    {data.value}
                </div>

                {/* Trend */}
                <div className="flex items-center gap-2 mb-4">
                    <span
                        className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-md ${isPositive
                                ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/30 dark:text-emerald-400'
                                : 'bg-red-50 text-red-600 dark:bg-red-950/30 dark:text-red-400'
                            }`}
                    >
                        {isPositive ? '+' : ''}{data.change}%
                    </span>
                    <span className="text-xs text-gray-400 dark:text-gray-500">vs last period</span>
                </div>

                {/* Sparkline */}
                <div className="h-12">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={sparklineData}>
                            <Line
                                type="monotone"
                                dataKey="value"
                                stroke={isPositive ? '#10b981' : '#ef4444'}
                                strokeWidth={2}
                                dot={false}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </motion.div>
    );
}

export const KPICard = React.memo(KPICardInner);
