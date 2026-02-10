'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Inbox } from 'lucide-react';

interface EmptyStateProps {
    icon?: React.ElementType;
    title?: string;
    description?: string;
}

function EmptyStateInner({
    icon: Icon = Inbox,
    title = 'No data found',
    description = 'There are no items to display at the moment.',
}: EmptyStateProps) {
    return (
        <motion.div
            className="flex flex-col items-center justify-center py-16 px-6 text-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
        >
            <div className="w-14 h-14 rounded-2xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-4">
                <Icon className="w-7 h-7 text-gray-400 dark:text-gray-500" />
            </div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">
                {title}
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 max-w-xs">
                {description}
            </p>
        </motion.div>
    );
}

export const EmptyState = React.memo(EmptyStateInner);
