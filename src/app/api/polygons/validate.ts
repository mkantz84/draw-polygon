// Utility for common validations

export function isValidPoints(points: unknown): boolean {
  return (
    Array.isArray(points) &&
    points.every(
      (pt: unknown) =>
        Array.isArray(pt) &&
        pt.length === 2 &&
        pt.every((n) => typeof n === "number" && Number.isFinite(n))
    )
  );
}
