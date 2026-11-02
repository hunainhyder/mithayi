export const API_BASE = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "");
export const TENANT = process.env.NEXT_PUBLIC_TENANT_ID ?? "mithayi";

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message);
  }
}

export class NotFoundError extends ApiError {
  constructor() {
    super(404, "Not found");
  }
}

export class RateLimitError extends ApiError {
  constructor() {
    super(429, "Too many requests. Please try again in a moment.");
  }
}

export class ValidationError extends ApiError {
  constructor(
    public errors: Record<string, string[]>,
    message = "Please check the details and try again.",
  ) {
    super(422, message);
  }
}

export async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  if (!API_BASE) {
    throw new ApiError(0, "NEXT_PUBLIC_API_URL is not configured");
  }

  const res = await fetch(`${API_BASE}/api/${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "X-Tenant": TENANT,
      ...init?.headers,
    },
  });

  if (res.status === 404) throw new NotFoundError();
  if (res.status === 422) {
    const body = await res.json().catch(() => ({}));
    throw new ValidationError(body.errors ?? {}, body.message);
  }
  if (res.status === 429) throw new RateLimitError();
  if (!res.ok) throw new ApiError(res.status, `API error ${res.status}`);
  if (res.status === 204) return undefined as T;

  return res.json();
}

type QueryValue = string | number | boolean | null | undefined;

/** Builds a "?a=1&b=2" string, skipping empty values. Returns "" when nothing is set. */
export function toQuery(params: Record<string, QueryValue>): string {
  const search = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value === undefined || value === null || value === "") continue;
    search.set(key, String(value));
  }
  const qs = search.toString();
  return qs ? `?${qs}` : "";
}
