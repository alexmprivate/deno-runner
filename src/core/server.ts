import { swaggerUI } from "@hono/swagger-ui";

import { OpenAPIHono } from "@hono/zod-openapi";

import type { Env, Schema } from "hono";

import { errorHandler } from "./middlewares/error.ts";

import { logger } from "./middlewares/logger.ts";

import { serveStatic } from "hono/deno";

export const createServer = <
  E extends Env,
  S extends Schema,
  P extends string = "/api",
>(routes: OpenAPIHono<E, S, P>): OpenAPIHono<E, S, P> => {
  const app = new OpenAPIHono<E, S, P>();

  app.use("*", errorHandler);

  app.use("*", logger);

  app.use(
    "*",
    serveStatic({
      root: "./public",
    }),
  );

  app.doc("/doc", {
    info: { title: "My API", version: "1.0.0" },
    openapi: "3.0.0",
  });
  app.get("/ui", swaggerUI({ url: "/doc" }));

  app.get(
    "/env-vars",
    (c) =>
      c.text(`FOO = ${Deno.env.get("FOO")} and BAR = ${Deno.env.get("BAR")}`),
  );

  app.route("/", routes);

  app.notFound((c) => c.json({ error: "Not Found" }, 404));

  return app;
};
