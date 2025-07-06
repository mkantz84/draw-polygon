import { initializeDatabase } from "@/lib/database";

export function withDbInit<Args extends unknown[], R>(
  handler: (...args: Args) => Promise<R>
): (...args: Args) => Promise<R> {
  let dbInitPromise: Promise<void> | null = null;
  return async (...args: Args) => {
    if (!dbInitPromise) {
      dbInitPromise = initializeDatabase();
    }
    await dbInitPromise;
    return handler(...args);
  };
}
