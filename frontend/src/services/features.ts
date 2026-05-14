const API_BASE_URL = 'http://127.0.0.1:8000/api/v1';

export interface SpatialFeature {
  id: string;
  name: string;
  type: string;
  attributes: any;
  created_at: string;
  geom: any; // GeoJSON object
}

export async function fetchFeatures(): Promise<SpatialFeature[]> {
  const response = await fetch(`${API_BASE_URL}/features/`);
  if (!response.ok) {
    throw new Error(`Gagal mengambil data fitur: ${response.statusText}`);
  }
  return response.json();
}

export async function createFeature(featureData: any): Promise<SpatialFeature> {
  const token = localStorage.getItem('token');
  
  const response = await fetch(`${API_BASE_URL}/features/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(featureData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || 'Gagal membuat fitur');
  }

  return response.json();
}
