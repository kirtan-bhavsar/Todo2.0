// import mongoose from "mongoose";
import User from "../Models/User.js";
import dotenv from "dotenv/config";
import mongoose from "mongoose";

const removeAllUsers = async () => {
  console.log("removeAll user running pefectly fine");

  await mongoose.connect(process.env.MONGO_URI);

  const users = await User.find();

  for (const user of users) {
    if (user.id !== "67ff36e1a6a205af172f9ad4") {
      await User.findByIdAndDelete(user.id);
    }
  }

  console.log("Script Running perfectly fine, very well done K");
};

removeAllUsers();
