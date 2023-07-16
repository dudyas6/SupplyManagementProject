const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const monthlyStatisticSchema = new Schema({
  Id: Number,
  Revenue: Number,
  Expense: Number,
  Date: String,
});

const statisticItem = mongoose.model("statistics", monthlyStatisticSchema);

module.exports = statisticItem;
