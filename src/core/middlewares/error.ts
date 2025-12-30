import type { MiddlewareHandler } from "hono";

export const errorHandler: MiddlewareHandler = async (c, next) => {
  try {
    await next();
  } catch (error) {
    console.error(error);
    return c.json({
      error: "Internal Server Error",
    }, 500);
  }
};
