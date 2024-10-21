import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import JWT from "jsonwebtoken";
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "name is required"],
    },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: [true, "email already taken"],
    },
    password: {
      type: String,
      required: true,
      minLength: [6, "Password should be greader then 6 character"],
    },
    mobno: {
      type: String,
      // required: [true, "mobile number is required"],
    },
    rememberToken: {
      type: String,
      // required:[true, "token is required"],
    },
    image: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

//hashing password
userSchema.pre("save", async function (next) {
  if (!this.isModified()) return next();
  this.password = await bcrypt.hash(this.password, 10);
});
// compare password
userSchema.methods.comparePassword = async function (plainPassword) {
  return await bcrypt.compare(plainPassword, this.password);
};

// using jwt token
userSchema.methods.genrateToken = async function () {
  return JWT.sign({ _id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

export const User = mongoose.model("user", userSchema);
