const BASE_URL = (import.meta.env.VITE_API_BASE_URL);

type ApiOptions = RequestInit & {
  headers?: Record<string, string>;
};

export const api = async (url: string, options: ApiOptions = {}) => {
  const token = localStorage.getItem("token");
  const isFormData = options.body instanceof FormData;

  const response = await fetch(`${BASE_URL}${url}`, {
    ...options,
    headers: {
      ...options.headers,
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(isFormData ? {} : { "Content-Type": "application/json" }),
    },
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data?.message || "API request failed");
  }

  return data;
};
