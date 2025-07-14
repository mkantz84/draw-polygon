import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import PolygonForm from "../../src/components/PolygonForm";

describe("PolygonForm", () => {
  it("renders input and save button", () => {
    render(<PolygonForm name="" setName={() => {}} onSave={() => {}} />);
    expect(screen.getByPlaceholderText(/polygon name/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /save/i })).toBeInTheDocument();
  });

  it("calls onSave with input value when name is provided", async () => {
    const onSave = vi.fn();
    const setName = vi.fn();
    render(<PolygonForm name="poly" setName={setName} onSave={onSave} />);
    const saveButton = screen.getByRole("button", { name: /save/i });
    expect(saveButton).toBeEnabled();
    await userEvent.click(saveButton);
    expect(onSave).toHaveBeenCalledWith("poly");
  });

  it("disables save button when name is empty", () => {
    const onSave = vi.fn();
    const setName = vi.fn();
    render(<PolygonForm name="" setName={setName} onSave={onSave} />);
    const saveButton = screen.getByRole("button", { name: /save/i });
    expect(saveButton).toBeDisabled();
  });

  it("shows edit mode and calls onDeselect", async () => {
    const onDeselect = vi.fn();
    render(
      <PolygonForm
        name="poly"
        setName={() => {}}
        onSave={() => {}}
        isEdit
        onDeselect={onDeselect}
      />
    );
    expect(
      screen.getByRole("button", { name: /deselect/i })
    ).toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: /deselect/i }));
    expect(onDeselect).toHaveBeenCalled();
  });

  it("disables input and button when disabled", () => {
    render(
      <PolygonForm name="" setName={() => {}} onSave={() => {}} disabled />
    );
    expect(screen.getByPlaceholderText(/polygon name/i)).toBeDisabled();
    expect(screen.getByRole("button", { name: /save/i })).toBeDisabled();
  });
});
