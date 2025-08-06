import db from "../db.js";
import User from "../Models/User.js";
import Category from "../Models/Category.js";
import Todo from "../Models/Todo.js";

const addDefaultLabelForExistingTodos = async (req, res) => {
  db();

  const users = await User.find();

  users.map(async (user) => {
    const todos = await Todo.find({ user: user.id, category: null });

    console.log(todos);

    const category = await Category.find({ userId: user.id });

    const categoryId = category[0].id;

    todos.map(async (todo) => {
      todo.category = categoryId;

      await todo.save();
    });
  });
};

addDefaultLabelForExistingTodos();

export default addDefaultLabelForExistingTodos;
