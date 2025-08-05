import User from "../Models/User.js";
import Category from "../Models/Category.js";

// @desc Api to add a category
// @api : POST /api/v1/category/add
// @access Private
const addCategory = async (req, res) => {
  try {
    // res.status(200).json({ message: "add category called successfully" });

    const userId = req.user.id;

    if (!userId) {
      return res.status(400).json({ message: "No user found" });
    }

    const categoryTitle = req.body.category;

    const ifCategoryExists = await Category.find({ category: categoryTitle });

    if (ifCategoryExists.length > 0) {
      return res.status(400).json({ message: "Category already exits" });
    }

    categoryTitle.trim();

    if (!categoryTitle) {
      return res.status(400).json({ message: "Category title is compulsary" });
    }

    const category = new Category({
      userId,
      category: categoryTitle,
    });

    await category.save();

    res.status(200).json({ message: "Category added successfully", category });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// @desc Api to get all categories
// @api : GET /api/v1/category/
// @access Private
const getCategories = async (req, res) => {
  try {
    const userId = req.user.id;

    if (!userId) {
      return res.status(400).json({ message: "No user found" });
    }

    const categories = await Category.find({ userId });

    console.log(categories);

    res
      .status(200)
      .json({ message: "Categories fetched successfully", categories });
  } catch (error) {}
};

const editCategory = async (req, res) => {
  try {
  } catch (error) {}
};

// @desc Api to delete a category using it's id
// @api : GET /api/v1/delete/:categoryId
// @access Private
const deleteCategory = async (req, res) => {
  try {
    const userId = req.user.id;

    if (!userId) {
      return res.status(400).json({ message: "User not found" });
    }

    const categoryId = req.params.categoryId;

    if (!categoryId) {
      return res.status(400).json({ message: "Category Id is compulsary to" });
    }

    const category = await Category.find({ _id: categoryId });

    if (!category) {
      return res
        .status(400)
        .json({ message: "No category found for this user" });
    }

    if (category[0].userId.toString() !== userId) {
      return res
        .status(400)
        .json({ message: "User not authorized to perform this action" });
    }

    await Category.findByIdAndDelete({ _id: categoryId });

    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export { addCategory, editCategory, deleteCategory, getCategories };
