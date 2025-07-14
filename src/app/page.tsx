"use client";
import React from "react";
import PolygonCanvas from "@/components/PolygonCanvas";
import PolygonList from "@/components/PolygonList";
import PolygonForm from "@/components/PolygonForm";
import { usePolygonPage } from "@/hooks/usePolygonPage";

export default function HomePage() {
  const {
    polygons,
    drawing,
    selectedPolygon,
    name,
    loading,
    error,
    handleSaveOrUpdate,
    handleDelete,
    setDrawing,
    setName,
    setSelectedPolygon,
    deselectPolygon,
    fetchMorePolygons,
    hasMore,
    isUpdating,
    isPathClosed,
    deletingPolygonId,
  } = usePolygonPage();

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-100 py-10 px-4">
      <div className="max-w-5xl mx-auto flex flex-col gap-8">
        <header className="mb-2 text-center">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-2 tracking-tight">
            Polygon Drawer
          </h1>
          <p className="text-lg text-slate-700">
            Draw, save, and edit polygons with ease.
          </p>
        </header>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <PolygonCanvas points={drawing} onChange={setDrawing} />
            <PolygonForm
              onSave={handleSaveOrUpdate}
              disabled={
                isUpdating || loading || drawing.length === 0 || !isPathClosed
              }
              name={name}
              setName={setName}
              isEdit={!!selectedPolygon}
              onDeselect={deselectPolygon}
            />
            {error && <div className="text-red-600 mt-2">{error}</div>}
          </div>
          <div>
            <PolygonList
              polygons={polygons}
              onDelete={handleDelete}
              onSelect={setSelectedPolygon}
              selectedId={selectedPolygon?.id ?? null}
              loading={loading}
              disabled={isUpdating || deletingPolygonId != null}
              fetchMorePolygons={fetchMorePolygons}
              hasMore={hasMore}
              deletingPolygonId={deletingPolygonId}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
