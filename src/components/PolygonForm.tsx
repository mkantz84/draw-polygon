"use client";

import React from "react";

type PolygonFormProps = {
  onSave: (name: string) => void;
  disabled?: boolean;
  name: string;
  setName: (name: string) => void;
  isEdit?: boolean;
  onDeselect?: () => void;
};

const PolygonForm: React.FC<PolygonFormProps> = ({
  onSave,
  disabled,
  name,
  setName,
  isEdit,
  onDeselect,
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onSave(name.trim());
      // setName(""); // Don't clear here, let parent handle
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row items-center gap-3 mt-4 w-full max-w-md"
      aria-label={isEdit ? "Edit polygon" : "Create polygon"}
    >
      <label htmlFor="polygon-name" className="sr-only">
        Polygon name
      </label>
      <input
        id="polygon-name"
        type="text"
        className="border-2 border-slate-700 bg-white rounded px-3 py-2 flex-1 text-lg font-semibold text-slate-900 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Polygon name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        disabled={disabled}
        required
        aria-label="Polygon name"
      />
      <button
        type="submit"
        className="px-6 py-2 bg-blue-600 text-white text-lg rounded shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-50"
        disabled={disabled || !name.trim()}
      >
        {isEdit ? "Update" : "Save"}
      </button>
      {isEdit && onDeselect && (
        <button
          type="button"
          className="px-4 py-2 bg-gray-300 text-slate-800 rounded hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-slate-400"
          onClick={onDeselect}
          aria-label="Deselect polygon"
        >
          Deselect
        </button>
      )}
    </form>
  );
};

export default PolygonForm;
