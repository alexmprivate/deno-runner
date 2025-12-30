import { createRoute, OpenAPIHono, z } from "@hono/zod-openapi";

const reponseSchema = z.object({
  status: z.string().min(1),
  message: z.string().min(1),
}).openapi({
  example: {
    "status": "healthy",
    "message": "Everything is fine",
  },
});

const route = createRoute({
  method: "get",
  path: "/health",
  responses: {
    200: {
      content: {
        "application/json": {
          schema: reponseSchema,
        },
      },
      "description": "Get API health status",
    },
  },
});

export const health = new OpenAPIHono().openapi(
  route,
  (c) =>
    c.json({
      status: "ok",
      message: "🦕 Stage 1 - Dino Server is healthy",
    }),
);
