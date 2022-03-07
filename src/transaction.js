class Transactions {
  Transactions = [];

  constructor() {
    this.Transactions = [
      {
        type: "income",
        catagory: "salary",
        amount: 10000,
      },
      {
        type: "expense",
        catagory: "shopping",
        amount: -10000,
      },
    ];
  }
  getTransactions() {
    return this.Transactions;
  }
  getTransaction(index) {
    return this.Transactions[index];
  }

  createTransaction(type, catagory, amount) {
    const newTransaction = {
      type,
      catagory,
      amount,
    };
    this.Transactions.push(newTransaction);
    return newTransaction;
  }
}

const TransactionsData = new Transactions();
module.exports = {
  TransactionsData,
};
