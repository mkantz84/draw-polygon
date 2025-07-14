import { hasSelfIntersections } from "@/lib/utils/polygonValidation";

// Utility for common validations

export function isValidPoints(points: unknown): { valid: boolean; message?: string } {
  if (
    !Array.isArray(points) ||
    !points.every(
      (pt: unknown) =>
        Array.isArray(pt) &&
        pt.length === 2 &&
        pt.every((n) => typeof n === "number" && Number.isFinite(n))
    )
  ) {
    return { valid: false, message: "Points must be an array of [number, number] pairs." };
  }

  // Check for self-intersections
  if (hasSelfIntersections(points as number[][])) {
    return { valid: false, message: "Polygon edges cannot intersect." };
  }

  return { valid: true };
}
