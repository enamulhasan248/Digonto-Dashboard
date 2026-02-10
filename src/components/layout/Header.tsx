'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Search,
    Bell,
    Moon,
    Sun,
    Menu,
    ChevronDown,
    LogOut,
    User,
    Settings,
    UserPlus,
    CreditCard,
    AlertTriangle,
    BookOpen,
    TrendingUp,
    ShieldCheck,
    MessageSquare,
    Award,
    FileText,
} from 'lucide-react';
import { useDashboardStore } from '@/store';
import { useTheme, useRoleColors } from '@/hooks/useTheme';

const notifications = [
    {
        id: 1,
        icon: UserPlus,
        iconBg: 'bg-blue-500',
        title: 'New Student Enrolled',
        description: 'Rahim Uddin enrolled in Data Science course.',
        time: '2 min ago',
        unread: true,
    },
    {
        id: 2,
        icon: CreditCard,
        iconBg: 'bg-green-500',
        title: 'Payment Received',
        description: '৳8,500 received from Fatima Akter.',
        time: '15 min ago',
        unread: true,
    },
    {
        id: 3,
        icon: AlertTriangle,
        iconBg: 'bg-amber-500',
        title: 'Server Warning',
        description: 'CPU usage reached 85% on primary server.',
        time: '32 min ago',
        unread: true,
    },
    {
        id: 4,
        icon: BookOpen,
        iconBg: 'bg-purple-500',
        title: 'Course Published',
        description: '"Advanced React" course is now live.',
        time: '1 hr ago',
        unread: false,
    },
    {
        id: 5,
        icon: TrendingUp,
        iconBg: 'bg-indigo-500',
        title: 'Revenue Milestone',
        description: 'Monthly revenue crossed ৳5,00,000!',
        time: '2 hrs ago',
        unread: false,
    },
    {
        id: 6,
        icon: ShieldCheck,
        iconBg: 'bg-emerald-500',
        title: 'Security Update',
        description: 'Two-factor auth enabled for 12 users.',
        time: '3 hrs ago',
        unread: false,
    },
    {
        id: 7,
        icon: MessageSquare,
        iconBg: 'bg-pink-500',
        title: 'New Feedback',
        description: 'Karim left a 5-star review on Web Dev course.',
        time: '4 hrs ago',
        unread: false,
    },
    {
        id: 8,
        icon: Award,
        iconBg: 'bg-yellow-500',
        title: 'Certificate Issued',
        description: '15 certificates generated for batch 2025-A.',
        time: '5 hrs ago',
        unread: false,
    },
    {
        id: 9,
        icon: FileText,
        iconBg: 'bg-cyan-500',
        title: 'Report Ready',
        description: 'Monthly analytics report is ready for download.',
        time: '6 hrs ago',
        unread: false,
    },
    {
        id: 10,
        icon: UserPlus,
        iconBg: 'bg-violet-500',
        title: 'Instructor Joined',
        description: 'Dr. Hasan joined as a new instructor.',
        time: '8 hrs ago',
        unread: false,
    },
];

