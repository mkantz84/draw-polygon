import { DELAY_DEFAULT } from "../constants";

export const addDelay = (ms: number = DELAY_DEFAULT) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export function withDelay<Args extends unknown[], R>(
  handler: (...args: Args) => Promise<R>,
  ms: number = DELAY_DEFAULT
): (...args: Args) => Promise<R> {
  return async (...args: Args) => {
    await addDelay(ms);
    return handler(...args);
  };
}
