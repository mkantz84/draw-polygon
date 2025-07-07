import { useRef, useEffect, useState } from "react";
import { CANVAS_SIZE, POINT_RADIUS } from "@/lib/constants";

export function usePolygonCanvas(
  points: number[][],
  onChange: (points: number[][]) => void
) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [bgUrl, setBgUrl] = useState<string>("");

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
      ctx.strokeStyle = "#1e293b"; // slate-800 for better contrast
      ctx.lineWidth = 3;
      ctx.stroke();
      ctx.closePath();
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
  }, [points]);

  // Handle click to add a point
  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    onChange([...points, [x, y]]);
  };

  return { bgUrl, canvasRef, handleCanvasClick };
}
