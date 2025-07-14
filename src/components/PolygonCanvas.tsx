"use client";
import React from "react";
import Image from "next/image";
import { usePolygonCanvas } from "@/hooks/usePolygonCanvas";
import { CANVAS_SIZE } from "@/lib/constants";
import { isClosed } from "@/lib/utils/polygonValidation";

type PolygonCanvasProps = {
  points: number[][];
  onChange: (points: number[][]) => void;
};

const PolygonCanvas: React.FC<PolygonCanvasProps> = ({ points, onChange }) => {
  const {
    bgUrl,
    canvasRef,
    handleCanvasClick,
    error,
    startNewPath,
    clearLastPoint,
    closePath,
  } = usePolygonCanvas(
    points,
    onChange,
    isClosed(points) // Pass isClosed directly from points
  );

  const pathIsClosed = isClosed(points);

  return (
    <div
      className="relative border rounded-xl bg-white shadow-lg p-4 flex flex-col items-center w-full max-w-md focus-within:ring-2 focus-within:ring-blue-500"
      tabIndex={-1}
      aria-label="Polygon drawing canvas"
    >
      <h2 className="text-xl font-bold mb-3 text-slate-800">Draw Polygon</h2>
      <div className="relative w-full max-w-md h-[400px] border-2 border-slate-800 rounded-lg overflow-hidden">
        {bgUrl && (
          <Image
            src={bgUrl}
            alt="Random background"
            fill
            className="absolute top-0 left-0 w-full h-full object-cover z-0 select-none"
            aria-hidden="true"
            draggable={false}
            priority
          />
        )}
        <canvas
          ref={canvasRef}
          width={CANVAS_SIZE}
          height={CANVAS_SIZE}
          className={`relative z-10 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-transparent ${
            pathIsClosed ? "cursor-not-allowed" : "cursor-crosshair"
          }`}
          onClick={pathIsClosed ? undefined : handleCanvasClick}
          aria-label="Polygon drawing area"
        >
          Your browser does not support the HTML canvas tag.
        </canvas>
      </div>
      {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
      <div className="flex flex-wrap justify-center gap-2 mt-4">
        <button
          onClick={closePath}
          disabled={points.length < 3 || pathIsClosed || error !== null}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Close Path
        </button>
        <button
          onClick={clearLastPoint}
          disabled={points.length === 0 || pathIsClosed}
          className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Clear Last Point
        </button>
        <button
          onClick={startNewPath}
          className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
        >
          Start New Path
        </button>
      </div>
      <p className="text-sm text-slate-700 mt-2">
        {pathIsClosed
          ? "Polygon closed. Start a new path or clear points."
          : "Click to add points."}
      </p>
    </div>
  );
};

export default PolygonCanvas;
