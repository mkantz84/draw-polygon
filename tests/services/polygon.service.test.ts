import { setupTestDb } from "../testUtils";
import { Database as SqliteDatabase } from "sqlite";
import { db as dbSingleton } from "../../src/lib/database";
import { polygonService } from "../../src/lib/services/polygon.service";

describe("PolygonService", () => {
  let testDb: SqliteDatabase;

  beforeAll(async () => {
    testDb = await setupTestDb();
    dbSingleton._setTestDb(testDb);
  });

  afterAll(async () => {
    await testDb.close();
  });

  test("create, getAll, and delete polygon", async () => {
    // Create
    const created = await polygonService.create("ServiceTest", [
      [10, 20],
      [30, 40],
    ]);
    expect(created).toHaveProperty("id");
    expect(created.name).toBe("ServiceTest");
    expect(created.points).toEqual([
      [10, 20],
      [30, 40],
    ]);

    // Get all
    const all = await polygonService.getAll();
    expect(all.length).toBe(1);
    expect(all[0].name).toBe("ServiceTest");
    expect(all[0].points).toEqual([
      [10, 20],
      [30, 40],
    ]);

    // Delete
    const deleted = await polygonService.delete(created.id);
    expect(deleted).toBe(true);
    const allAfter = await polygonService.getAll();
    expect(allAfter.length).toBe(0);
  });
});
