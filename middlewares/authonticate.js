import createHttpError from "http-errors";
import jwt from "jsonwebtoken";

const authonticate = async (req, res, next) => {
  const authHeader = req.header("Authorization");
  console.log("auth header", authHeader);
  if (!authHeader) {
    return next(createHttpError(500, "Authorization token is required"));
  }
  var token = req.headers.authorization.split(" ")[1];
  // console.log("auth token", token);
  if (!token) {
    return next(createHttpError(401, "Invalid authorization token format"));
  }
  try {
    const decoded = jwt.verify(
      token,
      "XbuDF3AZn6HlfJLw76S8W3ocakQOTFbgzShODnOx39Y0YoQqOK4dqfN"
    );
    req.userId = decoded.sub;
    next();
  } catch (err) {
    console.log(err);
    return next(createHttpError(401, "Invalid authorization token"));
  }
};

export default authonticate;
