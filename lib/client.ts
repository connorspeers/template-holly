import { ApiError } from "./error";

export type ApiResponse<T = unknown> = {
  ok: true;
  data: T;
} | {
  ok: false;
  error: string;
  data?: unknown;
};

export async function client(url: string, body?: unknown) {
  body = body ?? null;

  const res = await fetch(url, {
    method: typeof body === "undefined" ? "GET" : "POST",
    body: body === null ? undefined : JSON.stringify(body),
    headers: body === null ? undefined : {
      "content-type": "application/json",
    },
  });

  const json = (
    !res.headers.get("content-type")?.startsWith("application/json") ? null
    : await res.json()
  );
  if (!res.ok || !json || !json.ok) {
    throw new ApiError(json ? json.error : "unknown", {
      status: res.status,
      detail: { res, json },
      expose: json?.data,
    });
  }
  return json.data;
}
