import express from "express";
import {
  addCategory,
  editCategory,
  deleteCategory,
  getCategories,
} from "../Controllers/categoryController.js";
import auth from "../middleware/auth.js";

const categoryRouter = express.Router();

categoryRouter.post("/add", auth, addCategory);

categoryRouter.get("/", auth, getCategories);

categoryRouter.put("/edit/:categoryId", auth, editCategory);

categoryRouter.delete("/delete/:categoryId", auth, deleteCategory);

export default categoryRouter;
