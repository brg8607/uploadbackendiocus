import express from "express";
import cors from "cors";
import coursesRouter from "./routes/courses.js";
import uploadsRouter from "./routes/uploads.js";

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "*"
  })
);
app.use(express.json());

app.use("/api/courses", coursesRouter);
app.use("/api/uploads", uploadsRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`API corriendo en :${PORT}`));
