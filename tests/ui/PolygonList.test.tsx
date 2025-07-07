import React from "react";
import { render } from "@testing-library/react";
import { screen } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import PolygonList from "../../src/components/PolygonList";

describe("PolygonList", () => {
  const polygons = [
    {
      id: 1,
      name: "Triangle",
      points: [
        [0, 0],
        [1, 1],
        [2, 0],
      ],
    },
    {
      id: 2,
      name: "Square",
      points: [
        [0, 0],
        [0, 1],
        [1, 1],
        [1, 0],
      ],
    },
  ];
  const onDelete = vi.fn();
  const onSelect = vi.fn();

  it("renders a list of polygons", () => {
    render(
      <PolygonList
        polygons={polygons}
        onDelete={onDelete}
        onSelect={onSelect}
        selectedId={null}
        loading={false}
        hasMore={false}
      />
    );
    expect(screen.getByText("Triangle")).toBeInTheDocument();
    expect(screen.getByText("Square")).toBeInTheDocument();
  });

  it("shows empty state when no polygons", () => {
    render(
      <PolygonList
        polygons={[]}
        onDelete={onDelete}
        onSelect={onSelect}
        selectedId={null}
        loading={false}
        hasMore={false}
      />
    );
    expect(screen.getByText(/no polygons saved yet/i)).toBeInTheDocument();
  });

  it("calls onSelect when a row is clicked", async () => {
    render(
      <PolygonList
        polygons={polygons}
        onDelete={onDelete}
        onSelect={onSelect}
        selectedId={null}
        loading={false}
        hasMore={false}
      />
    );
    await userEvent.click(screen.getByText("Triangle"));
    expect(onSelect).toHaveBeenCalledWith(polygons[0]);
  });

  it("calls onDelete when delete button is clicked", async () => {
    render(
      <PolygonList
        polygons={polygons}
        onDelete={onDelete}
        onSelect={onSelect}
        selectedId={null}
        loading={false}
        hasMore={false}
      />
    );
    await userEvent.click(
      screen.getAllByRole("button", { name: /delete/i })[0]
    );
    expect(onDelete).toHaveBeenCalledWith(polygons[0].id);
  });
});
