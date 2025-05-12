import express from "express";
import {
  createTodo,
  deleteTodo,
  editTodo,
  getAllTodos,
  getTodoById,
} from "../Controllers/todoController.js";
import auth from "../middleware/auth.js";

const todoRouter = express.Router();

todoRouter.post("/add", auth, createTodo);

todoRouter.put("/edit/:id", auth, editTodo);
// to handle these error cases with necessary json response as defined in the controller
todoRouter.put("/edit/", auth, editTodo);
todoRouter.put("/edit", auth, editTodo);

todoRouter.get("/todos", auth, getAllTodos);

todoRouter.get("/todos/:id", auth, getTodoById);
// to handle these error cases with necessary json response as defined in the controller
todoRouter.get("/todos/", auth, getTodoById);
todoRouter.get("/todos", auth, getTodoById);

todoRouter.delete("/delete/:id", auth, deleteTodo);
// to handle these error cases with necessary json response as defined in the controller
todoRouter.delete("/delete/", auth, deleteTodo);
todoRouter.delete("/delete", auth, deleteTodo);

export default todoRouter;
