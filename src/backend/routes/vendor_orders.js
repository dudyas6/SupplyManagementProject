const router = require("express").Router();
const vendor_order = require("../models/vendor_order.model.js");

router.route("/get").get((req, res) => {
  vendor_order
    .find()
    .then((order) => res.json(order))
    .catch((err) => res.status(400).json("Error: " + err));
});



router.route("/add").post((req, res) => {
  vendor_order
    .findOne({}, {}, { sort: { ItemID: -1 } }) // Find the last item by sorting in descending order of ItemId
    .then((lastItem) => {
      const ItemID = (lastItem ? lastItem.ItemID : 0) + 1;
      const ItemName = req.body.ItemName;
      const PurchaseDate = req.body.PurchaseDate;
      const Quantity = req.body.Quantity;
      const Status = req.body.Status;
      const TotalPrice = req.body.TotalPrice;

      const newItem = new vendor_order({
        ItemID,
        ItemName,
        PurchaseDate,
        Quantity,
        Status,
        TotalPrice,
      });

      return newItem.save();
    })
    .then(() => res.json("Order Placed!"))
    .catch((err) => res.status(400).json("Error: " + err));
});
module.exports = router;
