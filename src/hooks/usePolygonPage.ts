import { useState, useCallback, useEffect } from "react";
import {
  getPolygons,
  createPolygon,
  updatePolygon,
  deletePolygon,
  Polygon,
} from "@/network/polygons";
import { PAGE_SIZE } from "@/lib/constants";
import { isClosed } from "@/lib/utils/polygonValidation";

function getErrorMessage(err: unknown, fallback = "Unknown error") {
  if (typeof err === "object" && err !== null && "message" in err) {
    const msg = (err as { message?: unknown }).message;
    if (typeof msg === "string") return msg;
  }
  return fallback;
}

export function usePolygonPage() {
  const [polygons, setPolygons] = useState<Polygon[]>([]);
  const [drawing, setDrawing] = useState<number[][]>([]);
  const [selectedPolygon, setSelectedPolygon] = useState<Polygon | null>(null);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [offset, setOffset] = useState(0);
  const [isUpdating, setIsUpdating] = useState(false);
  const [deletingPolygonId, setDeletingPolygonId] = useState<number | null>(
    null
  );

  const isPathClosed = isClosed(drawing);

  // Fetch first page on mount or after new polygon is added
  const fetchFirstPage = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getPolygons(0, PAGE_SIZE);
      setPolygons(data);
      setHasMore(data.length === PAGE_SIZE);
      setOffset(data.length);
      setError(null);
    } catch (err: unknown) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFirstPage();
  }, [fetchFirstPage]);

  // Fetch more polygons for infinite scroll
  const fetchMorePolygons = useCallback(async () => {
    if (!hasMore || loading) return;
    setLoading(true);
    try {
      const data = await getPolygons(offset, PAGE_SIZE);
      setPolygons((prev) => [...prev, ...data]);
      setHasMore(data.length === PAGE_SIZE && data.length > 0);
      setOffset((prev) => prev + data.length);
    } catch (err: unknown) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }, [offset, hasMore, loading]);

  // When selecting a polygon, set name and drawing
  useEffect(() => {
    if (selectedPolygon) {
      setName(selectedPolygon.name);
      setDrawing(selectedPolygon.points);
    } else {
      setName("");
      setDrawing([]);
    }
  }, [selectedPolygon]);

  // Save or update polygon
  const handleSaveOrUpdate = useCallback(
    async (polygonName: string) => {
      setLoading(true);
      setError(null);
      try {
        if (selectedPolygon) {
          // Update existing polygon
          setIsUpdating(true);
          const updated = await updatePolygon(
            selectedPolygon.id,
            polygonName,
            drawing
          );
          setPolygons((prev) =>
            prev.map((p) => (p.id === updated.id ? updated : p))
          );
          setSelectedPolygon(null);
        } else {
          // Create new polygon
          setPolygons([]);
          await createPolygon(polygonName, drawing);
        }
        setDrawing([]);
        setName("");
      } catch (err: unknown) {
        setError(getErrorMessage(err));
      } finally {
        setLoading(false);
        setIsUpdating(false);
        await fetchFirstPage();
      }
    },
    [drawing, selectedPolygon, fetchFirstPage]
  );

  // Delete polygon
  const handleDelete = useCallback(
    async (id: number) => {
      setLoading(true);
      setIsUpdating(true);
      setDeletingPolygonId(id); // Set deleting ID
      setError(null);
      try {
        await deletePolygon(id);
        setPolygons((prev) => prev.filter((p) => p.id !== id));
        if (selectedPolygon && selectedPolygon.id === id) {
          setSelectedPolygon(null);
        }
      } catch (err: unknown) {
        setError(getErrorMessage(err));
        await fetchFirstPage(); // Refetch on error
      } finally {
        setLoading(false);
        setIsUpdating(false);
        setDeletingPolygonId(null); // Clear deleting ID
      }
    },
    [selectedPolygon, fetchFirstPage]
  );

  // Deselect polygon
  const deselectPolygon = useCallback(() => {
    setSelectedPolygon(null);
  }, []);

  return {
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
  };
}
