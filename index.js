import connectDB from "./config/connection.js";
import app from "./Routes/app.js";
const startServer = async () => {
  await connectDB();
  try {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`⚙️ Server is running at port : ${process.env.PORT}`);
    });
  } catch (err) {
    console.log("server listen error", err);
  }
};
startServer();
