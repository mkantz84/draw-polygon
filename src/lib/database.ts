import sqlite3 from "sqlite3";
import { open, Database as SqliteDatabase } from "sqlite";
import path from "path";

sqlite3.verbose();

class Database {
  private static instance: Database;
  private db!: SqliteDatabase;
  private isInitialized = false;

  private constructor() {}

  public static getInstance(): Database {
    if (!this.instance) {
      this.instance = new Database();
    }
    return this.instance;
  }

  public async initialize() {
    if (this.isInitialized) return;
    const dbPath = path.join(process.cwd(), "polygons.sqlite");
    this.db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
    // Create table if not exists
    await this.db.run(`
      CREATE TABLE IF NOT EXISTS polygons (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        points TEXT NOT NULL,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);
    this.isInitialized = true;
    console.log("SQLite database initialized.");
  }

  public get connection() {
    if (!this.db) throw new Error("Database not initialized");
    return this.db;
  }

  // Test-only: inject a test db instance
  public _setTestDb(testDb: SqliteDatabase) {
    this.db = testDb;
    this.isInitialized = true;
  }
}

export const db = Database.getInstance();
export const initializeDatabase = () => db.initialize();

// Test the connection
export const testConnection = async () => {
  try {
    await db.connection.get(`SELECT 1`);
    console.log("Database connection established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};
