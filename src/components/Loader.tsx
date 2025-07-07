"use client";
import React from "react";

type LoaderProps = {
  size?: "sm" | "lg";
};

const Loader: React.FC<LoaderProps> = ({ size = "lg" }) => (
  <div
    className={`flex justify-center items-center ${
      size === "sm" ? "h-8 w-full" : "h-64 w-full"
    }`}
  >
    <span
      className={`inline-block ${
        size === "sm" ? "w-6 h-6 border-2" : "w-12 h-12 border-4"
      } border-blue-400 border-t-transparent rounded-full animate-spin`}
      aria-label="Loading"
    />
  </div>
);

export default Loader;
