'use client';
import { useState, useEffect } from 'react';
import { Item } from '@/app/lib/item';

export function useItems(limit: number = 10) {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);

  const fetchItems = async (lastEvaluatedKey?: string) => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        limit: limit.toString(),
        ...(lastEvaluatedKey && { lastEvaluatedKey })
      });
      
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/all?${params}`);
      const data = await response.json();
      
      setItems(prev => [...prev, ...data.Items]);
      setHasMore(!!data.LastEvaluatedKey);
    } catch {
      setError('Failed to fetch items');
    } finally {
      setLoading(false);
    }
  };

  const refresh = () => {
    setItems([]);
    setHasMore(true);
    fetchItems();
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return { items, loading, error, hasMore, fetchMore: fetchItems, refresh };
}