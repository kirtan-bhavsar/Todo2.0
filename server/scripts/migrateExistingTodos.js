import User from "../Models/User.js";
import Todo from "../Models/Todo.js";
import config from "dotenv/config";
import mongoose from "mongoose";

const migrateExistingTodos = async () => {
  await mongoose.connect(process.env.MONGO_URI);

  console.log("Database connected successfully");

  const todos = await Todo.find({ user: { $exists: false } });

  console.log(todos);

  const emailId = "kirtanbhavsar.2491@gmail.com";

  const user = await User.find({ email: emailId });

  console.log(user[0].id);

  const testTodo = await Todo.findOne({ _id: "67f2d234373edd4f906e8916" });

  // console.log(JSON.parse(testTodo));
  console.log(testTodo.id);

  testTodo.user = user[0].id;
  await testTodo.save();

  console.log("todo migrated successfully");

  for (const todo of todos) {
    todo.user = user[0].id;
    await todo.save();
    console.log("todo updated successfully");
  }
};

migrateExistingTodos();
