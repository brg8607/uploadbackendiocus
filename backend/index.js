import express from "express";
import cors from "cors";
import coursesRoutes from "./routes/courses.js";

const app = express();
app.use(cors({ origin: process.env.FRONTEND_URL }));
app.use(express.json());

app.use("/api/courses", coursesRoutes);

app.listen(process.env.PORT || 3000, () =>
  console.log("API lista en puerto 3000")
);
