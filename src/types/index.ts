export type Role = 'admin' | 'manager';
export type Theme = 'light' | 'dark';
export type DateRange = '7d' | '30d' | '12m';

export interface User {
  email: string;
  name: string;
  role: Role;
}

export interface KPIData {
  id?: number;
  title: string;
  value: string;
  change: number;
  trend: 'up' | 'down';
  sparkline: number[];
}

export interface RevenueData {
  id?: number;
  month: string;
  revenue?: number;
  income?: number;
  expense?: number;
}

export interface OrderData {
  id?: number;
  month: string;
  orders: number;
}

export interface EnrollmentData {
  id?: number;
  month: string;
  enrollments: number;
}

export interface UserTypeData {
  id?: number;
  name: string;
  value: number;
  color: string;
}

export interface Student {
  id: number;
  name: string;
  email: string;
  phone: string;
  course: string;
  enrolled: string;
  status: 'Active' | 'Inactive' | 'Graduated';
  progress: number;
}

export interface Transaction {
  id: number;
  user: string;
  type: string;
  amount: number;
  date: string;
  status: 'Completed' | 'Pending' | 'Refunded';
}

export interface Report {
  id: number;
  title: string;
  description: string;
  type: string;
  icon: string;
  date: string;
  size: string;
  status: 'Ready' | 'Generating' | 'Scheduled';
}

export interface NavItem {
  label: string;
  icon: string;
  href: string;
  badge?: number;
}

export interface DashboardState {
  role: Role;
  user: User | null;
  theme: Theme;
  dateRange: DateRange;
  sidebarOpen: boolean;
  isLoading: boolean;
  hasError: boolean;
  setRole: (role: Role) => void;
  setUser: (user: User | null) => void;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  setTheme: (theme: Theme) => void;
  setDateRange: (range: DateRange) => void;
  setSidebarOpen: (open: boolean) => void;
  toggleSidebar: () => void;
  setLoading: (loading: boolean) => void;
  setError: (error: boolean) => void;
}

