const mongoose = require("mongoose");

const transactionSehema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
  catagory: {
    type: String,
    default: "Shopping",
  },
  amount: {
    type: Number,
  },
  date: {
    type: Date,
    default: new Date(),
  },
});

const Transaction = mongoose.model("transaction", transactionSehema);

module.exports = { Transaction };
