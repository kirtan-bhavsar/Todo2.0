import { express } from "express";
import {
  addCategory,
  editCategory,
  deleteCategory,
  getCategories,
} from "../Controllers/categoryController";

const categoryRouter = express.Router();

categoryRouter.post("/add", addCategory);

categoryRouter.get("/", getCategories);

categoryRouter.put("/edit/:categoryId", editCategory);

categoryRouter.delete("/delete/:categoryId", deleteCategory);
