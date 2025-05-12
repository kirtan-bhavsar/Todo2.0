import jwt from "jsonwebtoken";
import config from "dotenv/config";

const generateToken = async (res, user) => {
  const payload = {
    user: {
      id: user.id,
    },
  };

  const cookieOptions = {
    httpOnly: true,
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    // expires: new Date(Date.now() + 100 * 1000),
  };

  jwt.sign(
    payload,
    process.env.JWT_SECRET,
    { expiresIn: "7d" },
    (err, token) => {
      if (err) console.log(err);

      // res.cookie("jwtToken", token, {
      //   httpOnly: true,
      //   secure: false,
      //   maxAge: 7 * 24 * 60 * 60 * 1000,
      // });
      // res.status(200).json({ data: user, token: token });

      res
        .status(200)
        .cookie("jwtToken", token, cookieOptions)
        .json({ data: user, token });
    }
  );
};

export default generateToken;
