import express from "express";
import cookieParser from "cookie-parser";
import connectDB from "./lib/db.js";
import taskRouter from "./routes/task.routes.js";
const app = express();

app.use(express.json());
app.use(cookieParser());
const port = 5002;
connectDB();
app.get("/api/tasks/health", (req, res) => {
  res.send(`Task service is healthy, PORT:${port}`);
});
app.use("/api/tasks", taskRouter);
app.listen(port, () => {
  console.log(`Task service running on port: ${port}`);
});
