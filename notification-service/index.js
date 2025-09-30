import express from "express";
import cookieParser from "cookie-parser";
import { connectToRabbitMQ } from "./lib/rabbitMQ.js";
import { startTaskConsumer } from "./Consumer/taskConsumer.js";

const app = express();
app.use(express.json());
app.use(cookieParser());
const port = 5003;

// Initialize RabbitMQ connection and start consumer
const initializeNotificationService = async () => {
  try {
    await connectToRabbitMQ();
    await startTaskConsumer();
    console.log("Notification service initialized successfully");
  } catch (error) {
    console.error("Failed to initialize notification service:", error);
    process.exit(1); // Exit if initialization fails
  }
};

// Start the service
app.listen(port, async () => {
  console.log(`Notification service running on port: ${port}`);
  await initializeNotificationService();
});
