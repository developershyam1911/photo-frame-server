import express from "express";
import {
  loginController,
  // logoutController,
  userController,
} from "../Controllers/userController.js";
// import { isAuth } from '../middlewares/authMiddleware.js'
// import { singleUpload } from '../middlewares/multer.js'

const userRoute = express.Router();
//for register
userRoute.post("/register", userController);

//for login
userRoute.post("/login", loginController);

// profile access
// userRoute.get('/profile', isAuth, userProfileControlle)

//logout
// userRoute.get("/logout", isAuth, logoutController);

// //update profile
// userRoute.put('/update-profile', isAuth, profileUpdateController)

// userRoute.put("/update-password", isAuth, passwordController)

// userRoute.put('/update-picture',isAuth, singleUpload, updateProfilePicController)
export default userRoute;
