'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
    LayoutDashboard,
    Users,
    DollarSign,
    FileBarChart,
    Settings,
    ChevronLeft,
    X,
} from 'lucide-react';
import { useDashboardStore } from '@/store';
import { useRoleColors } from '@/hooks/useTheme';

const navItems = [
    { label: 'Dashboard', icon: LayoutDashboard, href: '/' },
    { label: 'Students', icon: Users, href: '/students' },
    { label: 'Revenue', icon: DollarSign, href: '/revenue' },
    { label: 'Reports', icon: FileBarChart, href: '/reports' },
    { label: 'Settings', icon: Settings, href: '/settings' },
];

export function Sidebar() {
    const { sidebarOpen, toggleSidebar, setSidebarOpen } = useDashboardStore();
    const colors = useRoleColors();
    const pathname = usePathname();
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 1024);
        check();
        window.addEventListener('resize', check);
        return () => window.removeEventListener('resize', check);
    }, []);

    // On mobile: sidebar is fully hidden when closed, shown as overlay when open
    // On desktop: sidebar collapses to icon-only (80px) or expands (260px)
    const showSidebar = isMobile ? sidebarOpen : true;
    const isExpanded = isMobile ? true : sidebarOpen; // mobile sidebar is always full-width when visible

    return (
        <>
            {/* Mobile blur overlay */}
            <AnimatePresence>
                {isMobile && sidebarOpen && (
                    <motion.div
                        className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSidebarOpen(false)}
                    />
                )}
            </AnimatePresence>

            {/* Sidebar */}
            <AnimatePresence>
                {showSidebar && (
                    <motion.aside
                        className={`
                            ${isMobile ? 'fixed top-0 left-0 z-50 h-full shadow-2xl' : 'relative z-auto'}
                            bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 flex flex-col
                        `}
                        initial={isMobile ? { x: -280 } : false}
                        animate={{
                            width: isExpanded ? 260 : 80,
                            x: 0,
                        }}
                        exit={isMobile ? { x: -280 } : undefined}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    >
                        {/* Logo */}
                        <div className="flex items-center justify-between h-16 px-5 border-b border-gray-200 dark:border-gray-800">
                            <AnimatePresence mode="wait">
                                {isExpanded ? (
                                    <motion.div
                                        key="full-logo"
                                        className="flex items-center gap-2.5"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <Image src="/logo.png" alt="Digonto Logo" width={44} height={44} className="rounded-xl shadow-lg object-contain dark:brightness-125 dark:drop-shadow-[0_0_8px_rgba(255,255,255,0.15)]" />
                                        <div className="flex flex-col">
                                            <span className="text-base font-bold text-gray-900 dark:text-white leading-none">
                                                Digonto
                                            </span>
                                            <span className="text-xs text-gray-500 dark:text-gray-400 leading-tight">
                                                দিগন্ত
                                            </span>
                                        </div>
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="icon-logo"
                                        className="mx-auto"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <Image src="/logo.png" alt="Digonto Logo" width={44} height={44} className="rounded-xl shadow-lg object-contain dark:brightness-125 dark:drop-shadow-[0_0_8px_rgba(255,255,255,0.15)]" />
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Close on mobile, collapse chevron on desktop */}
                            {isMobile ? (
                                <motion.button
                                    onClick={() => setSidebarOpen(false)}
                                    className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <X className="w-5 h-5" />
                                </motion.button>
                            ) : (
                                <motion.button
                                    onClick={toggleSidebar}
                                    className={`p-1.5 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${!sidebarOpen ? 'mx-auto' : ''}`}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <motion.div
                                        animate={{ rotate: sidebarOpen ? 0 : 180 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <ChevronLeft className="w-5 h-5" />
                                    </motion.div>
                                </motion.button>
                            )}
                        </div>

                        {/* Nav items */}
                        <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
                            {navItems.map((item) => {
                                const Icon = item.icon;
                                const isActive = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);
                                return (
                                    <Link
                                        key={item.label}
                                        href={item.href}
                                        onClick={() => { if (isMobile) setSidebarOpen(false); }}
                                        className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all relative group hover:translate-x-1
                                            ${isActive
                                                ? `${colors.primaryBgSubtle} ${colors.primaryText}`
                                                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/50 hover:text-gray-900 dark:hover:text-gray-200'
                                            }
                                            ${!isExpanded ? 'justify-center hover:translate-x-0' : ''}
                                        `}
                                    >
                                        {isActive && (
                                            <motion.div
                                                className={`absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 rounded-r-full ${colors.primaryBg}`}
                                                layoutId="activeIndicator"
                                                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                                            />
                                        )}
                                        <Icon className="w-5 h-5 flex-shrink-0" />
                                        <AnimatePresence>
                                            {isExpanded && (
                                                <motion.span
                                                    initial={{ opacity: 0, width: 0 }}
                                                    animate={{ opacity: 1, width: 'auto' }}
                                                    exit={{ opacity: 0, width: 0 }}
                                                    transition={{ duration: 0.2 }}
                                                    className="whitespace-nowrap overflow-hidden"
                                                >
                                                    {item.label}
                                                </motion.span>
                                            )}
                                        </AnimatePresence>
                                    </Link>
                                );
                            })}
                        </nav>

                        {/* Bottom */}
                        <AnimatePresence>
                            {isExpanded && (
                                <motion.div
                                    className="p-4 border-t border-gray-200 dark:border-gray-800"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                >
                                    <div className="p-3 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800/50 dark:to-gray-800/30">
                                        <p className="text-xs font-medium text-gray-700 dark:text-gray-300">
                                            Digonto EdTech
                                        </p>
                                        <p className="text-[10px] text-gray-500 dark:text-gray-400 mt-0.5">
                                            v1.0.0 • Bangladesh
                                        </p>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.aside>
                )}
            </AnimatePresence>
        </>
    );
}
