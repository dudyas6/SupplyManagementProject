const router = require("express").Router();
const vendor_order = require("../models/vendor_order.model.js");

function GetAllOrders(req, res) {
  vendor_order
    .find()
    .then((order) => res.json(order))
    .catch((err) => res.status(400).json("Error: " + err));
}
function UpdateOrders(req, res) {
  vendor_order
    .find({ Status: { $ne: "Completed" } }) // status not equal to "Completed"
    .then((orders) => {
      // update status of each order
      orders.forEach((order) => {
        if (order.Status === "Pending") {
          order.Status = "In Progress";
        } else if (order.Status === "In Progress") {
          order.Status = "Completed";
        }
      });

      // save the updated orders
      Promise.all(orders.map((order) => order.save()))
        .then(() => res.json("Orders updated successfully"))
        .catch((err) => res.json("Error updating orders: " + err));
    })
    .catch((err) => res.json("Error fetching orders: " + err));
}

function AddCompletedOrdersToWarehouse(req, res) {
  vendor_order
    .find({ Status: "Completed" }) // status equal to "Completed"
    .then((orders) => {
      orders.forEach((order) => {
        // for each completed order - add the quantity on warehouse
        if (order.IsAddedToWarehouse === false) {
          // TODO: add to warehouse
          FindAndUpdateItem(order.ItemName, order.Quantity)
          // change status
          order.IsAddedToWarehouse = true;
        }
      });

      // save the updated orders
      Promise.all(orders.map((order) => order.save()))
        .then(() =>
          res.json("Completed orderes added to warehouse successfully")
        )
        .catch((err) => res.json("Error updating orders: " + err));
    });
}


function FindAndUpdateItem(ItemName, Quantity){
  // The function search for the item and update its quantity on DB.
}

function AddOrderToDB(req, res) {
  vendor_order
    .findOne({}, { OrderId: 1 }, { sort: { OrderId: -1 } }) // Find the last item by sorting in descending order of OrderId
    .then((lastItem) => {
      const OrderId = (lastItem ? lastItem.OrderId : 0) + 1;
      const ItemName = req.body.ItemName;
      const PurchaseDate = req.body.PurchaseDate;
      const Quantity = req.body.Quantity;
      const Status = req.body.Status;
      const TotalPrice = req.body.TotalPrice;
      const IsAddedToWarehouse = false;

      const newItem = new vendor_order({
        OrderId,
        ItemName,
        PurchaseDate,
        Quantity,
        Status,
        TotalPrice,
        IsAddedToWarehouse,
      });
      const savedOrder = newItem.save();
      res.json(savedOrder); // send the saved order object as the response
    })
    .catch((err) => res.status(400).json("Error: " + err));
}


/* --------------------------
   --------- ROUTES ---------
   -------------------------- */

router.route("/get").get((req, res) => {
  GetAllOrders(req, res);
});

router.route("/update-orders").get((req, res) => {
  UpdateOrders(req, res);
});

router.route("/completed-orders-change").get((req, res) => {
  AddCompletedOrdersToWarehouse(req, res);
});

router.route("/add").post((req, res) => {
  AddOrderToDB(req, res);
});

router.route("/delete").delete((req, res) => {
  const { OrderId } = req.body;
  vendor_order
    .findOneAndDelete({ OrderId: OrderId })
    .then((deletedOrder) => {
      if (!deletedOrder) {
        return res.status(404).json({ error: "Order not found" });
      }
      res.json({ message: "Order deleted successfully" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "Internal server error" });
    });
});

module.exports = router;
