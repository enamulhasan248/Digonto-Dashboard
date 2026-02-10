'use client';

import React from 'react';
import { useRoleColors } from '@/hooks/useTheme';
import type { DateRange } from '@/types';

interface ChartDateFilterProps {
    value: DateRange;
    onChange: (range: DateRange) => void;
}

const options: { label: string; value: DateRange }[] = [
    { label: '7D', value: '7d' },
    { label: '30D', value: '30d' },
    { label: '12M', value: '12m' },
];

function ChartDateFilterInner({ value, onChange }: ChartDateFilterProps) {
    const colors = useRoleColors();

    return (
        <div className="flex items-center bg-gray-100 dark:bg-gray-700/50 rounded-lg p-0.5">
            {options.map((opt) => (
                <button
                    key={opt.value}
                    onClick={() => onChange(opt.value)}
                    className={`px-2 py-1 text-[10px] font-semibold rounded-md transition-colors ${value === opt.value
                            ? `${colors.primaryBg} text-white`
                            : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                        }`}
                >
                    {opt.label}
                </button>
            ))}
        </div>
    );
}

export const ChartDateFilter = React.memo(ChartDateFilterInner);
