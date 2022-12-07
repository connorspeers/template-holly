import * as z from "zod";
import { ApiError } from "./error";

export async function parse<S extends z.ZodSchema>(
  schema: S,
  input: unknown,
): Promise<z.output<S>> {
  const data = await schema.safeParseAsync(input);
  if (!data.success) {
    const formatted = data.error.format();
    throw new ApiError("bad_input", {
      status: 400,
      expose: formatted,
    });
  }
  return data.data;
}
