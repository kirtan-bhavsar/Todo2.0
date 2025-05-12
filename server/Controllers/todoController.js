import Todo from "../Models/Todo.js";
import User from "../Models/User.js";

// @desc Api to create a todo
// @api : /api/v1/add
// @access Private
const createTodo = async (req, res) => {
  const userId = req.user.id;

  if (!userId) {
    return res
      .status(400)
      .json({ message: "User not authorized to perform this action" });
  }

  const userExists = await User.findOne({ _id: userId });

  if (!userExists) {
    return res.status(400).json({ message: "No user found" });
  }

  try {
    req.body.title = req.body.title.trim();

    if (!req.body.title) {
      return res.status(400).json({ message: "Title is required" });
    }

    req.body.user = userId;

    const todo = await Todo.create(req.body);

    todo.save();

    res.status(200).json({ message: "Todo Added Successfully", data: todo });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// @desc api to get all todos for a user
// @api /api/v1/todos
// @access private
const getAllTodos = async (req, res) => {
  const isDone = req.query.isDone;

  if (isDone) {
    console.log(req.query);
  } else {
    console.log("Request query not included");
  }

  const userId = req.user.id;

  if (!userId) {
    return res
      .status(400)
      .json({ message: "User not authorized to perform this action" });
  }

  const userExists = await User.findOne({ _id: userId });

  if (!userExists) {
    return res.status(400).json({ message: "No user found" });
  }

  try {
    let todos;

    if (isDone) {
      todos = await Todo.find({ user: userExists._id, isDone: isDone });
    } else {
      // const todos = await Todo.find({ user: userExists._id, isDone: false });
      todos = await Todo.find({ user: userExists._id });
    }
    // const todos = await Todo.find({ user: userExists._id });

    // if (todos.length == 0) {
    //   return res.status(200).json(todos);
    // }
    // if (todos.length == 0) {
    //   return res.status(400).json({ message: "No todos found" });
    // }

    res.status(200).json(todos);
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// @desc api to get a specific todo by it's id
// @api /api/v1/todos/:id
// @access private
const getTodoById = async (req, res) => {
  const userId = req.user.id;

  if (!userId) {
    return res
      .status(400)
      .json({ message: "User not authorized to perform this action" });
  }

  const userExists = await User.findOne({ _id: userId });

  if (!userExists) {
    return res.status(400).json({ message: "No user found" });
  }

  const todoId = req.params.id;

  if (!todoId) {
    return res
      .status(400)
      .json({ message: "Id is compulsary to fetch the data" });
  }

  const todo = await Todo.findById(todoId);

  if (!todo) {
    return res.status(400).json({ message: "No todo found for this id." });
  }

  try {
    const todoUser = todo.user;

    console.log(todoUser + " todoUser");
    console.log(userExists.id + " userExists.id");

    if (userExists.id === todoUser.toString()) {
      console.log("Condition Matching");
      return res.status(200).json(todo);
    } else {
      return res.status(400).json({
        message:
          "User not authorized to peform this action as users does not match",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }

  // return res.status(200).json(todo);
};

// @desc an api to edit a todo
// @api /api/v1/edit/:id
// @access private
const editTodo = async (req, res) => {
  const userId = req.user.id;

  console.log(userId + " userId");

  if (!userId) {
    return res
      .status(400)
      .json({ message: "User not authorized to perform this action" });
  }

  const userExists = await User.findOne({ _id: userId });

  console.log(userExists + " userExists");

  if (!userExists) {
    return res.status(400).json({ message: "User not found" });
  }

  try {
    const todoId = req.params.id;

    console.log(todoId + " todo Id");

    if (!todoId) {
      return res
        .status(400)
        .json({ message: "Id required to perform edit action" });
    }

    const todo = await Todo.findById(todoId);

    console.log(todo + " todo");

    if (!todo) {
      return res.status(404).json({ message: "No todo found with this id" });
    }

    const todoUser = todo.user;

    if (userExists.id === todoUser.toString()) {
      const updatedTodo = await Todo.findByIdAndUpdate(todoId, req.body, {
        new: true,
      });

      res
        .status(200)
        .json({ message: "Todo Updated Successfully", data: updatedTodo });
    } else {
      return res.status(400).json({
        message:
          "User not authorized to perform this action as users does not match",
      });
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// @desc appi to delete a todo
// @api /api/v1/delete/:id
// @access private
const deleteTodo = async (req, res) => {
  const userId = req.user.id;

  if (!userId) {
    return res
      .status(400)
      .json({ message: "User not authorized to perform this action" });
  }

  const userExists = await User.findOne({ _id: userId });

  if (!userExists) {
    return res.status(200).json({ message: "User not found" });
  }

  const todoId = req.params.id;

  if (!todoId) {
    return res
      .status(400)
      .json({ message: "Id required to perform delete action" });
  }

  const todo = await Todo.findById(todoId);

  if (!todo) {
    return res.status(400).json({ message: "No todo found with this id" });
  }

  const todoUser = todo.user;

  if (userExists.id === todoUser.toString()) {
    await Todo.findByIdAndDelete(todoId);

    res.status(200).json({ message: "Todo deleted successfully" });
  } else {
    return res.status(400).json({
      message:
        "User not authorized to perform this action as users does not match",
    });
  }
};

export { createTodo, editTodo, getAllTodos, getTodoById, deleteTodo };
