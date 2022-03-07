const express = require("express");
const { TransactionsData } = require("./transaction");
const apiRouter = express.Router();
const { Transaction } = require("./model/transactionModel");

const loggingMiddleware = (req, res, next) => {
  console.log("Body : >>", req.body);
  next();
};

apiRouter.use(loggingMiddleware);

apiRouter.get("/transactions", async (req, res) => {
  // //   const transections = TransactionsData.getTransactions();

  //   res.json({
  //     transections,
  //   });
  console.log(req.userId);
  const filter = req.query;
  const transactions = await Transaction.find(filter).exec();
  res.json({
    transactions,
  });
});

apiRouter.get("/transaction/:id", async (req, res) => {
  const id = req.params.id;
  const transaction = await Transaction.findById(id).exec();
  res.json({
    transaction,
  });
});

apiRouter.post("/transaction", async (req, res) => {
  const data = req.body;

  const newTransaction = new Transaction(data);
  await newTransaction.save();
  res.json({
    newTransaction,
  });
});

apiRouter.put("/transaction/:id", async (req, res) => {
  const newTransaction = req.body;
  const updatedTX = await Transaction.updateOne(
    { _id: req.params.id },
    newTransaction
  ).exec();

  res.json({
    updatedTX,
  });
});

apiRouter.delete("/transaction/:id", async (req, res) => {
  const deleteResponse = await Transaction.deleteOne({ _id: req.params.id });

  res.json({
    deleteResponse,
  });
});

module.exports = { apiRouter };
