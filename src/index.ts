import express, { Express } from "express";
import dotenv from "dotenv";
import cors from "cors";
import { getAllCaptionData } from "./controller";

dotenv.config();

const app: Express = express();

app.use(express.json());
app.use(
  cors({
    origin: "https://alt-text-app.webflow.io",
  })
);

const corsOptions = {
  "Access-Control-Allow-Origin": "https://alt-text-app.webflow.io",
};

const port = process.env.port || 8080;

app.get("/", async (req, res) => {
  res.set(corsOptions);
  res.json({ status: "Alt Text API is OK!" });
});

app.options(
  "*",
  cors({
    origin: "https://alt-text-app.webflow.io",
  })
);

app.post("/describe", async (req, res) => {
  res.set(corsOptions);
  const { urls } = req.body;
  if (!Array.isArray(urls) || urls.every((url) => typeof url !== "string")) {
    res.status(500).json({ error: "urls is not array of strings" });
  }
  const captions = await getAllCaptionData(urls);
  res.json({ captions });
});

app.listen(port, () => {
  console.log(`Alt Text API listening on port ${port}`);
});
