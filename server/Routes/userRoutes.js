import express from "express";
import {
  loginUser,
  registerUser,
  logoutUser,
  authorizeUser,
  testUser,
  changePassword,
  authenticateEmail,
  resetPassword,
} from "../Controllers/userController.js";
import auth from "../middleware/auth.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);

userRouter.post("/login", loginUser);

userRouter.post("/logout", auth, logoutUser);

userRouter.get("/auth", auth, authorizeUser);

userRouter.post("/change-password", auth, changePassword);

userRouter.post("/forgot-password/email", authenticateEmail);

userRouter.post("/forgot-password/reset-password", resetPassword);

// userRouter.get("/test", auth, testUser);

export default userRouter;
