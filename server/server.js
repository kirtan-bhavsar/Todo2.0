import express from "express";
import dotenv from "dotenv/config";
import connectDB from "./db.js";
import todoRouter from "./Routes/todoRoutes.js";
import cors from "cors";
import userRouter from "./Routes/userRoutes.js";
import categoryRouter from "./Routes/categoryRoutes.js";
import cookieParser from "cookie-parser";

const app = express();
const port = process.env.PORT;
const frontEndUrl = process.env.FRONTEND_URL;

app.use(express.json());

app.use(
  cors({
    origin: frontEndUrl,
    credentials: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE", // Specify allowed methods
    allowedHeaders: "Content-Type,Authorization,X-Auth-Token", // Specify allowed headers
  })
);

app.use(cookieParser());

connectDB();

// Mount Routers
app.use("/api/v1", todoRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/category", categoryRouter);

// Remove this when going into production
app.get("/api/v1/test", (req, res) => {
  res.status(200).json({ message: "API Running successfully" });
});

app.listen(port, () => {
  console.log(`Server Running successfully on Port ${port}`);
});
