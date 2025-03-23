'use client';
import { useState, useEffect } from 'react';
import { Item } from '@/app/lib/types';

export function useItems() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);


  const fetchItems = async (lastEvaluatedKey?: string) => {
    setLoading(true);
    try {

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/all?`);
      const data = await response.json();
      
      setItems(prev => [...prev, ...data.Items]);
    } catch {
      setError('Failed to fetch items');
    } finally {
      setLoading(false);
    }
  };

  const refresh = () => {
    setItems([]);
    fetchItems();
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return { items, loading, error, fetchMore: fetchItems, refresh };
}