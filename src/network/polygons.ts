export type Polygon = {
  id: number;
  name: string;
  points: number[][];
};

export async function getPolygons(offset = 0, limit = 15): Promise<Polygon[]> {
  const res = await fetch(`/api/polygons?offset=${offset}&limit=${limit}`);
  if (!res.ok) throw new Error("Failed to fetch polygons");
  return res.json();
}

export async function createPolygon(
  name: string,
  points: number[][]
): Promise<Polygon> {
  const res = await fetch("/api/polygons", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, points }),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || "Failed to save polygon");
  }
  return res.json();
}

export async function updatePolygon(
  id: number,
  name: string,
  points: number[][]
): Promise<Polygon> {
  const res = await fetch(`/api/polygons/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, points }),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || "Failed to update polygon");
  }
  return res.json();
}

export async function deletePolygon(id: number): Promise<void> {
  const res = await fetch(`/api/polygons/${id}`, { method: "DELETE" });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || "Failed to delete polygon");
  }
}
