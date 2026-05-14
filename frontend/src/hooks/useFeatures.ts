import { useState, useEffect } from 'react';
import { fetchFeatures } from '../services/features';
import type { SpatialFeature } from '../services/features';

export function useFeatures() {
  const [features, setFeatures] = useState<SpatialFeature[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadFeatures() {
      try {
        setLoading(true);
        const data = await fetchFeatures();
        setFeatures(data);
        setError(null);
      } catch (err: any) {
        setError(err.message || 'Terjadi kesalahan saat memuat data');
      } finally {
        setLoading(false);
      }
    }

    loadFeatures();
  }, []);

  return { features, loading, error };
}
