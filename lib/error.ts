export class ApiError extends Error {
  status: number;
  detail?: unknown;
  expose?: unknown;

  constructor(message: string, init?: {
    status?: number;
    detail?: unknown;
    expose?: unknown;
  }) {
    super(message);
    this.status = init?.status ?? 500;
    this.detail = init?.detail ?? null;
    this.expose = init?.expose ?? null;
  }
}
