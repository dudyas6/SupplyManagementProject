const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const vendor_orders = new Schema({
  ItemID: Number,
  ItemName: String,
  PurchaseDate: String,
  Quantity: Number,
  Status: String,
  TotalPrice: Number,
});


const orders = mongoose.model("vendor_orders", vendor_orders);

module.exports = orders;