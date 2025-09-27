import mongoose from "mongoose";

const connectDb = async () => {
  try {
    await mongoose.connect("mongodb://mongodb:27017/tasks");
    console.log("MongoDB coonnected", mongoose.connection.host);
  } catch (error) {
    console.log("Error connecting mongoDb: ", error);
  }
};
export default connectDb;
