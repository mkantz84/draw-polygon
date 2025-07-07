"use client";
import React from "react";
import Image from "next/image";
import { usePolygonCanvas } from "@/hooks/usePolygonCanvas";
import { CANVAS_SIZE } from "@/lib/constants";

type PolygonCanvasProps = {
  points: number[][];
  onChange: (points: number[][]) => void;
};

const PolygonCanvas: React.FC<PolygonCanvasProps> = ({ points, onChange }) => {
  const { bgUrl, canvasRef, handleCanvasClick } = usePolygonCanvas(
    points,
    onChange
  );

  return (
    <div
      className="relative border rounded-xl bg-white shadow-lg p-4 flex flex-col items-center w-full max-w-md focus-within:ring-2 focus-within:ring-blue-500"
      tabIndex={-1}
      aria-label="Polygon drawing canvas"
    >
      <h2 className="text-xl font-bold mb-3 text-slate-800">Draw Polygon</h2>
      <div className="relative w-full max-w-md h-[400px] border-2 border-slate-800 rounded-lg">
        {bgUrl && (
          <Image
            src={bgUrl}
            alt="Random background"
            fill
            className="absolute top-0 left-0 w-full h-full object-cover rounded-lg z-0 select-none"
            aria-hidden="true"
            draggable={false}
            priority
          />
        )}
        <canvas
          ref={canvasRef}
          width={CANVAS_SIZE}
          height={CANVAS_SIZE}
          className="relative rounded-lg z-10 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-transparent cursor-crosshair"
          onClick={handleCanvasClick}
          tabIndex={0}
          aria-label="Polygon drawing area"
        >
          Your browser does not support the HTML canvas tag.
        </canvas>
      </div>
      <p className="text-sm text-slate-700 mt-2">Click to add points.</p>
    </div>
  );
};

export default PolygonCanvas;
