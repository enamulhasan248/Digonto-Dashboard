'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
    Settings as SettingsIcon,
    User,
    Bell,
    Shield,
    Palette,
    Globe,
    Save,
    Check,
} from 'lucide-react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { useDashboardStore } from '@/store';
import { useRoleColors } from '@/hooks/useTheme';

export default function SettingsPage() {
    const { role, theme } = useDashboardStore();
    const colors = useRoleColors();
    const [saved, setSaved] = useState(false);

    const [form, setForm] = useState({
        name: 'Enamul Hasan',
        email: 'enamul@digonto.edu.bd',
        phone: '+880 171 000 0000',
        org: 'Digonto EdTech',
        language: 'English',
        timezone: 'Asia/Dhaka (GMT+6)',
        emailNotif: true,
        pushNotif: true,
        weeklyReport: true,
        marketingEmails: false,
        twoFactor: false,
    });

    const handleSave = () => {
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    const Toggle = ({ checked, onChange }: { checked: boolean; onChange: () => void }) => (
        <motion.button
            onClick={onChange}
            className={`relative w-11 h-6 rounded-full transition-colors ${checked ? colors.primaryBg : 'bg-gray-300 dark:bg-gray-600'}`}
            whileTap={{ scale: 0.95 }}
        >
            <motion.div
                className="absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-md"
                animate={{ left: checked ? 22 : 2 }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            />
        </motion.button>
    );

    const sections = [
        {
            icon: User,
            title: 'Profile Information',
            description: 'Update your personal details',
            content: (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                        { label: 'Full Name', value: form.name, key: 'name' },
                        { label: 'Email', value: form.email, key: 'email' },
                        { label: 'Phone', value: form.phone, key: 'phone' },
                        { label: 'Organization', value: form.org, key: 'org' },
                    ].map((field) => (
                        <div key={field.key}>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                                {field.label}
                            </label>
                            <input
                                type="text"
                                value={field.value}
                                onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                                className="w-full px-3.5 py-2.5 text-sm bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 transition-shadow"
                            />
                        </div>
                    ))}
                </div>
            ),
        },
        {
            icon: Globe,
            title: 'Regional Settings',
            description: 'Configure language and timezone',
            content: (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Language</label>
                        <select
                            value={form.language}
                            onChange={(e) => setForm({ ...form, language: e.target.value })}
                            className="w-full px-3.5 py-2.5 text-sm bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2"
                        >
                            <option>English</option>
                            <option>বাংলা (Bengali)</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Timezone</label>
                        <select
                            value={form.timezone}
                            onChange={(e) => setForm({ ...form, timezone: e.target.value })}
                            className="w-full px-3.5 py-2.5 text-sm bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2"
                        >
                            <option>Asia/Dhaka (GMT+6)</option>
                            <option>UTC (GMT+0)</option>
                            <option>US/Eastern (GMT-5)</option>
                        </select>
                    </div>
                </div>
            ),
        },
        {
            icon: Bell,
            title: 'Notifications',
            description: 'Manage notification preferences',
            content: (
                <div className="space-y-4">
                    {[
                        { label: 'Email Notifications', desc: 'Receive updates via email', key: 'emailNotif' as const },
                        { label: 'Push Notifications', desc: 'Browser push notifications', key: 'pushNotif' as const },
                        { label: 'Weekly Reports', desc: 'Get weekly summary emails', key: 'weeklyReport' as const },
                        { label: 'Marketing Emails', desc: 'Promotional content and offers', key: 'marketingEmails' as const },
                    ].map((item) => (
                        <div key={item.key} className="flex items-center justify-between py-1">
                            <div>
                                <div className="text-sm font-medium text-gray-900 dark:text-white">{item.label}</div>
                                <div className="text-xs text-gray-500 dark:text-gray-400">{item.desc}</div>
                            </div>
                            <Toggle checked={form[item.key]} onChange={() => setForm({ ...form, [item.key]: !form[item.key] })} />
                        </div>
                    ))}
                </div>
            ),
        },
        {
            icon: Shield,
            title: 'Security',
            description: 'Manage your account security',
            content: (
                <div className="space-y-4">
                    <div className="flex items-center justify-between py-1">
                        <div>
                            <div className="text-sm font-medium text-gray-900 dark:text-white">Two-Factor Authentication</div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">Add an extra layer of security</div>
                        </div>
                        <Toggle checked={form.twoFactor} onChange={() => setForm({ ...form, twoFactor: !form.twoFactor })} />
                    </div>
                    <div>
                        <button className="px-4 py-2 text-sm font-medium rounded-xl bg-gray-100 dark:bg-gray-700/50 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                            Change Password
                        </button>
                    </div>
                </div>
            ),
        },
        {
            icon: Palette,
            title: 'Appearance',
            description: 'Current visual preferences',
            content: (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700">
                        <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Current Theme</div>
                        <div className="text-sm font-semibold text-gray-900 dark:text-white capitalize">{theme} Mode</div>
                    </div>
                    <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700">
                        <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Active Role</div>
                        <div className={`text-sm font-semibold capitalize ${colors.primaryText}`}>{role}</div>
                    </div>
                </div>
            ),
        },
    ];

    return (
        <DashboardLayout>
            <div className="p-4 lg:p-6 space-y-6 max-w-3xl mx-auto">
                {/* Header */}
                <motion.div
                    className="flex items-center justify-between"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                            <SettingsIcon className="w-7 h-7" />
                            Settings
                        </h1>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                            Manage your account and preferences.
                        </p>
                    </div>
                    <motion.button
                        onClick={handleSave}
                        className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-white text-sm font-medium ${colors.primaryBg} ${colors.hover} transition-colors`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        {saved ? <><Check className="w-4 h-4" /> Saved!</> : <><Save className="w-4 h-4" /> Save Changes</>}
                    </motion.button>
                </motion.div>

                {/* Settings Sections */}
                {sections.map((section, i) => {
                    const Icon = section.icon;
                    return (
                        <motion.div
                            key={section.title}
                            className="rounded-2xl border border-gray-200 dark:border-gray-700/50 bg-white dark:bg-gray-800/50 overflow-hidden"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.08 }}
                        >
                            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex items-center gap-3">
                                <div className={`p-2 rounded-lg ${colors.primaryBgSubtle}`}>
                                    <Icon className={`w-4 h-4 ${colors.primaryText}`} />
                                </div>
                                <div>
                                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white">{section.title}</h3>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">{section.description}</p>
                                </div>
                            </div>
                            <div className="px-6 py-5">
                                {section.content}
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </DashboardLayout>
    );
}
