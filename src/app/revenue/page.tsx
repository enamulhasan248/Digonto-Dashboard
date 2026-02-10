'use client';

import { motion } from 'framer-motion';
import {
    DollarSign,
    TrendingUp,
    CreditCard,
    Wallet,
    ArrowUpRight,
    ArrowDownRight,
} from 'lucide-react';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { useRoleColors } from '@/hooks/useTheme';
import { useApiData } from '@/hooks/useApiData';
import { fetchRevenue, fetchTransactions } from '@/lib/api';
import { KPICardSkeleton, ChartSkeleton } from '@/components/ui/Skeleton';
import { ErrorState } from '@/components/ui/ErrorState';
import { EmptyState } from '@/components/ui/EmptyState';

const revenueBreakdown = [
    { category: 'Course Sales', amount: 28500, pct: 52.5 },
    { category: 'Subscription Fees', amount: 14200, pct: 26.2 },
    { category: 'Certificate Fees', amount: 6800, pct: 12.5 },
    { category: 'Workshop Tickets', amount: 3200, pct: 5.9 },
    { category: 'Other', amount: 1530, pct: 2.9 },
];

const kpis = [
    { title: 'Total Revenue', value: '$54,230', change: 12.5, trend: 'up', icon: DollarSign },
    { title: 'Monthly Recurring', value: '$14,200', change: 8.3, trend: 'up', icon: TrendingUp },
    { title: 'Avg. Transaction', value: '$42.50', change: -2.1, trend: 'down', icon: CreditCard },
    { title: 'Pending Payouts', value: '$3,120', change: 5.0, trend: 'up', icon: Wallet },
];

const txStatusColor: Record<string, string> = {
    Completed: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400',
    Pending: 'bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400',
    Refunded: 'bg-red-50 text-red-700 dark:bg-red-950/40 dark:text-red-400',
};

