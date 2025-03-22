import { Item } from "@/app/lib/types";
import { useState, useEffect } from "react";

export function useItems() {
    const [items, setItems] = useState<Item[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
  
    useEffect(() => {
      async function fetchItems() {
        setLoading(true);
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/all`);
          const data = await response.json();
          setItems(data.Items);
        } catch (err) {
          setError('Failed to fetch items');
        } finally {
          setLoading(false);
        }
      }
      fetchItems();
    }, []);
  
    return { items, loading, error };
  }