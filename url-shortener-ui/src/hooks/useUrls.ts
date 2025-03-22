'use client';
import { useState } from 'react';

export function useUrls() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const shortenUrl = async (url: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/url`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url })
      });
      const data = await response.json();
      return data;
    } catch (err) {
      setError('Failed to shorten URL');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { shortenUrl, loading, error };
}