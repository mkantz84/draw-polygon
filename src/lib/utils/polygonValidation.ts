
// src/lib/utils/polygonValidation.ts

/**
 * Checks if two line segments intersect.
 * Line 1: (p1, q1), Line 2: (p2, q2)
 */
function doIntersect(p1: number[], q1: number[], p2: number[], q2: number[]): boolean {
  function onSegment(p: number[], q: number[], r: number[]): boolean {
    return (
      q[0] <= Math.max(p[0], r[0]) &&
      q[0] >= Math.min(p[0], r[0]) &&
      q[1] <= Math.max(p[1], r[1]) &&
      q[1] >= Math.min(p[1], r[1])
    );
  }

  function orientation(p: number[], q: number[], r: number[]): number {
    const val = (q[1] - p[1]) * (r[0] - q[0]) - (q[0] - p[0]) * (r[1] - q[1]);
    if (val === 0) return 0; // Collinear
    return val > 0 ? 1 : 2; // Clockwise or Counterclockwise
  }

  const o1 = orientation(p1, q1, p2);
  const o2 = orientation(p1, q1, q2);
  const o3 = orientation(p2, q2, p1);
  const o4 = orientation(p2, q2, q1);

  if (o1 !== o2 && o3 !== o4) {
    return true;
  }

  // Special Cases for collinear points
  if (o1 === 0 && onSegment(p1, p2, q1)) return true;
  if (o2 === 0 && onSegment(p1, q2, q1)) return true;
  if (o3 === 0 && onSegment(p2, p1, q2)) return true;
  if (o4 === 0 && onSegment(p2, q1, q2)) return true;

  return false;
}

/**
 * Checks if a polygon has self-intersections.
 */
export function hasSelfIntersections(points: number[][]): boolean {
  const n = points.length;
  if (n <= 3) {
    return false;
  }

  const polygonIsClosed = isClosed(points);

  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      const p1 = points[i];
      const q1 = points[(i + 1) % n];
      const p2 = points[j];
      const q2 = points[(j + 1) % n];

      // Skip adjacent segments
      if ((j + 1) % n === i || (i + 1) % n === j) {
        continue;
      }

      // If polygon is closed, skip check between first and last segments
      // The first segment is (points[0], points[1])
      // The last segment is (points[n-2], points[n-1]) which is (points[n-2], points[0])
      if (polygonIsClosed && i === 0 && j === n - 2) {
        continue;
      }

      if (doIntersect(p1, q1, p2, q2)) {
        return true;
      }
    }
  }

  return false;
}

/**
 * Checks if a polygon is closed.
 */
export function isClosed(points: number[][]): boolean {
  if (points.length < 3) {
    return false;
  }
  const first = points[0];
  const last = points[points.length - 1];
  return first[0] === last[0] && first[1] === last[1];
}
