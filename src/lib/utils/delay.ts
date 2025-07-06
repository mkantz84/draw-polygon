export const addDelay = (ms: number = 5000) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export function withDelay<Args extends unknown[], R>(
  handler: (...args: Args) => Promise<R>,
  ms: number = 5000
): (...args: Args) => Promise<R> {
  return async (...args: Args) => {
    await addDelay(ms);
    return handler(...args);
  };
}
