'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
    Search,
    MoreHorizontal,
    GraduationCap,
    Mail,
    Phone,
    ChevronLeft,
    ChevronRight,
    Users,
} from 'lucide-react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { useRoleColors } from '@/hooks/useTheme';
import { useApiData } from '@/hooks/useApiData';
import { fetchStudents } from '@/lib/api';
import { TableRowSkeleton } from '@/components/ui/Skeleton';
import { ErrorState } from '@/components/ui/ErrorState';
import { EmptyState } from '@/components/ui/EmptyState';
import type { Student } from '@/types';

const statusColor: Record<string, string> = {
    Active: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400',
    Inactive: 'bg-red-50 text-red-700 dark:bg-red-950/40 dark:text-red-400',
    Graduated: 'bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400',
};

export default function StudentsPage() {
    const colors = useRoleColors();
    const { data: students, loading, error, refetch } = useApiData(fetchStudents);
    const [search, setSearch] = useState('');
    const [filterStatus, setFilterStatus] = useState<string>('All');
    const [page, setPage] = useState(1);
    const perPage = 6;

    const filtered = useMemo(() => {
        return (students ?? []).filter((s) => {
            const matchSearch =
                s.name.toLowerCase().includes(search.toLowerCase()) ||
                s.course.toLowerCase().includes(search.toLowerCase());
            const matchStatus = filterStatus === 'All' || s.status === filterStatus;
            return matchSearch && matchStatus;
        });
    }, [students, search, filterStatus]);

    const totalPages = Math.ceil(filtered.length / perPage);
    const paginated = filtered.slice((page - 1) * perPage, page * perPage);

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
                            <GraduationCap className="w-7 h-7" />
                            Students
                        </h1>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                            Manage and track all enrolled students.
                        </p>
                    </div>
                    <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        {filtered.length} students total
                    </div>
                </motion.div>

                {/* Filters */}
                <motion.div
                    className="flex flex-col sm:flex-row gap-3"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                >
                    <div className="relative flex-1 max-w-sm">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search by name or course..."
                            value={search}
                            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                            className="w-full pl-9 pr-4 py-2.5 text-sm bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-700 dark:text-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-0"
                        />
                    </div>
                    <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 rounded-xl p-1">
                        {['All', 'Active', 'Inactive', 'Graduated'].map((s) => (
                            <button
                                key={s}
                                onClick={() => { setFilterStatus(s); setPage(1); }}
                                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${filterStatus === s
                                    ? `${colors.primaryBg} text-white`
                                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                                    }`}
                            >
                                {s}
                            </button>
                        ))}
                    </div>
                </motion.div>

                {/* Table */}
                <motion.div
                    className="rounded-2xl border border-gray-200 dark:border-gray-700/50 bg-white dark:bg-gray-800/50 backdrop-blur-sm overflow-hidden"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    {error ? (
                        <ErrorState message={error} onRetry={refetch} />
                    ) : loading ? (
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b border-gray-200 dark:border-gray-700">
                                        <th className="text-left px-6 py-4 font-semibold text-gray-500 dark:text-gray-400 uppercase text-xs tracking-wider">Student</th>
                                        <th className="text-left px-6 py-4 font-semibold text-gray-500 dark:text-gray-400 uppercase text-xs tracking-wider hidden md:table-cell">Course</th>
                                        <th className="text-left px-6 py-4 font-semibold text-gray-500 dark:text-gray-400 uppercase text-xs tracking-wider hidden lg:table-cell">Phone</th>
                                        <th className="text-left px-6 py-4 font-semibold text-gray-500 dark:text-gray-400 uppercase text-xs tracking-wider">Status</th>
                                        <th className="text-left px-6 py-4 font-semibold text-gray-500 dark:text-gray-400 uppercase text-xs tracking-wider hidden sm:table-cell">Progress</th>
                                        <th className="px-6 py-4"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Array.from({ length: perPage }).map((_, i) => (
                                        <TableRowSkeleton key={i} />
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : paginated.length === 0 ? (
                        <EmptyState
                            icon={Users}
                            title="No students found"
                            description={search || filterStatus !== 'All' ? 'Try adjusting your search or filter.' : 'No students have enrolled yet.'}
                        />
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b border-gray-200 dark:border-gray-700">
                                        <th className="text-left px-6 py-4 font-semibold text-gray-500 dark:text-gray-400 uppercase text-xs tracking-wider">Student</th>
                                        <th className="text-left px-6 py-4 font-semibold text-gray-500 dark:text-gray-400 uppercase text-xs tracking-wider hidden md:table-cell">Course</th>
                                        <th className="text-left px-6 py-4 font-semibold text-gray-500 dark:text-gray-400 uppercase text-xs tracking-wider hidden lg:table-cell">Phone</th>
                                        <th className="text-left px-6 py-4 font-semibold text-gray-500 dark:text-gray-400 uppercase text-xs tracking-wider">Status</th>
                                        <th className="text-left px-6 py-4 font-semibold text-gray-500 dark:text-gray-400 uppercase text-xs tracking-wider hidden sm:table-cell">Progress</th>
                                        <th className="px-6 py-4"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {paginated.map((student, i) => (
                                        <motion.tr
                                            key={student.id}
                                            className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors cursor-pointer"
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: i * 0.05 }}
                                        >
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${colors.gradient} flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}>
                                                        {student.name.split(' ').map(n => n[0]).join('')}
                                                    </div>
                                                    <div>
                                                        <div className="font-medium text-gray-900 dark:text-white">{student.name}</div>
                                                        <div className="text-xs text-gray-500 flex items-center gap-1">
                                                            <Mail className="w-3 h-3" /> {student.email}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-gray-600 dark:text-gray-400 hidden md:table-cell">{student.course}</td>
                                            <td className="px-6 py-4 text-gray-600 dark:text-gray-400 hidden lg:table-cell">
                                                <span className="flex items-center gap-1"><Phone className="w-3 h-3" /> {student.phone}</span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`inline-block px-2.5 py-1 text-xs font-semibold rounded-lg ${statusColor[student.status]}`}>
                                                    {student.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 hidden sm:table-cell">
                                                <div className="flex items-center gap-3">
                                                    <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden max-w-[100px]">
                                                        <div
                                                            className={`h-full rounded-full ${colors.primaryBg}`}
                                                            style={{ width: `${student.progress}%` }}
                                                        />
                                                    </div>
                                                    <span className="text-xs font-medium text-gray-500">{student.progress}%</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <button className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                                                    <MoreHorizontal className="w-4 h-4" />
                                                </button>
                                            </td>
                                        </motion.tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {/* Pagination */}
                    {!loading && !error && totalPages > 1 && (
                        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200 dark:border-gray-700">
                            <span className="text-xs text-gray-500">
                                Page {page} of {totalPages}
                            </span>
                            <div className="flex items-center gap-1">
                                <button
                                    onClick={() => setPage(Math.max(1, page - 1))}
                                    disabled={page === 1}
                                    className="p-1.5 rounded-lg text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-30 transition-colors"
                                >
                                    <ChevronLeft className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => setPage(Math.min(totalPages, page + 1))}
                                    disabled={page === totalPages}
                                    className="p-1.5 rounded-lg text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-30 transition-colors"
                                >
                                    <ChevronRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    )}
                </motion.div>
            </div>
        </DashboardLayout>
    );
}
