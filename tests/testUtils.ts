import { open, Database as SqliteDatabase } from "sqlite";
import sqlite3 from "sqlite3";

export async function setupTestDb(): Promise<SqliteDatabase> {
  const db = await open({ filename: ":memory:", driver: sqlite3.Database });
  await db.exec(`
    CREATE TABLE polygons (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      points TEXT NOT NULL,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
  return db;
}
