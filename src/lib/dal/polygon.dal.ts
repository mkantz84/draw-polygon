// Types for polygon data
export type PolygonRow = {
  id: number;
  name: string;
  points: string; // JSON string
};

export type Polygon = {
  id: number;
  name: string;
  points: number[][];
};

import { db } from "../database";

export async function getAllPolygons(): Promise<PolygonRow[]> {
  const conn = db.connection;
  return conn.all<PolygonRow[]>(
    "SELECT id, name, points FROM polygons ORDER BY createdAt DESC"
  );
}

export async function createPolygon(
  name: string,
  points: number[][]
): Promise<PolygonRow> {
  const conn = db.connection;
  const result = await conn.run(
    "INSERT INTO polygons (name, points) VALUES (?, ?)",
    name,
    JSON.stringify(points)
  );
  const row = await conn.get<PolygonRow>(
    "SELECT id, name, points FROM polygons WHERE id = ?",
    result.lastID
  );
  return row!;
}

export async function deletePolygon(id: number): Promise<boolean> {
  const conn = db.connection;
  const result = await conn.run("DELETE FROM polygons WHERE id = ?", id);
  return (result?.changes ?? 0) > 0;
}

export async function updatePolygon(
  id: number,
  name: string,
  points: number[][]
): Promise<PolygonRow | null> {
  const conn = db.connection;
  const result = await conn.run(
    "UPDATE polygons SET name = ?, points = ?, updatedAt = CURRENT_TIMESTAMP WHERE id = ?",
    name,
    JSON.stringify(points),
    id
  );
  if ((result?.changes ?? 0) === 0) return null;
  const row = await conn.get<PolygonRow>(
    "SELECT id, name, points FROM polygons WHERE id = ?",
    id
  );
  return row ?? null;
}

export async function getPolygonsPaginated(
  offset: number,
  limit: number
): Promise<PolygonRow[]> {
  const conn = db.connection;
  return conn.all<PolygonRow[]>(
    "SELECT id, name, points FROM polygons ORDER BY createdAt DESC LIMIT ? OFFSET ?",
    limit,
    offset
  );
}
