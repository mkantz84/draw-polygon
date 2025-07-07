import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import PolygonCanvas from "../../src/components/PolygonCanvas";

describe("PolygonCanvas", () => {
  it("renders canvas and background image", () => {
    render(<PolygonCanvas points={[]} onChange={() => {}} />);
    expect(screen.getByLabelText(/polygon drawing area/i)).toBeInTheDocument();
  });

  it("calls onChange when canvas is clicked", async () => {
    const onChange = vi.fn();
    render(<PolygonCanvas points={[]} onChange={onChange} />);
    await userEvent.click(screen.getByLabelText(/polygon drawing area/i));
    expect(onChange).toHaveBeenCalled();
  });
});
