'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useDashboardStore } from '@/store';

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const pathname = usePathname();
    const user = useDashboardStore((s) => s.user);
    const [checked, setChecked] = useState(false);

    useEffect(() => {
        if (!user && pathname !== '/login') {
            router.replace('/login');
        } else {
            setChecked(true);
        }
    }, [user, pathname, router]);

    if (!checked) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950">
                <div className="w-8 h-8 border-3 border-gray-300 dark:border-gray-600 border-t-indigo-500 rounded-full animate-spin" />
            </div>
        );
    }

    return <>{children}</>;
}
