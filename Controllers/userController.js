import { User } from "../Model/userModel.js";
// registe krne ke liye controller
const userController = async (req, res) => {
  const { name, email, password, mobno } = req.body;
  try {
    if (name !== "" && email !== "" && password !== "" && mobno !== "") {
      const exisistingUser = await User.findOne({ email });
      if (exisistingUser) {
        res.status(500).send({
          message: "user already existed",
          success: false,
        });
      }
      const user = await User.create({
        name,
        email,
        password,
        mobno,
      });

      res.status(201).send({
        message: "Registration Successfully ",
        success: true,
        user,
      });
    } else {
      return res.status(500).send({
        message: "all filed  required",
        success: false,
      });
    }
  } catch (error) {
    console.log(error);

    res.status(500).send({
      message: "error in registration",
      success: false,
      error,
    });
  }
};

// login krne ke liye controller
const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (email !== "" && password !== "") {
      //user validation
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).send({
          success: false,
          message: "User Not Found",
        });
      }
      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        return res.status(500).send({
          success: false,
          message: "Invalid Credintials",
        });
      }
      const token = await user.genrateToken();
      res
        .status(200)
        .cookie("token", token, {
          expires: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
          secure: process.env.NODE_ENV === "development" ? true : false,
          httpOnly: process.env.NODE_ENV === "development" ? true : false,
          sameSite: process.env.NODE_ENV === "development" ? true : false,
        })
        .send({
          success: true,
          message: "Login Successfully",
          token,
          user,
        });
    } else {
      return res.status(500).send({
        message: "email and password required",
        success: false,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "error in login",
      success: false,
    });
  }
};

// profle authontication ke liye controller
// export const userProfileController = async (req, res) => {
//   try {
//     // const user = await User.findById(req.users._id);
//     // user.password = undefined
//     res.status(200).send({
//       message: "User Profile fetched Successfully",
//       success: true,
//       // user
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({
//       message: "profile auth me error hai",
//       success: "false",
//     });
//   }
// };

//logout controller
const logoutController = async (req, res) => {
  try {
    res
      .status(200)
      .cookie("token", "", {
        expires: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
        secure: process.env.NODE_ENV === "development" ? true : false,
        httpOnly: process.env.NODE_ENV === "development" ? true : false,
        sameSite: process.env.NODE_ENV === "development" ? true : false,
      })
      .send({
        success: true,
        message: "Logout Successfully",
      });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "logout error hai",
      success: "false",
    });
  }
};

// profile update controller
// export const profileUpdateController = async (req, res) => {
//   try {
//     const user = await User.findById(req.user._id);
//     const { name, email, mobno, address } = req.body;
//     if (name) user.name = name;
//     if (email) user.email = email;
//     if (mobno) user.mobno = mobno;
//     if (address) user.address = address;
//     //save user
//     await user.save();
//     res.status(200).send({
//       message: "User Profile updated Successfully",
//       success: true,
//       user,
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({
//       message: "profile updation me error hai ",
//       success: "false",
//     });
//   }
// };

//forgot password controller
const passwordController = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const { oldPassword, newPassword } = req.body;
    //validation
    if (!oldPassword || !newPassword) {
      return res.status(500).send({
        message: "Error in update password api",
        success: false,
      });
    }
    const isMatch = await user.comparePassword(oldPassword);
    if (!isMatch) {
      return res.status(500).send({
        success: false,
        message: "Invalid Old Password",
      });
    }
    user.password = newPassword;
    await user.save();

    res.status(200).send({
      message: "Password updated Successfully",
      success: true,
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "password updation me error hai ",
      success: "false",
    });
  }
};

// pic add controller
// export const updateProfilePicController = async (req, res) => {
//   try {
//     const user = await User.findById(req.user._id);
//     //file get from client photo
//     const file = getDataUri(req.file);
//     // delete previos image
//     await cloudinary.v2.uploader.destroy(user.profilePic.public_id);
//     // update pic
//     const cdb = await cloudinary.v2.uploader.upload(file.content);
//     user.profilePic = {
//       public_id: cdb.public_id,
//       url: cdb.url,
//     };
//     await user.save();
//     res.status(200).send({
//       success: true,
//       message: "profile picture updated!",
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({
//       message: "Profile picture updation me error hai ",
//       success: "false",
//     });
//   }
// };

export {
  userController,
  passwordController,
  logoutController,
  loginController,
};
