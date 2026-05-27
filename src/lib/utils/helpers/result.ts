export type Result<T = void, E = Error> =
  | (T extends void
      ? {
          success: true;
        }
      : {
          success: true;
          data: T;
        })
  | {
      success: false;
      error: E;
    };

export function resultify<
  T extends (...args: unknown[]) => Promise<unknown>,
  E = Error,
>(fn: T): Promise<Result<Awaited<ReturnType<T>>, E>>;

export function resultify<T extends (...args: unknown[]) => unknown, E = Error>(
  fn: T,
): Result<ReturnType<T>, E>;

export function resultify<
  T extends
    | ((...args: unknown[]) => unknown)
    | ((...args: unknown[]) => Promise<unknown>),
  E = Error,
>(
  fn: T,
): Promise<Result<Awaited<ReturnType<T>>, E>> | Result<ReturnType<T>, E> {
  try {
    const result = fn();

    if (result instanceof Promise) {
      const handler = async (): Promise<Result<Awaited<ReturnType<T>>, E>> => {
        const data = await result;
        return {
          success: true,
          data,
        } as Result<Awaited<ReturnType<T>>, E>;
      };

      return handler();
    }

    return {
      success: true,
      data: result,
    } as Result<ReturnType<T>, E>;
  } catch (error) {
    return {
      success: false,
      error: error as E,
    };
  }
}
