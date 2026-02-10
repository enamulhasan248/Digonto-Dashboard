'use client';

import { motion } from 'framer-motion';

export function Skeleton({ className = '' }: { className?: string }) {
    return (
        <motion.div
            className={`relative overflow-hidden rounded-xl bg-gray-200 dark:bg-gray-700/50 ${className}`}
            initial={{ opacity: 0.5 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
        >
            <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 dark:via-white/5 to-transparent"
                animate={{ x: ['-100%', '100%'] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
            />
        </motion.div>
    );
}

export function KPICardSkeleton() {
    return (
        <div className="rounded-2xl border border-gray-200 dark:border-gray-700/50 bg-white dark:bg-gray-800/50 p-6 space-y-4">
            <div className="flex items-center justify-between">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-10 w-10 rounded-xl" />
            </div>
            <Skeleton className="h-8 w-32" />
            <div className="flex items-center gap-2">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 w-20" />
            </div>
            <Skeleton className="h-12 w-full" />
        </div>
    );
}

export function ChartSkeleton() {
    return (
        <div className="rounded-2xl border border-gray-200 dark:border-gray-700/50 bg-white dark:bg-gray-800/50 p-6 space-y-4">
            <div className="flex items-center justify-between">
                <Skeleton className="h-5 w-40" />
                <Skeleton className="h-8 w-24 rounded-lg" />
            </div>
            <Skeleton className="h-64 w-full rounded-xl" />
        </div>
    );
}

export function TableRowSkeleton() {
    return (
        <tr className="border-b border-gray-100 dark:border-gray-800">
            <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                    <Skeleton className="h-9 w-9 rounded-full" />
                    <div className="space-y-1.5">
                        <Skeleton className="h-4 w-28" />
                        <Skeleton className="h-3 w-36" />
                    </div>
                </div>
            </td>
            <td className="px-6 py-4 hidden md:table-cell"><Skeleton className="h-4 w-24" /></td>
            <td className="px-6 py-4 hidden lg:table-cell"><Skeleton className="h-4 w-28" /></td>
            <td className="px-6 py-4"><Skeleton className="h-6 w-16 rounded-lg" /></td>
            <td className="px-6 py-4 hidden sm:table-cell">
                <div className="flex items-center gap-3">
                    <Skeleton className="h-2 w-[100px] rounded-full" />
                    <Skeleton className="h-4 w-8" />
                </div>
            </td>
            <td className="px-6 py-4"><Skeleton className="h-6 w-6 rounded-lg" /></td>
        </tr>
    );
}

export function ReportCardSkeleton() {
    return (
        <div className="rounded-2xl border border-gray-200 dark:border-gray-700/50 bg-white dark:bg-gray-800/50 p-6 space-y-4">
            <div className="flex items-start justify-between">
                <Skeleton className="h-10 w-10 rounded-xl" />
                <Skeleton className="h-5 w-16 rounded-md" />
            </div>
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-full" />
            <div className="flex items-center justify-between">
                <Skeleton className="h-3 w-20" />
                <Skeleton className="h-3 w-12" />
            </div>
            <div className="flex gap-2">
                <Skeleton className="h-8 flex-1 rounded-xl" />
                <Skeleton className="h-8 flex-1 rounded-xl" />
            </div>
        </div>
    );
}
