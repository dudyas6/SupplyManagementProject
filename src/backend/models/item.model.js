const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const itemSchema = new Schema({
    ItemImage: String,
    ItemId: Number,
    ItemName: String,
    Description: String,
    Price: Number,
    CurrentQuantity: Number,
    MinimumQuantity: Number,
  });

const item = mongoose.model("items", itemSchema);

module.exports = item;

