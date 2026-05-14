const API_BASE_URL = 'http://127.0.0.1:8000/api/v1';

export async function login(username: string, password: string): Promise<string> {
  const params = new URLSearchParams();
  params.append('username', username);
  params.append('password', password);

  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: params,
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || 'Gagal login');
  }

  const data = await response.json();
  return data.access_token;
}

export function setToken(token: string): void {
  localStorage.setItem('token', token);
}

export function getToken(): string | null {
  return localStorage.getItem('token');
}

export function removeToken(): void {
  localStorage.removeItem('token');
}

export function isLoggedIn(): boolean {
  return getToken() !== null;
}
