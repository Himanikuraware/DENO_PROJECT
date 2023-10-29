import { Application } from "https://deno.land/x/oak/mod.ts";

import todoRoutes from "./routes/todos.ts";

const app = new Application();

app.use(async (ctx, next) => {
  console.log("Middleware");
  await next();
});

app.use(async (ctx, next) => {
  //Resolving CORS error.
  ctx.response.headers.set("Access-Control-Allow-Origin", "*");
  ctx.response.headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  ctx.response.headers.set("Access-Control-Allow-Headers", "Content-Type");
  await next();
});
app.use(todoRoutes.routes());
app.use(todoRoutes.allowedMethods());

await app.listen({ port: 8000 });
