const router = require("express").Router();
const vendor_order = require("../models/vendor_order.model.js");
const items = require("../models/item.model.js");
const moment = require("moment");

function GetAllOrders(req, res) {
  vendor_order
    .find()
    .then((order) => res.json(order))
    .catch((err) => res.status(400).json("Error: " + err));
}


function GetWeeklyOrders(req, res, status) {
  try {
    const today = moment();

    // current week range
    const startOfWeek = today.clone().startOf("week").format("YYYY-MM-DD");
    const endOfWeek = today.clone().endOf("week").format("YYYY-MM-DD");

    // previous week range
    const startOfPreviousWeek = today
      .clone()
      .startOf("week")
      .subtract(1, "week")
      .format("YYYY-MM-DD");
    const endOfPreviousWeek = today
      .clone()
      .endOf("week")
      .subtract(1, "week")
      .format("YYYY-MM-DD");

    // query of current week
    const currentWeekOrdersPromise = vendor_order.find({
      Status: status,
      PurchaseDate: {
        $gte: startOfWeek,
        $lte: endOfWeek,
      },
    });

    // query of last week
    const previousWeekOrdersPromise = vendor_order.find({
      Status: status,
      PurchaseDate: {
        $gte: startOfPreviousWeek,
        $lte: endOfPreviousWeek,
      },
    });

    // Fetch both current week and previous week orders concurrently
    Promise.all([currentWeekOrdersPromise, previousWeekOrdersPromise])
      .then(([currentWeekOrders, previousWeekOrders]) => {
        // Perform necessary calculations for count and percentage change

        const currentWeekOrderCount = currentWeekOrders.length;
        const previousWeekOrderCount = previousWeekOrders.length;

        // calc
        const percentageChange = previousWeekOrderCount === 0 ? currentWeekOrderCount :
          ((currentWeekOrderCount - previousWeekOrderCount) /
            previousWeekOrderCount) *
          100;

        // Construct the response object
        const responseData = {
          currentWeekCount: currentWeekOrderCount,
          previousWeekCount: previousWeekOrderCount,
          changePercentage: percentageChange,
        };

        res.json(responseData);
      })
      .catch((err) => res.status(400).json("Error: " + err));
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(400).json("Error: " + error);
  }
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

async function FindAndUpdateItem(itemName, quantity, price = null) {
  // Find item by its name and update increment its quantity.
  // if not found - create the new item in warehouse
  try {
    const updatedItems = await items.findOneAndUpdate(
      { ItemName: itemName },
      { $inc: { CurrentQuantity: quantity } },
      { new: true }
    );

    if (!updatedItems) {
      const newItem = new items({
        ItemId: -1,
        ItemImage: "none",
        ItemName: itemName,
        Description: "new item - please insert description",
        Price: price == null ? -1 : price,
        CurrentQuantity: quantity,
        MinimumQuantity: 0,
      });

      await AddItem(newItem);
    }
  } catch (err) {
    console.log("Error: " + err);
  }
}

async function AddItem(itemToAdd) {
  // Add item to warehouse
  try {
    const lastItem = await items.findOne({}, {}, { sort: { ItemId: -1 } });

    itemToAdd.ItemId = lastItem ? lastItem.ItemId + 1 : 1;
    const savedItem = await itemToAdd.save();
    console.log("SAVED: " + savedItem);
    return savedItem;
  } catch (err) {
    return "Error: " + err;
  }
}

async function AddCompletedOrdersToWarehouse(res) {
  /* The function searchs for orders whice their status is "Completed".
   *  For each order, add the item to warehouse
   */
  try {
    const orders = await vendor_order.find({ Status: "Completed" });
    for (const order of orders) {
      if (!order.IsAddedToWarehouse) {
        order.IsAddedToWarehouse = true; // change status
        await order.save();

        await FindAndUpdateItem(
          order.ItemName,
          order.Quantity,
          (order.TotalPrice / order.Quantity).toFixed(2)
        );
      }
    }
    return res
      .status(200)
      .json("Completed orders added to warehouse successfully");
  } catch (err) {
    return res.status(400).json("Error updating orders: " + err);
  }
}

function AddOrderToDB(req, res) {
  return vendor_order
    .findOne({}, { OrderId: 1 }, { sort: { OrderId: -1 } }) // Find the last item by sorting in descending order of OrderId
    .then(async (lastItem) => {
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
      const savedOrder = await newItem.save();
      res.json(savedOrder); // send the saved order object as the response
    })
    .catch((err) => res.status(400).json("Error: " + err));
}

function GetCompletedOrdersNotAdded(req, res) {
  vendor_order
    .find({ Status: "Completed", IsAddedToWarehouse: false })
    .then((orders) => res.json(orders))
    .catch((err) => res.status(400).json("Error: " + err));
}
/* --------------------------
   --------- ROUTES ---------
   -------------------------- */

router.route("/get").get((req, res) => GetAllOrders(req, res));
router
  .route("/get/Completed")
  .get((req, res) => GetWeeklyOrders(req, res, "Completed"));
router
  .route("/get/Pending")
  .get((req, res) => GetWeeklyOrders(req, res, "Pending"));

router.route("/add").post((req, res) => AddOrderToDB(req, res));

router.route("/update-orders").get((req, res) => UpdateOrders(req, res));

router
  .route("/completed-orders-change")
  .get((req, res) => AddCompletedOrdersToWarehouse(res));

router
  .route("/get-completed-orders")
  .get((req, res) => GetCompletedOrdersNotAdded(req, res));

router.route("/delete/:id").delete((req, res) => {
  const OrderId = req.params.id;
  vendor_order
    .findOneAndDelete({ OrderId: OrderId })
    .then((order) => res.json(order))
    .catch((err) => res.status(400).json("Error: " + err));
});
module.exports = router;
