"use client";

import React from "react";
import Loader from "@/components/Loader";
import InfiniteScroll from "react-infinite-scroll-component";
import ArrowDownIndicator from "./ArrowDownIndicator";
import { usePolygonList } from "@/hooks/usePolygonList";

type Polygon = {
  id: number;
  name: string;
  points: number[][];
};

type PolygonListProps = {
  polygons: Polygon[];
  onDelete: (id: number) => void;
  onSelect: (polygon: Polygon) => void;
  selectedId?: number | null;
  loading?: boolean;
  fetchMorePolygons?: () => void;
  hasMore?: boolean;
  disabled?: boolean;
  deletingPolygonId?: number | null;
};

const PolygonList: React.FC<PolygonListProps> = ({
  polygons,
  onDelete,
  onSelect,
  selectedId,
  loading,
  fetchMorePolygons,
  hasMore,
  disabled = false,
  deletingPolygonId,
}) => {
  const { showArrow, scrollRef } = usePolygonList();

  const handleDelete = async (id: number) => {
    if (disabled || deletingPolygonId != null) return; // Disable if overall disabled or another polygon is deleting
    await onDelete(id);
  };

  return (
    <div
      className="border rounded-xl bg-white shadow-lg p-4"
      role="region"
      aria-label="Saved polygons"
    >
      <h2 className="text-xl font-bold mb-3 text-slate-800">Saved Polygons</h2>
      <div
        id="polygon-list-scrollable"
        className={`relative h-[488px] max-h-[488px] overflow-y-scroll scrollbar scrollbar-thumb-blue-300 scrollbar-track-blue-100 scrollbar-thumb-rounded-full scrollbar-w-2 ${
          disabled || deletingPolygonId != null
            ? "opacity-60 pointer-events-none"
            : ""
        }`}
        ref={scrollRef}
      >
        {loading && polygons.length === 0 ? (
          <Loader />
        ) : (
          <InfiniteScroll
            dataLength={polygons.length}
            next={fetchMorePolygons || (() => {})}
            hasMore={!!hasMore}
            loader={<Loader size="sm" />}
            scrollableTarget="polygon-list-scrollable"
            style={{ overflow: "visible" }}
            endMessage={null}
          >
            {polygons.length === 0 ? (
              <p className="text-gray-500">No polygons saved yet.</p>
            ) : (
              <ul
                className={`space-y-2 ${
                  disabled || deletingPolygonId != null
                    ? "opacity-60 cursor-not-allowed"
                    : ""
                }`}
                role="list"
              >
                {polygons.map((poly) => (
                  <li
                    key={poly.id}
                    className={`flex items-center justify-between cursor-pointer rounded-lg px-3 py-2 transition-colors outline-none
                      ${
                        selectedId === poly.id
                          ? "bg-blue-100 border-2 border-blue-500"
                          : "hover:bg-blue-50 focus:bg-blue-50 border border-transparent"
                      }`}
                    onClick={() =>
                      !(disabled || deletingPolygonId != null) && onSelect(poly)
                    }
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (
                        !(disabled || deletingPolygonId != null) &&
                        (e.key === "Enter" || e.key === " ")
                      )
                        onSelect(poly);
                    }}
                    aria-current={selectedId === poly.id ? "true" : undefined}
                    role="listitem"
                  >
                    <span className="font-medium text-slate-900 text-lg">
                      {poly.name}
                    </span>
                    <button
                      className={`ml-4 px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400 cursor-pointer ${
                        deletingPolygonId === poly.id
                          ? "opacity-60 cursor-not-allowed"
                          : ""
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(poly.id);
                      }}
                      tabIndex={0}
                      aria-label={
                        deletingPolygonId === poly.id
                          ? "Deleting..."
                          : `Delete polygon ${poly.name}`
                      }
                      disabled={deletingPolygonId != null}
                    >
                      {deletingPolygonId === poly.id ? (
                        <Loader size="sm" />
                      ) : (
                        "Delete"
                      )}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </InfiniteScroll>
        )}
        {showArrow && hasMore && !loading && <ArrowDownIndicator />}
      </div>
    </div>
  );
};

export default PolygonList;
