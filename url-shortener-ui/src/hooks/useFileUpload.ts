'use client';
import { useState } from 'react';

export function useFileUpload() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);

  const uploadFile = async (file: File) => {
    setLoading(true);
    setError(null);
    setProgress(0);
    
    const formData = new FormData();
    formData.append('file', file);
    
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/upload`, {
        method: 'POST',
        body: formData
      });
      const data = await response.json();
      setProgress(100);
      return data;
    } catch (err) {
      setError('Failed to upload file');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { uploadFile, loading, error, progress };
}