'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
    FileBarChart,
    Download,
    Calendar,
    Eye,
    FileText,
    PieChart,
    TrendingUp,
    Users,
} from 'lucide-react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { useRoleColors } from '@/hooks/useTheme';
import { useApiData } from '@/hooks/useApiData';
import { fetchReports } from '@/lib/api';
import { ReportCardSkeleton } from '@/components/ui/Skeleton';
import { ErrorState } from '@/components/ui/ErrorState';
import { EmptyState } from '@/components/ui/EmptyState';
import type { Report } from '@/types';

// Map icon string from API to actual component
const iconMap: Record<string, React.ElementType> = {
    TrendingUp,
    Users,
    PieChart,
    FileBarChart,
    FileText,
};

const statusStyle: Record<string, string> = {
    Ready: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400',
    Generating: 'bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400',
    Scheduled: 'bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400',
};

export default function ReportsPage() {
    const colors = useRoleColors();
    const { data: reports, loading, error, refetch } = useApiData(fetchReports);
    const [filterType, setFilterType] = useState('All');

    const types = useMemo(() => {
        const set = new Set((reports ?? []).map(r => r.type));
        return ['All', ...Array.from(set)];
    }, [reports]);

    const filtered = useMemo(() => {
        const all = reports ?? [];
        return filterType === 'All' ? all : all.filter(r => r.type === filterType);
    }, [reports, filterType]);

    return (
        <DashboardLayout>
            <div className="p-4 lg:p-6 space-y-6 max-w-[1600px] mx-auto">
                {/* Header */}
                <motion.div
                    className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                            <FileBarChart className="w-7 h-7" />
                            Reports
                        </h1>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                            View and download generated reports.
                        </p>
                    </div>
                </motion.div>

                {/* Filter Tabs */}
                {!loading && !error && (
                    <motion.div
                        className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 rounded-xl p-1 w-fit"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                    >
                        {types.map((t) => (
                            <button
                                key={t}
                                onClick={() => setFilterType(t)}
                                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${filterType === t
                                    ? `${colors.primaryBg} text-white`
                                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700'
                                    }`}
                            >
                                {t}
                            </button>
                        ))}
                    </motion.div>
                )}

                {/* Reports Grid */}
                {error ? (
                    <ErrorState message={error} onRetry={refetch} />
                ) : loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                        {Array.from({ length: 6 }).map((_, i) => (
                            <ReportCardSkeleton key={i} />
                        ))}
                    </div>
                ) : filtered.length === 0 ? (
                    <EmptyState
                        icon={FileBarChart}
                        title="No reports found"
                        description={filterType !== 'All' ? 'Try selecting a different filter.' : 'No reports have been generated yet.'}
                    />
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                        {filtered.map((report, i) => {
                            const Icon = iconMap[report.icon] || FileBarChart;
                            return (
                                <motion.div
                                    key={report.id}
                                    className="rounded-2xl border border-gray-200 dark:border-gray-700/50 bg-white dark:bg-gray-800/50 p-6 group hover:border-gray-300 dark:hover:border-gray-600 transition-colors"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.07 }}
                                    whileHover={{ y: -3 }}
                                >
                                    <div className="flex items-start justify-between mb-4">
                                        <div className={`p-2.5 rounded-xl ${colors.primaryBgSubtle}`}>
                                            <Icon className={`w-5 h-5 ${colors.primaryText}`} />
                                        </div>
                                        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-md ${statusStyle[report.status]}`}>
                                            {report.status}
                                        </span>
                                    </div>

                                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-1.5">
                                        {report.title}
                                    </h3>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-4 leading-relaxed">
                                        {report.description}
                                    </p>

                                    <div className="flex items-center justify-between text-xs text-gray-400 dark:text-gray-500 mb-4">
                                        <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {report.date}</span>
                                        <span>{report.size}</span>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        {report.status === 'Ready' && (
                                            <>
                                                <motion.button
                                                    className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-medium rounded-xl bg-gray-100 dark:bg-gray-700/50 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                                                    whileTap={{ scale: 0.97 }}
                                                >
                                                    <Eye className="w-3.5 h-3.5" /> View
                                                </motion.button>
                                                <motion.button
                                                    className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-medium rounded-xl ${colors.primaryBg} text-white ${colors.hover} transition-colors`}
                                                    whileTap={{ scale: 0.97 }}
                                                >
                                                    <Download className="w-3.5 h-3.5" /> Download
                                                </motion.button>
                                            </>
                                        )}
                                        {report.status === 'Generating' && (
                                            <div className="flex-1 text-center text-xs text-amber-600 dark:text-amber-400 py-2">
                                                Processing... Please wait.
                                            </div>
                                        )}
                                        {report.status === 'Scheduled' && (
                                            <div className="flex-1 text-center text-xs text-blue-600 dark:text-blue-400 py-2">
                                                Scheduled for {report.date}
                                            </div>
                                        )}
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
}
