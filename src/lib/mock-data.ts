import type { KPIData, RevenueData, OrderData, EnrollmentData, UserTypeData, DateRange } from '@/types';

const multiplier: Record<DateRange, number> = {
    '7d': 0.25,
    '30d': 1,
    '12m': 12,
};

export function getKPIData(range: DateRange): KPIData[] {
    const m = multiplier[range];
    return [
        {
            title: 'Total Revenue',
            value: `$${Math.round(54230 * m).toLocaleString()}`,
            change: 12.5,
            trend: 'up',
            sparkline: [30, 40, 35, 50, 49, 60, 70, 65, 80, 75, 85, 90].map((v) => v * m),
        },
        {
            title: 'Total Users',
            value: Math.round(1245 * m).toLocaleString(),
            change: 3.2,
            trend: 'up',
            sparkline: [100, 120, 115, 130, 140, 135, 150, 160, 155, 170, 175, 180].map((v) => v * m),
        },
        {
            title: 'Orders',
            value: Math.round(342 * m).toLocaleString(),
            change: -1.1,
            trend: 'down',
            sparkline: [40, 38, 42, 35, 30, 33, 28, 32, 29, 25, 27, 30].map((v) => v * m),
        },
        {
            title: 'Conversion Rate',
            value: '4.3%',
            change: 0.5,
            trend: 'up',
            sparkline: [3.2, 3.5, 3.4, 3.8, 3.9, 4.0, 3.8, 4.1, 4.0, 4.2, 4.1, 4.3],
        },
    ];
}

export function getRevenueData(range: DateRange): RevenueData[] {
    const m = multiplier[range];
    return [
        { month: 'Jan', revenue: Math.round(4000 * m) },
        { month: 'Feb', revenue: Math.round(3000 * m) },
        { month: 'Mar', revenue: Math.round(5000 * m) },
        { month: 'Apr', revenue: Math.round(4500 * m) },
        { month: 'May', revenue: Math.round(6000 * m) },
        { month: 'Jun', revenue: Math.round(5500 * m) },
        { month: 'Jul', revenue: Math.round(7000 * m) },
        { month: 'Aug', revenue: Math.round(6500 * m) },
        { month: 'Sep', revenue: Math.round(8000 * m) },
        { month: 'Oct', revenue: Math.round(7500 * m) },
        { month: 'Nov', revenue: Math.round(9000 * m) },
        { month: 'Dec', revenue: Math.round(8500 * m) },
    ];
}

export function getOrderData(range: DateRange): OrderData[] {
    const m = multiplier[range];
    return [
        { month: 'Jan', orders: Math.round(30 * m) },
        { month: 'Feb', orders: Math.round(25 * m) },
        { month: 'Mar', orders: Math.round(35 * m) },
        { month: 'Apr', orders: Math.round(28 * m) },
        { month: 'May', orders: Math.round(40 * m) },
        { month: 'Jun', orders: Math.round(32 * m) },
        { month: 'Jul', orders: Math.round(45 * m) },
        { month: 'Aug', orders: Math.round(38 * m) },
        { month: 'Sep', orders: Math.round(50 * m) },
        { month: 'Oct', orders: Math.round(42 * m) },
        { month: 'Nov', orders: Math.round(55 * m) },
        { month: 'Dec', orders: Math.round(48 * m) },
    ];
}

export function getEnrollmentData(range: DateRange): EnrollmentData[] {
    const m = multiplier[range];
    return [
        { month: 'Jan', enrollments: Math.round(120 * m) },
        { month: 'Feb', enrollments: Math.round(150 * m) },
        { month: 'Mar', enrollments: Math.round(180 * m) },
        { month: 'Apr', enrollments: Math.round(160 * m) },
        { month: 'May', enrollments: Math.round(200 * m) },
        { month: 'Jun', enrollments: Math.round(220 * m) },
        { month: 'Jul', enrollments: Math.round(190 * m) },
        { month: 'Aug', enrollments: Math.round(250 * m) },
        { month: 'Sep', enrollments: Math.round(280 * m) },
        { month: 'Oct', enrollments: Math.round(260 * m) },
        { month: 'Nov', enrollments: Math.round(300 * m) },
        { month: 'Dec', enrollments: Math.round(320 * m) },
    ];
}

export function getUserTypeData(): UserTypeData[] {
    return [
        { name: 'Free', value: 650, color: '#6366f1' },
        { name: 'Premium', value: 420, color: '#10b981' },
        { name: 'Enterprise', value: 175, color: '#f59e0b' },
    ];
}
