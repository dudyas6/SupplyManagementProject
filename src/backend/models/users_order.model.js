const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const user_orders = new Schema({
  OrderId: Number,
  ItemName: String,
  PurchaseDate: String,
  Quantity: Number,
  Status: String,
  TotalPrice: Number,
});


const orders = mongoose.model("user_orders", user_orders);

module.exports = orders;