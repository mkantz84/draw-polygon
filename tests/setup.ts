import "@testing-library/jest-dom";

// Mock canvas getContext to silence jsdom errors
Object.defineProperty(HTMLCanvasElement.prototype, "getContext", {
  value: () => ({
    clearRect: () => {},
    beginPath: () => {},
    moveTo: () => {},
    lineTo: () => {},
    stroke: () => {},
    closePath: () => {},
    arc: () => {},
    fill: () => {},
    strokeStyle: "",
    fillStyle: "",
    lineWidth: 1,
    getImageData: () => ({}),
    putImageData: () => {},
  }),
});
