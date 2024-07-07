import express from "express";
import cors from "cors";

import { initTRPC } from "@trpc/server";
import { createExpressMiddleware } from "@trpc/server/adapters/express";

const t = initTRPC.create();
const appRouter = t.router({
  helloWorld: t.procedure.query(() => {
    return "Hello, world!";
  }),
  logApi: t.procedure
    .input((v) => {
      if (typeof v === "string") {
        return v;
      }
      throw new Error("Expected a string");
    })
    .mutation((req) => {
      console.log(`Received: ${req.input}`);
    }),
});

const app = express();
app.use(cors({ origin: "http://localhost:5173" }));
app.use("/trpc", createExpressMiddleware({ router: appRouter }));

app.listen(3000);

export type ExerciseAppRouter = typeof appRouter;
