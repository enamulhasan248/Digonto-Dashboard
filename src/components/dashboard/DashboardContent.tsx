'use client';

import React, { useCallback } from 'react';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import { Download } from 'lucide-react';
import { useDashboardStore } from '@/store';
import { useRoleColors } from '@/hooks/useTheme';
import { useApiData } from '@/hooks/useApiData';
import { fetchStats } from '@/lib/api';
import { KPICard } from '@/components/dashboard/KPICard';
import { KPICardSkeleton, ChartSkeleton } from '@/components/ui/Skeleton';
import { ErrorState } from '@/components/ui/ErrorState';
import { EmptyState } from '@/components/ui/EmptyState';

// Lazy-load heavy chart components with skeleton fallbacks
const RevenueChart = dynamic(
    () => import('@/components/charts/RevenueChart').then(m => ({ default: m.RevenueChart })),
    { loading: () => <ChartSkeleton />, ssr: false }
);
const OrdersChart = dynamic(
    () => import('@/components/charts/OrdersChart').then(m => ({ default: m.OrdersChart })),
    { loading: () => <ChartSkeleton />, ssr: false }
);
const EnrollmentsChart = dynamic(
    () => import('@/components/charts/EnrollmentsChart').then(m => ({ default: m.EnrollmentsChart })),
    { loading: () => <ChartSkeleton />, ssr: false }
);
const UserTypesChart = dynamic(
    () => import('@/components/charts/UserTypesChart').then(m => ({ default: m.UserTypesChart })),
    { loading: () => <ChartSkeleton />, ssr: false }
);

function DashboardContentInner() {
    const { role } = useDashboardStore();
    const colors = useRoleColors();

    const { data: kpiData, loading: kpiLoading, error: kpiError, refetch: kpiRefetch } = useApiData(fetchStats);

    const handleExportCSV = useCallback(() => {
        alert('CSV export coming soon!');
    }, []);

    return (
        <div className="p-4 lg:p-6 space-y-6 max-w-[1600px] mx-auto">
            {/* Page Header */}
            <motion.div
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
            >
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                        Dashboard
                    </h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        Welcome back! Here&apos;s your overview.
                    </p>
                </div>

                {/* Export CSV - Admin only */}
                <AnimatePresence>
                    {role === 'admin' && (
                        <motion.button
                            onClick={handleExportCSV}
                            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-white text-sm font-medium ${colors.primaryBg} ${colors.hover} transition-colors shadow-lg shadow-indigo-500/20`}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <Download className="w-4 h-4" />
                            Export CSV
                        </motion.button>
                    )}
                </AnimatePresence>
            </motion.div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                {kpiError ? (
                    <div className="col-span-full">
                        <ErrorState message={kpiError} onRetry={kpiRefetch} />
                    </div>
                ) : kpiLoading ? (
                    Array.from({ length: 4 }).map((_, i) => <KPICardSkeleton key={i} />)
                ) : (kpiData ?? []).length === 0 ? (
                    <div className="col-span-full">
                        <EmptyState title="No KPI data" description="Dashboard statistics will appear here." />
                    </div>
                ) : (
                    (kpiData ?? []).map((kpi, i) => <KPICard key={kpi.title} data={kpi} index={i} />)
                )}
            </div>

            {/* Charts Row 1 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <RevenueChart />
                <OrdersChart />
            </div>

            {/* Charts Row 2 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <EnrollmentsChart />
                <UserTypesChart />
            </div>
        </div>
    );
}

export const DashboardContent = React.memo(DashboardContentInner);
