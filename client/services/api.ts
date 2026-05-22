import { API_BASE_URL } from "@/lib/constants";
import { useAuthStore } from "@/store/useAuthStore";

const buildHeaders = () => {
  const headers: HeadersInit = {
    "Content-Type": "application/json"
  };

  const token = useAuthStore.getState().token;

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return headers;
};

const request = async <T>(input: string, init?: RequestInit) => {
  const url = `${API_BASE_URL}${input}`;
  const res = await fetch(url, {
    ...init,
    headers: {
      ...buildHeaders(),
      ...(init?.headers ?? {})
    },
    credentials: "include"
  });

  if (res.status === 401) {
    useAuthStore.getState().logout();
  }

  if (!res.ok) {
    const payload = await res.json().catch(() => ({ message: "Request failed" }));
    throw new Error(payload.message ?? "Request failed");
  }

  return (res.status === 204 ? (null as T) : ((await res.json()) as T));
};

export const api = {
  get: <T>(path: string) => request<T>(path),
  post: <T>(path: string, body?: unknown) =>
    request<T>(path, { method: "POST", body: body ? JSON.stringify(body) : undefined }),
  patch: <T>(path: string, body?: unknown) =>
    request<T>(path, { method: "PATCH", body: body ? JSON.stringify(body) : undefined }),
  del: <T>(path: string) => request<T>(path, { method: "DELETE" })
};
