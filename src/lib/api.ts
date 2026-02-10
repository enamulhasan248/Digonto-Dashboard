import type { KPIData, RevenueData, OrderData, EnrollmentData, UserTypeData, Student, Transaction, Report } from '@/types';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

async function fetchJson<T>(endpoint: string): Promise<T> {
    const res = await fetch(`${API}${endpoint}`);
    if (!res.ok) throw new Error(`API error: ${res.status} ${res.statusText}`);
    return res.json();
}

export const fetchStats = () => fetchJson<KPIData[]>('/stats');
export const fetchRevenue = () => fetchJson<RevenueData[]>('/revenue');
export const fetchOrders = () => fetchJson<OrderData[]>('/orders');
export const fetchEnrollments = () => fetchJson<EnrollmentData[]>('/enrollments');
export const fetchUserTypes = () => fetchJson<UserTypeData[]>('/userTypes');
export const fetchStudents = () => fetchJson<Student[]>('/students');
export const fetchTransactions = () => fetchJson<Transaction[]>('/transactions');
export const fetchReports = () => fetchJson<Report[]>('/reports');
