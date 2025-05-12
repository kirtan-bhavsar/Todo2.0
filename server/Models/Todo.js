import mongoose, { mongo } from "mongoose";

const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  isDone: {
    type: Boolean,
    default: false,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
});

const Todo = mongoose.model("todo", todoSchema);

export default Todo;
