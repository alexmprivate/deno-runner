import { hc } from "hono/client";
import { health } from "./routes/health.ts";
import { createServer } from "./core/server.ts";
const app = createServer(health);

Deno.serve({ port: 3000, hostname: "127.0.0.1" }, app.fetch);

console.log(
  "🚀 Server running at http://127.0.0.1:3000; swagger http://127.0.0.1:3000/ui",
);

type Routes = typeof app;

const client = hc<Routes>("http://127.0.0.1:3000");

const res = await client.health.$get();

const response = await res.json();
const { message } = response;
console.log({
  message,
});
