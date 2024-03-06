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
  .get("/", () => {
    return "Hello Elysia! Use /clash for clash nodes and /v2ray for v2ray nodes.";
  })
  .get("/clash", ({ set }) => {
    set.redirect = `https://freenode.openrunner.net/uploads/${getDateTime()}-clash.yaml`;
  })
  .get("/v2ray", ({ set }) => {
    set.redirect = `https://freenode.openrunner.net/uploads/${getDateTime()}-v2ray.txt`;
  });

export default app;
