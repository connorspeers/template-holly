import type { NextApiHandler } from "next";
import type { ApiResponse } from "./client";
import { ApiError } from "./error";

export function handler(
  fn: (arg: any) => Promise<unknown>,
): NextApiHandler<ApiResponse> {
  return async (req, res) => {
    try {
      res.status(200).json({
        ok: true,
        data: await fn(req.body) ?? null,
      });
    } catch (err) {
      if (err instanceof ApiError) {
        res.status(err.status).json({
          ok: false,
          error: err.message,
          data: err.expose,
        });
        return;
      }

      console.error("Internal server error", err);
      res.status(500).json({
        ok: false,
        error: "internal_server_error",
        data: null,
      });
    }
  };
}
