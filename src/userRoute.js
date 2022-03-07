const express = require("express");
const { User } = require("./model/userModel");
const bcrypt = require("bcrypt");
const userRouter = express.Router();
const jwt = require("jsonwebtoken");
const jwtSecret = "12321321";

const errorMiddleware = (error, req, res, next) => {
  res.send(error.toString());
};

const encryptText = (text) => {
  const salt = bcrypt.genSaltSync(10);
  console.log(salt);
  const encryptData = bcrypt.hashSync(text, salt);
  return encryptData;
};

const compareEncryptText = (text, encryptText) => {
  const matched = bcrypt.compareSync(text, encryptText);
  return matched;
};

userRouter.post("/register", async (req, res, next) => {
  try {
    const data = req.body;
    const user = new User({
      username: data.username,
      password: encryptText(data.password),
    });
    await user.save();
    res.json({
      user,
    });
  } catch (error) {
    next(error);
  }
});

userRouter.post("/login", async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username }).exec();
    if (!user) {
      res.status(403).send("Username or Password wrong");
      return;
    }
    const isPasswordMatch = compareEncryptText(password, user.password);
    if (!isPasswordMatch) {
      res.status(403).send("Username or Password wrong");
      return;
    }
    const jwtToken = jwt.sign({ userID: user._id }, jwtSecret);
    res.json({ token: jwtToken });
  } catch (error) {
    next(error);
  }
});

userRouter.use(errorMiddleware);
module.exports = { userRouter };
