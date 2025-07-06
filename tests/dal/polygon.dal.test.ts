import { setupTestDb } from "../testUtils";
import { Database as SqliteDatabase } from "sqlite";
import * as polygonDal from "../../src/lib/dal/polygon.dal";
import { db as dbSingleton } from "../../src/lib/database";

let testDb: SqliteDatabase;

beforeAll(async () => {
  testDb = await setupTestDb();
  dbSingleton._setTestDb(testDb);
});

afterAll(async () => {
  await testDb.close();
});

test("create, get, and delete a polygon", async () => {
  // Create
  const created = await polygonDal.createPolygon("Test", [
    [1, 2],
    [3, 4],
  ]);
  expect(created).toHaveProperty("id");
  expect(created.name).toBe("Test");
  expect(created.points).toBe(
    JSON.stringify([
      [1, 2],
      [3, 4],
    ])
  );

  // Get all
  const all = await polygonDal.getAllPolygons();
  expect(all.length).toBe(1);
  expect(all[0].name).toBe("Test");

  // Delete
  const deleted = await polygonDal.deletePolygon(created.id);
  expect(deleted).toBe(true);
  const allAfter = await polygonDal.getAllPolygons();
  expect(allAfter.length).toBe(0);
});
