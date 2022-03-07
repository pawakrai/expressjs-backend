const express = require("express");
var bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
const port = process.env.PORT || 8080;
const { apiRouter } = require("./src/api");
const { userRouter } = require("./src/userRoute");
const { User } = require("./src/model/userModel");
const jwt = require("jsonwebtoken");
const cors = require("cors");

//send data using JSON format
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const protect = async (req, res, next) => {
  const headerToken = req.headers["authorization"];
  if (!headerToken) {
    res.status(403).send("Not Auth");
  }

  const token = headerToken.split(" ")[1];
  console.log(token);
  if (!token) {
    res.status(403).send("Not Auth");
  }
  const data = jwt.decode(token);

  console.log(data);
  const user = await User.findById(data.userID);
  if (!user) {
    res.status(403).send("User not found");
  }
  req.userId = user._id;

  next();
};

//use api router
app.use("/api", protect, apiRouter);
app.use("/user", userRouter);

//basic route
app.get("/", (req, res) => {
  res.send("Hello World! Nick");
});

app.get("/Nick", (req, res) => {
  res.send("Nick");
});

//start app
mongoose
  .connect(
    "mongodb+srv://pawakrai:Pkrai!135791@cluster0.ydmfn.mongodb.net/mern?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("connect mongodb success");
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
  })
  .catch(() => {
    console.log("connect mongodb error");
  });
