import express from "express";

import userRouter from "./routes/user.routes.js";
import connectDB from "./lib/db.js";
const app = express();
app.use(express.json());

const port = 5001;
connectDB();
app.get("/health", (req, res) => {
  res.send(`Server is healthy, PORT:${port}`);
});
app.use("/api/users", userRouter);
app.listen(port, () => {
  console.log(`Sercer running on port ${port}`);
});
