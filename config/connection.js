import mongoose from "mongoose";
import { DB_NAME } from "./constant.js";
const connectDB = async () => {
  console.log("this is ok");

  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${DB_NAME}`
    );
    console.log(
      `\n mongoDB connected !! DB HOST: ${connectionInstance.connection.host}`
    );
  } catch (err) {
    console.log("db connection error:", err);
    process.exit(1);
  }
};

export default connectDB;
