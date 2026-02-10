'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { useRoleColors } from '@/hooks/useTheme';

interface ErrorStateProps {
    message?: string;
    onRetry?: () => void;
}

function ErrorStateInner({ message = 'Something went wrong while loading data.', onRetry }: ErrorStateProps) {
    const colors = useRoleColors();

    return (
        <motion.div
            className="flex flex-col items-center justify-center py-16 px-6 text-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
        >
            <div className="w-14 h-14 rounded-2xl bg-red-50 dark:bg-red-950/30 flex items-center justify-center mb-4">
                <AlertCircle className="w-7 h-7 text-red-500" />
            </div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">
                Failed to load
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 max-w-xs mb-5">
                {message}
            </p>
            {onRetry && (
                <motion.button
                    onClick={onRetry}
                    className={`inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-xl ${colors.primaryBg} text-white ${colors.hover} transition-colors`}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                >
                    <RefreshCw className="w-4 h-4" />
                    Retry
                </motion.button>
            )}
        </motion.div>
    );
}

export const ErrorState = React.memo(ErrorStateInner);
