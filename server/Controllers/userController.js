import User from "../Models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import config from "dotenv/config";
import generateToken from "../Utils/generateToken.js";
import generateOtp from "../Utils/generateOtp.js";
import sendOtpMail from "../Utils/sendOtpMail.js";

// @api : /api/v1/user/register
// @desc Used to register a user
// @access : Public

const registerUser = async (req, res) => {
  const { email, password, name } = req.body;

  // Condition Checking
  if (!email) {
    return res.status(400).json({ message: "Email Id is required" });
  }

  if (!password) {
    return res.status(400).json({ message: "Please enter a valid password" });
  }

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: "Please provide a valid email Id" });
  }

  const userExists = await User.find({ email: email });

  if (userExists.length > 0) {
    return res
      .status(400)
      .json({ message: "Email already exists for another user" });
  }

  // New approach

  // creating User instance
  const user = new User({
    name,
    email,
  });

  // hashing the user entered password
  const hashedPassword = await user.hashPassword(password);

  user.password = hashedPassword;

  user.save();

  generateToken(res, user);

  // // Generate Token
  // const payload = {
  //   user: {
  //     id: user.id,
  //   },
  // };

  // jwt.sign(
  //   payload,
  //   process.env.JWT_SECRET,
  //   { expiresIn: "5d" },
  //   (err, token) => {
  //     if (err) console.log(err);
  //     res.status(200).json({ data: user, token: token });
  //   }
  // );

  // res.status(200).json({ message: "dev ongoing" });
  // res.status(200).json({});
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email id cannot be blank" });
  }

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: "Please provide a valid email id" });
  }

  if (!password) {
    return res.status(400).json({ message: "Password cannot be blank" });
  }

  const userExists = await User.findOne({ email });

  if (!userExists) {
    return res.status(400).json({ message: "No user found for this email" });
  }

  const passwordMatches = await bcrypt.compare(password, userExists.password);

  if (!passwordMatches) {
    return res.status(400).json({ message: "Incorrect Password" });
  }

  generateToken(res, userExists);
};

const logoutUser = async (req, res) => {
  res
    .status(200)
    .cookie("jwtToken", "none", {
      httpOnly: true,
      expires: new Date(Date.now() + 1 * 1000),
      secure: true,
      sameSite: "None",
    })
    .json({ message: "Logout Successful" });
  // res.status(200).json({ message: "Logout Successful from new controller" });
};

const testUser = async (req, res) => {
  res.status(200).json({ message: "test user successful" });
};

// const logoutUser = async (req, res) => {
//   res
//     .status(200)
//     .clearCookie("jwtToken", {
//       // Use clearCookie
//       httpOnly: true,
//       // secure: process.env.NODE_ENV === 'production', // Consider secure in production
//       sameSite: "strict", // recommended
//       path: "/",
//     })
//     .json({ message: "Logout Successful" });
//   return; // Ensure the function exits after sending the response
// };

// @api /api/v1/user/auth
// @desc api to fetch the current logged in user
// @access protected
const authorizeUser = async (req, res) => {
  const userId = req.user.id;

  if (!userId) {
    return res.status(400).json({ message: "Token not found" });
  }

  const user = await User.findOne({ _id: userId });

  if (!user) {
    return res.status(400).json({ message: "No user found for this id" });
  }

  try {
    res.status(200).json({ data: user, message: "User logged in" });
  } catch (error) {
    console.log("error log starts");
    console.log(error + " logged error");
    console.log("error log ends");
    return res.status(500).json({ message: error });
  }
};

const changePassword = async (req, res) => {
  console.log("change password api called");
  try {
    const userId = req.user.id;

    const user = await User.findById(userId);

    const { currentPassword, newPassword, confirmPassword } = req.body;

    // Logic to check if the current password is correct
    const isCorrectCurrentPassword = await bcrypt.compare(
      currentPassword,
      user.password
    );

    if (!isCorrectCurrentPassword) {
      return res.status(400).json({ message: "Incorrect current password" });
    }

    // Logic to check if the newly entered passwords match.
    if (newPassword !== confirmPassword) {
      return res
        .status(400)
        .json({ message: "Entered passwords do not match" });
    }

    const hashedPassword = await user.hashPassword(newPassword);

    user.password = hashedPassword;

    await user.save();

    res
      .cookie("jwtToken", "none", {
        httpOnly: true,
        expires: new Date(Date.now() + 1 * 1000),
        secure: true,
        sameSite: "None",
      })
      .status(200)
      .json({ message: "Password Updated successfully" });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

const authenticateEmail = async (req, res) => {
  try {
    const email = req.body.email;

    if (!email) {
      return res.status(400).json({ message: "Email id cannot be blank" });
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailRegex.test(email)) {
      return res
        .status(400)
        .json({ message: "Please provide a valid email id" });
    }

    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(400).json({ message: "No user found with mail" });
    }

    console.log(user);

    const otp = await generateOtp();

    user.otp = otp;
    user.otpExpiresAt = Date.now() + 10 * 60 * 1000;

    await user.save();

    // sending otp to customer via email
    sendOtpMail(mail, otp);

    res.status(200).json({ message: "OTP Sent to your email id" });
  } catch (error) {
    console.log(error);
  }
};

export {
  registerUser,
  loginUser,
  logoutUser,
  authorizeUser,
  testUser,
  changePassword,
  authenticateEmail,
};
