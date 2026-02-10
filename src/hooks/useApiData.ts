'use client';

import { useState, useEffect, useCallback } from 'react';

export function useApiData<T>(fetchFn: () => Promise<T>) {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const load = useCallback(() => {
        setLoading(true);
        setError(null);
        fetchFn()
            .then((result) => {
                setData(result);
                setLoading(false);
            })
            .catch((err) => {
                setError(err instanceof Error ? err.message : 'Failed to fetch data');
                setLoading(false);
            });
    }, [fetchFn]);

    useEffect(() => {
        load();
    }, [load]);

    return { data, loading, error, refetch: load };
}
