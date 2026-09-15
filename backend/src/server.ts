import express from "express";
import cors from "cors";
import { env } from "./config/env.js";
import { inspectionsRouter } from "./routes/inspections.js";

const app = express();

app.use(cors({ origin: env.frontendOrigin }));
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ ok: true });
});

app.use("/api/inspections", inspectionsRouter);

app.listen(env.port, () => {
  console.log(`Backend listening on http://localhost:${env.port}`);
});
