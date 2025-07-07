import React from "react";
import { render } from "@testing-library/react";
import ArrowDownIndicator from "../../src/components/ArrowDownIndicator";

describe("ArrowDownIndicator", () => {
  it("renders the arrow SVG", () => {
    const { container } = render(<ArrowDownIndicator />);
    expect(container.querySelector("svg")).toBeInTheDocument();
  });
});
