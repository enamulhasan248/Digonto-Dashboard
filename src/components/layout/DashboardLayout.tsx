'use client';

import { useEffect } from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';
import { AuthProvider } from '@/components/auth/AuthProvider';
import { useDashboardStore } from '@/store';

export function DashboardLayout({ children }: { children: React.ReactNode }) {
    const { theme } = useDashboardStore();

    useEffect(() => {
        const root = document.documentElement;
        if (theme === 'dark') {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }
    }, [theme]);

    return (
        <AuthProvider>
            <div className="flex h-screen overflow-hidden bg-gray-50 dark:bg-[#0b0f1a] transition-colors duration-300">
                <Sidebar />
                <div className="flex-1 flex flex-col overflow-hidden">
                    <Header />
                    <main className="flex-1 overflow-y-auto">
                        {children}
                    </main>
                </div>
            </div>
        </AuthProvider>
    );
}
