import type { MiddlewareHandler } from "hono";

export const logger: MiddlewareHandler = async (c, next) => {
  const start = Date.now();

  await next();

  const duration = Date.now() - start;

  const { req, res } = c;

  const { method, path } = req;

  const { status } = res;

  console.log(
    `[${method}] ${path} → ${status.toString()} (${duration.toString()}ms)`,
  );
};
