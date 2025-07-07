import React from "react";
import { render, screen } from "@testing-library/react";
import Loader from "../../src/components/Loader";

describe("Loader", () => {
  it("renders large loader by default", () => {
    render(<Loader />);
    expect(screen.getByLabelText(/loading/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/loading/i)).toHaveClass("w-12");
  });

  it("renders small loader when size is sm", () => {
    render(<Loader size="sm" />);
    expect(screen.getByLabelText(/loading/i)).toHaveClass("w-6");
  });
});
