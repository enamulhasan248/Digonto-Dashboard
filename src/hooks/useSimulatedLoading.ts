'use client';

import { useEffect, useState } from 'react';

export function useSimulatedLoading(delay: number = 1500) {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), delay);
        return () => clearTimeout(timer);
    }, [delay]);

    return isLoading;
}
