import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";
import { helmet } from "elysia-helmet";
import { logger } from "@bogeychan/elysia-logger";
import { getDateTime } from "./utils";

const app = new Elysia()
  .use(cors())
  .use(helmet())
  .use(
    logger({
      level: "error",
    })
  )
  .get("/clash", ({ set }) => {
    set.redirect = `https://freenode.openrunner.net/uploads/${getDateTime()}-clash.yaml`;
  })
  .get("/v2ray", ({ set }) => {
    set.redirect = `https://freenode.openrunner.net/uploads/${getDateTime()}-v2ray.txt`;
  })
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
