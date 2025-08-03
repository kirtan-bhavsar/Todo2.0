import connectDB from "../db.js";
import User from "../Models/User.js";
import Category from "../Models/Category.js";
// import express from 'express';
// import mongoose from "mongoose";
// import connectDB from './../db';

const addDefaultCategory = async (req, res) => {
  connectDB();

  const users = await User.find();

  users.map((user) => {
    // console.log(user.id);
    // const category = new Category({
    //   userId: user.id,
    //   category: "Default",
    // });
    // category.save();
  });

  const categories = await Category.find();
  console.log(categories);
};

addDefaultCategory();
