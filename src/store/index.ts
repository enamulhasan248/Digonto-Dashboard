import { create } from 'zustand';
import type { DashboardState, Role, Theme, User } from '@/types';

const USERS: { email: string; password: string; name: string; role: Role }[] = [
    { email: 'admin@gmail.com', password: '1234', name: 'Admin User', role: 'admin' },
    { email: 'manager@gmail.com', password: '1234', name: 'Manager User', role: 'manager' },
];

function getStoredUser(): User | null {
    if (typeof window === 'undefined') return null;
    try {
        const raw = localStorage.getItem('digonto-user');
        return raw ? JSON.parse(raw) : null;
    } catch {
        return null;
    }
}

function getStoredTheme(): Theme {
    if (typeof window === 'undefined') return 'dark';
    return (localStorage.getItem('digonto-theme') as Theme) || 'dark';
}

export const useDashboardStore = create<DashboardState>((set) => {
    const storedUser = getStoredUser();
    return {
        role: storedUser?.role ?? 'admin',
        user: storedUser,
        theme: getStoredTheme(),
        dateRange: '30d',
        sidebarOpen: true,
        isLoading: true,
        hasError: false,
        setRole: (role: Role) => set({ role }),
        setUser: (user: User | null) => {
            if (typeof window !== 'undefined') {
                if (user) {
                    localStorage.setItem('digonto-user', JSON.stringify(user));
                } else {
                    localStorage.removeItem('digonto-user');
                }
            }
            set({ user, role: user?.role ?? 'admin' });
        },
        login: (email: string, password: string): boolean => {
            const found = USERS.find((u) => u.email === email && u.password === password);
            if (!found) return false;
            const user: User = { email: found.email, name: found.name, role: found.role };
            if (typeof window !== 'undefined') {
                localStorage.setItem('digonto-user', JSON.stringify(user));
            }
            set({ user, role: found.role });
            return true;
        },
        logout: () => {
            if (typeof window !== 'undefined') {
                localStorage.removeItem('digonto-user');
            }
            set({ user: null, role: 'admin' });
        },
        setTheme: (theme: Theme) => {
            if (typeof window !== 'undefined') {
                localStorage.setItem('digonto-theme', theme);
            }
            set({ theme });
        },
        setDateRange: (range) => set({ dateRange: range }),
        setSidebarOpen: (open: boolean) => set({ sidebarOpen: open }),
        toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
        setLoading: (loading: boolean) => set({ isLoading: loading }),
        setError: (error: boolean) => set({ hasError: error }),
    };
});
