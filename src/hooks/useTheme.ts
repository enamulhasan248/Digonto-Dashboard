import { useEffect } from 'react';
import { useDashboardStore } from '@/store';

export function useTheme() {
    const { theme, setTheme } = useDashboardStore();

    useEffect(() => {
        const root = document.documentElement;
        if (theme === 'dark') {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }
    }, [theme]);

    const toggleTheme = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
    };

    return { theme, toggleTheme };
}

export function useRoleColors() {
    const role = useDashboardStore((s) => s.role);

    const colors = {
        admin: {
            primary: '#4f46e5',
            primaryLight: '#818cf8',
            primaryBg: 'bg-indigo-600',
            primaryBgLight: 'bg-indigo-500',
            primaryBgSubtle: 'bg-indigo-50 dark:bg-indigo-950/30',
            primaryText: 'text-indigo-600 dark:text-indigo-400',
            primaryBorder: 'border-indigo-600 dark:border-indigo-500',
            primaryRing: 'ring-indigo-500',
            gradient: 'from-indigo-600 to-indigo-400',
            gradientBg: 'from-indigo-600/20 to-indigo-400/5',
            hover: 'hover:bg-indigo-700',
            badge: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300',
        },
        manager: {
            primary: '#059669',
            primaryLight: '#34d399',
            primaryBg: 'bg-emerald-600',
            primaryBgLight: 'bg-emerald-500',
            primaryBgSubtle: 'bg-emerald-50 dark:bg-emerald-950/30',
            primaryText: 'text-emerald-600 dark:text-emerald-400',
            primaryBorder: 'border-emerald-600 dark:border-emerald-500',
            primaryRing: 'ring-emerald-500',
            gradient: 'from-emerald-600 to-emerald-400',
            gradientBg: 'from-emerald-600/20 to-emerald-400/5',
            hover: 'hover:bg-emerald-700',
            badge: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300',
        },
    };

    return colors[role];
}
