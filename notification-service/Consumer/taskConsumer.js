import { connectToRabbitMQ, getChannel } from "../lib/rabbitMQ.js";

export const startTaskConsumer = async () => {
  try {
    let channel = await getChannel();
    if (!channel) {
      channel = await connectToRabbitMQ();
    }
    console.log("Starting Task Consumer...");
    channel.consume("Task_queue", (msg) => {
      try {
        if (msg !== null) {
          const payload = JSON.parse(msg.content.toString());
          console.log("Notification Service received:", payload);

          switch (payload.event) {
            case "New task Created":
              console.log(
                `Send notification: Task "${payload.message.title}" created by user ${payload.message.userId}`
              );
              break;
            default:
              console.log("Unknown event type:", payload.event);
          }
          channel.ack(msg);
        }
      } catch (error) {
        console.error("Error processing message:", error);
        if (msg) {
          channel.nack(msg, false, false); // Reject message and don't requeue
        }
      }
    });
    console.log("Task Consumer started and listening for messages...");
  } catch (error) {
    console.error("Failed to start Task Consumer:", error);
    throw error;
  }
};
