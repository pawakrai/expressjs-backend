const mongoose = require("mongoose");

const userSehema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  displayName: {
    type: String,
    default: "User001",
  },
  age: {
    type: Number,
    default: 15,
  },
});

const User = mongoose.model("user", userSehema);

module.exports = { User };
