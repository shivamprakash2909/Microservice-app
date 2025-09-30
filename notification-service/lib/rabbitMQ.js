import amqp from "amqplib";
let channel;
export const connectToRabbitMQ = async (retries = 5, delay = 3000) => {
  while (retries) {
    try {
      const connnection = await amqp.connect("amqp://rabbitmq"); //create connection
      channel = await connnection.createChannel(); //channel creation for communication
      await channel.assertQueue("Task_queue"); //create queue
      console.log("Connected to rabbitMQ");
      return channel;
    } catch (error) {
      console.log("Error connecting to rabbitMQ, err: ", error);
      retries--;
      console.log(`retrying after ${delay} seconds`);
      await new Promise((res) => setTimeout(res, delay));
    }
  }
};

export const getChannel = () => channel;
