"use client";

import React from "react";

const ArrowDownIndicator: React.FC = () => (
  <div className="pointer-events-none absolute -bottom-3 left-1/2 -translate-x-1/2 z-20 flex justify-center w-full">
    <svg
      className="animate-bounce w-6 h-6 text-blue-400 opacity-80"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  </div>
);

export default ArrowDownIndicator;
