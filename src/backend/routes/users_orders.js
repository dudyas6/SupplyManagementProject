const router = require("express").Router();
const users_orders = require("../models/users_order.model.js");
const items = require("../models/item.model.js");

function GetAllOrders(req, res) {
  return users_orders
    .find()
    .then((order) => res.json(order))
    .catch((err) => res.status(400).json("Error: " + err));
}

function AddOrderToDB(req, res) {
  return users_orders
    .findOne({}, { OrderId: 1 }, { sort: { OrderId: -1 } }) // Find the last item by sorting in descending order of OrderId
    .then(async (lastItem) => {
      const OrderId = (lastItem ? lastItem.OrderId : 0) + 1;
      const ItemName = req.body.ItemName;
      const PurchaseDate = req.body.PurchaseDate;
      const Quantity = req.body.Quantity;
      const Status = req.body.Status;
      const TotalPrice = req.body.TotalPrice;

      const newItem = new users_orders({
        OrderId,
        ItemName,
        PurchaseDate,
        Quantity,
        Status,
        TotalPrice,
      });

      if (await DecreaseItemQuantity(ItemName, Quantity)) {
        // update the item quantity in stock
        const savedOrder = await newItem.save();
        res.json(savedOrder); // send the saved order object as the response
      } else res.json(null);
    })
    .catch((err) => res.status(400).json("Error: " + err));
}

// Find the item and decrease the quantity
function DecreaseItemQuantity(ItemName, quantityToDecrease) {
  return items
    .findOneAndUpdate(
      { ItemName: ItemName, CurrentQuantity: { $gt: quantityToDecrease - 1 } },
      { $inc: { CurrentQuantity: -quantityToDecrease } },
      { new: true }
    )
    .then((item) => {
      return item ? true : false;
    })
    .catch((err) => false);
}

/* --------------------------
   --------- ROUTES ---------
   -------------------------- */

router.route("/get").get((req, res) => GetAllOrders(req, res));

router.route("/add").post((req, res) => AddOrderToDB(req, res));

// router.route("/delete/:id").delete((req, res) => {
//   const OrderId = req.params.id;
//   vendor_order
//     .findOneAndDelete({ OrderId: OrderId })
//     .then((order) => res.json(order))
//     .catch((err) => res.status(400).json("Error: " + err));
// });
module.exports = router;
