import User from "../Models/User.js";
import config from "dotenv/config";
import mongoose from "mongoose";
import Todo from "../Models/Todo.js";

const deleteTodosForTestUser = async () => {
  mongoose.connect(process.env.MONGO_URI);

  console.log("DB connected successfully");

  const user = await User.findOne({ email: "test1@gmail.com" });

  // console.log(user);

  const todos = await Todo.find({ user: user._id });

  console.log(todos);

  todos.map(async (todo) => {
    await Todo.findByIdAndDelete(todo._id);
    // console.log(todo.title);
  });

  console.log("All todos deleted successfully");
};

deleteTodosForTestUser();
