import mongoose from "mongoose";
import bcrypt, { hash } from "bcrypt";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
  },
});

userSchema.methods.hashPassword = async function (userPassword) {
  const salt = await bcrypt.genSalt(10);

  const hashedUserPassword = await bcrypt.hash(userPassword, salt);

  return hashedUserPassword;
};

const User = mongoose.model("user", userSchema);

export default User;