export function Header() {
    const { user, logout, setSidebarOpen } = useDashboardStore();
    const { theme, toggleTheme } = useTheme();
    const colors = useRoleColors();
    const router = useRouter();
    const [profileOpen, setProfileOpen] = useState(false);
    const [notifsOpen, setNotifsOpen] = useState(false);
    const [mounted, setMounted] = useState(false);
    const profileRef = useRef<HTMLDivElement>(null);
    const notifsRef = useRef<HTMLDivElement>(null);

    useEffect(() => { setMounted(true); }, []);

    // Close dropdowns on outside click
    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
                setProfileOpen(false);
            }
            if (notifsRef.current && !notifsRef.current.contains(e.target as Node)) {
                setNotifsOpen(false);
            }
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    const handleLogout = () => {
        logout();
        router.push('/login');
    };

    const initials = user
        ? user.name.split(' ').map((n) => n[0]).join('').toUpperCase()
        : 'U';

    const unreadCount = notifications.filter((n) => n.unread).length;

    return (
        <header className="sticky top-0 z-30 h-16 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-200 dark:border-gray-800 flex items-center justify-between px-4 lg:px-6 gap-4">
            {/* Left: Mobile menu + Search */}
            <div className="flex items-center gap-3 flex-1">
                <motion.button
                    onClick={() => setSidebarOpen(true)}
                    className="lg:hidden p-2 rounded-xl text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    whileTap={{ scale: 0.95 }}
                >
                    <Menu className="w-5 h-5" />
                </motion.button>

                <div className="relative hidden sm:block max-w-xs w-full">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search..."
                        className="w-full pl-9 pr-4 py-2 text-sm bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-700 dark:text-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-0 transition-shadow"
                        style={{ ['--tw-ring-color' as string]: colors.primary }}
                    />
                </div>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-2">
                {/* Theme toggle */}
                <motion.button
                    onClick={toggleTheme}
                    className="p-2 rounded-xl text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    {!mounted ? (
                        <Sun className="w-5 h-5" />
                    ) : (
                        <AnimatePresence mode="wait" initial={false}>
                            {theme === 'dark' ? (
                                <motion.div key="sun" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                                    <Sun className="w-5 h-5" />
                                </motion.div>
                            ) : (
                                <motion.div key="moon" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                                    <Moon className="w-5 h-5" />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    )}
                </motion.button>

                {/* Notification bell */}
                <div ref={notifsRef} className="relative">
                    <motion.button
                        onClick={() => { setNotifsOpen(!notifsOpen); setProfileOpen(false); }}
                        className="relative p-2 rounded-xl text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Bell className="w-5 h-5" />
                        {unreadCount > 0 && (
                            <span className="absolute top-1.5 right-1.5 flex h-2.5 w-2.5">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500" />
                            </span>
                        )}
                    </motion.button>

                    <AnimatePresence>
                        {notifsOpen && (
                            <motion.div
                                className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-2xl overflow-hidden"
                                initial={{ opacity: 0, y: -10, scale: 0.96 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: -10, scale: 0.96 }}
                                transition={{ duration: 0.2, ease: 'easeOut' }}
                            >
                                {/* Header */}
                                <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-800">
                                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Notifications</h3>
                                    {unreadCount > 0 && (
                                        <span className="px-2 py-0.5 text-[10px] font-bold bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-400 rounded-full">
                                            {unreadCount} new
                                        </span>
                                    )}
                                </div>

                                {/* Scrollable list — 5 visible, 5 more on scroll */}
                                <div className="max-h-[340px] overflow-y-auto divide-y divide-gray-100 dark:divide-gray-800">
                                    {notifications.map((notif, i) => {
                                        const Icon = notif.icon;
                                        return (
                                            <motion.div
                                                key={notif.id}
                                                className={`flex items-start gap-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800/50 cursor-pointer transition-colors ${notif.unread ? 'bg-indigo-50/50 dark:bg-indigo-950/20' : ''
                                                    }`}
                                                initial={{ opacity: 0, y: -8 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.15, delay: i * 0.03 }}
                                            >
                                                <div className={`flex-shrink-0 w-8 h-8 rounded-lg ${notif.iconBg} flex items-center justify-center mt-0.5`}>
                                                    <Icon className="w-4 h-4 text-white" />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center gap-2">
                                                        <p className="text-xs font-semibold text-gray-900 dark:text-white truncate">
                                                            {notif.title}
                                                        </p>
                                                        {notif.unread && (
                                                            <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-indigo-500" />
                                                        )}
                                                    </div>
                                                    <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-0.5 line-clamp-1">
                                                        {notif.description}
                                                    </p>
                                                    <p className="text-[10px] text-gray-400 dark:text-gray-500 mt-1">
                                                        {notif.time}
                                                    </p>
                                                </div>
                                            </motion.div>
                                        );
                                    })}
                                </div>

                                {/* Footer */}
                                <div className="px-4 py-2.5 border-t border-gray-200 dark:border-gray-800">
                                    <button className={`w-full text-center text-xs font-medium ${colors.primaryText} hover:underline`}>
                                        View all notifications
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Profile dropdown */}
                <div ref={profileRef} className="relative">
                    <motion.button
                        onClick={() => { setProfileOpen(!profileOpen); setNotifsOpen(false); }}
                        className="flex items-center gap-2 p-1.5 pr-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                        whileTap={{ scale: 0.97 }}
                    >
                        <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${colors.gradient} flex items-center justify-center`}>
                            <span className="text-white text-xs font-bold">{initials}</span>
                        </div>
                        <div className="hidden sm:flex flex-col items-start">
                            <span className="text-xs font-medium text-gray-700 dark:text-gray-300 leading-none">
                                {user?.name ?? 'User'}
                            </span>
                            <span className={`text-[10px] font-medium capitalize ${colors.primaryText} leading-tight`}>
                                {user?.role ?? 'admin'}
                            </span>
                        </div>
                        <ChevronDown className="w-3.5 h-3.5 text-gray-400 hidden sm:block" />
                    </motion.button>

                    <AnimatePresence>
                        {profileOpen && (
                            <motion.div
                                className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-xl overflow-hidden"
                                initial={{ opacity: 0, y: -8, scale: 0.96 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: -8, scale: 0.96 }}
                                transition={{ duration: 0.15 }}
                            >
                                <div className="p-3 border-b border-gray-200 dark:border-gray-800">
                                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                        {user?.name ?? 'User'}
                                    </p>
                                    <p className="text-xs text-gray-500">{user?.email ?? ''}</p>
                                    <span className={`inline-block mt-1.5 px-2 py-0.5 text-[10px] font-semibold rounded-md capitalize ${colors.badge}`}>
                                        {user?.role ?? 'admin'}
                                    </span>
                                </div>
                                <div className="p-1.5">
                                    {[
                                        { label: 'Profile', icon: User },
                                        { label: 'Settings', icon: Settings },
                                    ].map((item) => (
                                        <button
                                            key={item.label}
                                            className="flex items-center gap-2.5 w-full px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors"
                                        >
                                            <item.icon className="w-4 h-4" />
                                            {item.label}
                                        </button>
                                    ))}
                                </div>
                                <div className="p-1.5 border-t border-gray-200 dark:border-gray-800">
                                    <button
                                        onClick={handleLogout}
                                        className="flex items-center gap-2.5 w-full px-3 py-2 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg transition-colors"
                                    >
                                        <LogOut className="w-4 h-4" />
                                        Sign Out
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </header>
    );
}
