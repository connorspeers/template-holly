export * from "./gallery";
export * from "./michigan";
export * from "./arizona";
export * from "./nyc";
export * from "./random";

import type { Gallery } from "./gallery";
import { michigan } from "./michigan";
import { arizona } from "./arizona";
import { nyc } from "./nyc";
import { random } from "./random";

// Using a map because the galleries have a specific order on the page. The keys
// are the gallery query slug used in the URL for [gallery].tsx
export const galleries = new Map<string, Gallery>([
  ["michigan", michigan],
  ["arizona", arizona],
  ["nyc", nyc],
  ["random", random],
]);
