import { useRef, useEffect, useState } from "react";
import { CANVAS_SIZE, POINT_RADIUS } from "@/lib/constants";
import { hasSelfIntersections } from "@/lib/utils/polygonValidation";

export function usePolygonCanvas(
  points: number[][],
  onChange: (points: number[][]) => void,
  isPathClosed: boolean
) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [bgUrl, setBgUrl] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  // Get a random image URL on mount
  useEffect(() => {
    setBgUrl(
      `https://picsum.photos/seed/${Math.floor(
        Math.random() * 10000
      )}/${CANVAS_SIZE}/${CANVAS_SIZE}`
    );
  }, []);

  // Draw the polygon and points
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

    // Draw lines between points
    if (points.length > 0) {
      ctx.beginPath();
      ctx.moveTo(points[0][0], points[0][1]);
      for (let i = 1; i < points.length; i++) {
        ctx.lineTo(points[i][0], points[i][1]);
      }
      if (isPathClosed && points.length >= 3) {
        ctx.closePath(); // Close the path if it's marked as closed
      }
      ctx.strokeStyle = "#1e293b"; // slate-800 for better contrast
      ctx.lineWidth = 3;
      ctx.stroke();
    }

    // Draw points
    for (const [x, y] of points) {
      ctx.beginPath();
      ctx.arc(x, y, POINT_RADIUS, 0, 2 * Math.PI);
      ctx.fillStyle = "#f59e42"; // orange-400 for contrast
      ctx.strokeStyle = "#1e293b";
      ctx.lineWidth = 2;
      ctx.fill();
      ctx.stroke();
      ctx.closePath();
    }
  }, [points, isPathClosed]); // Add isPathClosed to dependency array

  // Handle click to add a point
  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (isPathClosed) {
      setError("Cannot add points to a closed polygon. Start a new path.");
      return;
    }

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const newPoints = [...points, [x, y]];

    if (hasSelfIntersections(newPoints)) {
      setError("Polygon edges cannot intersect.");
    } else {
      setError(null);
    }

    onChange(newPoints);
  };

  const startNewPath = () => {
    onChange([]); // Clear all points
    setError(null); // Clear any errors
  };

  const clearLastPoint = () => {
    if (points.length > 0) {
      const newPoints = points.slice(0, -1);
      onChange(newPoints);
      if (hasSelfIntersections(newPoints)) {
        setError("Polygon edges cannot intersect.");
      } else {
        setError(null);
      }
    }
  };

  const closePath = () => {
    if (points.length >= 3) { // A polygon needs at least 3 points to be closed
      onChange([...points, points[0]]); // Close the path by adding the first point to the end
      setError(null); // Clear any errors
    } else {
      setError("A polygon needs at least 3 points to be closed.");
    }
  };

  return { bgUrl, canvasRef, handleCanvasClick, error, startNewPath, clearLastPoint, closePath };
}