export default function RevenuePage() {
    const colors = useRoleColors();
    const { data: monthlyRevenue, loading: revLoading, error: revError, refetch: revRefetch } = useApiData(fetchRevenue);
    const { data: transactions, loading: txLoading, error: txError, refetch: txRefetch } = useApiData(fetchTransactions);

    return (
        <DashboardLayout>
            <div className="p-4 lg:p-6 space-y-6 max-w-[1600px] mx-auto">
                {/* Header */}
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                        <DollarSign className="w-7 h-7" />
                        Revenue
                    </h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        Financial overview and transaction history.
                    </p>
                </motion.div>

                {/* KPI Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                    {kpis.map((kpi, i) => {
                        const Icon = kpi.icon;
                        const isUp = kpi.trend === 'up';
                        return (
                            <motion.div
                                key={kpi.title}
                                className="rounded-2xl border border-gray-200 dark:border-gray-700/50 bg-white dark:bg-gray-800/50 p-5"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                whileHover={{ y: -3 }}
                            >
                                <div className="flex items-center justify-between mb-3">
                                    <span className="text-sm text-gray-500 dark:text-gray-400">{kpi.title}</span>
                                    <div className={`p-2 rounded-xl ${colors.primaryBgSubtle}`}>
                                        <Icon className={`w-4 h-4 ${colors.primaryText}`} />
                                    </div>
                                </div>
                                <div className="text-2xl font-bold text-gray-900 dark:text-white">{kpi.value}</div>
                                <div className="flex items-center gap-1 mt-1">
                                    {isUp ? <ArrowUpRight className="w-3.5 h-3.5 text-emerald-500" /> : <ArrowDownRight className="w-3.5 h-3.5 text-red-500" />}
                                    <span className={`text-xs font-medium ${isUp ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'}`}>
                                        {isUp ? '+' : ''}{kpi.change}%
                                    </span>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Income vs Expense Chart */}
                <motion.div
                    className="rounded-2xl border border-gray-200 dark:border-gray-700/50 bg-white dark:bg-gray-800/50 p-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-6">Income vs Expenses</h3>
                    {revError ? (
                        <ErrorState message={revError} onRetry={revRefetch} />
                    ) : revLoading ? (
                        <div className="space-y-4">
                            <ChartSkeleton />
                        </div>
                    ) : (monthlyRevenue ?? []).length === 0 ? (
                        <EmptyState icon={DollarSign} title="No revenue data" description="Revenue data will appear here once transactions are recorded." />
                    ) : (
                        <div className="h-72">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={monthlyRevenue ?? []} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                                    <defs>
                                        <linearGradient id="incomeGrad" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="0%" stopColor={colors.primary} stopOpacity={0.3} />
                                            <stop offset="100%" stopColor={colors.primary} stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" stroke="currentColor" className="text-gray-200 dark:text-gray-700" vertical={false} />
                                    <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} className="text-gray-500" />
                                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12 }} className="text-gray-500" tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: 'rgba(17,24,39,0.95)', border: 'none', borderRadius: '12px', padding: '10px 14px', boxShadow: '0 4px 20px rgba(0,0,0,0.3)' }}
                                        labelStyle={{ color: '#9ca3af', fontSize: 12, marginBottom: 4 }}
                                        itemStyle={{ fontSize: 13, fontWeight: 500 }}
                                    />
                                    <Area type="monotone" dataKey="income" stroke={colors.primary} strokeWidth={2} fill="url(#incomeGrad)" name="Income" />
                                    <Area type="monotone" dataKey="expense" stroke="#ef4444" strokeWidth={2} fill="rgba(239,68,68,0.1)" name="Expenses" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    )}
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {/* Revenue Breakdown */}
                    <motion.div
                        className="rounded-2xl border border-gray-200 dark:border-gray-700/50 bg-white dark:bg-gray-800/50 p-6"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                    >
                        <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-5">Revenue Breakdown</h3>
                        <div className="space-y-4">
                            {revenueBreakdown.map((item) => (
                                <div key={item.category}>
                                    <div className="flex items-center justify-between mb-1.5">
                                        <span className="text-sm text-gray-600 dark:text-gray-400">{item.category}</span>
                                        <span className="text-sm font-semibold text-gray-900 dark:text-white">${item.amount.toLocaleString()}</span>
                                    </div>
                                    <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                        <motion.div
                                            className={`h-full rounded-full ${colors.primaryBg}`}
                                            initial={{ width: 0 }}
                                            animate={{ width: `${item.pct}%` }}
                                            transition={{ duration: 1, delay: 0.5 }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Recent Transactions */}
                    <motion.div
                        className="rounded-2xl border border-gray-200 dark:border-gray-700/50 bg-white dark:bg-gray-800/50 overflow-hidden"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                    >
                        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                            <h3 className="text-base font-semibold text-gray-900 dark:text-white">Recent Transactions</h3>
                        </div>
                        {txError ? (
                            <ErrorState message={txError} onRetry={txRefetch} />
                        ) : txLoading ? (
                            <div className="divide-y divide-gray-100 dark:divide-gray-800">
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <div key={i} className="px-6 py-3.5 flex items-center justify-between animate-pulse">
                                        <div className="space-y-1.5">
                                            <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded" />
                                            <div className="h-3 w-32 bg-gray-200 dark:bg-gray-700 rounded" />
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="h-4 w-12 bg-gray-200 dark:bg-gray-700 rounded" />
                                            <div className="h-5 w-16 bg-gray-200 dark:bg-gray-700 rounded-md" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (transactions ?? []).length === 0 ? (
                            <EmptyState icon={CreditCard} title="No transactions" description="Transactions will appear here once payments are processed." />
                        ) : (
                            <div className="divide-y divide-gray-100 dark:divide-gray-800">
                                {(transactions ?? []).map((tx) => (
                                    <div key={tx.id} className="px-6 py-3.5 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors">
                                        <div>
                                            <div className="text-sm font-medium text-gray-900 dark:text-white">{tx.user}</div>
                                            <div className="text-xs text-gray-500">{tx.type} • {tx.date}</div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <span className="text-sm font-semibold text-gray-900 dark:text-white">${tx.amount}</span>
                                            <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-md ${txStatusColor[tx.status]}`}>{tx.status}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </motion.div>
                </div>
            </div>
        </DashboardLayout>
    );
}
