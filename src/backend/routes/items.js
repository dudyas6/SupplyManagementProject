const router = require("express").Router();
const items = require("../models/item.model.js");
const user_orders = require("../models/users_order.model.js");

function AddItemToDB(req, res) {
  return items
    .findOne({}, {}, { sort: { ItemId: -1 } }) // Find the last item by sorting in descending order of ItemId
    .then(async (lastItem) => {
      console.log(lastItem);
      const ItemImage = req.body.ItemImage;
      const ItemName = req.body.ItemName;
      const Description = req.body.Description;
      const Price = req.body.Price;
      const CurrentQuantity = req.body.CurrentQuantity;
      const MinimumQuantity = req.body.MinimumQuantity;

      const newItem = new items({
        ItemId: lastItem ? lastItem.ItemId + 1 : 1,
        ItemImage,
        ItemName,
        Description,
        Price,
        CurrentQuantity,
        MinimumQuantity,
      });

      const savedItem = await newItem.save();
      res.json(savedItem);
    })
    .catch((err) => res.status(400).json("Error: " + err));
}

function FindAndUpdateItem(req, res) {
  const ItemId = req.params.id;
  const updatedItem = req.body;
  items
    .findOneAndUpdate({ ItemId: ItemId }, updatedItem, { new: true })
    .then((item) => {
      res.json(item);
    })
    .catch((err) => res.status(400).json("Error: " + err));
}

router.route("/get").get((req, res) => {
  items
    .find()
    .then((items) => res.json(items))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/countItemsUnderMin").get((req, res) => {
  items
    .find({
      $expr: {
        $and: [
          { $lt: [{ $subtract: ["$CurrentQuantity", "$MinimumQuantity"] }, 0] },
          { $ne: ["$CurrentQuantity", 0] },
        ],
      },
    })
    .then((items) => res.json(items.length))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/countZeroQuantity").get((req, res) => {
  items
    .find({ CurrentQuantity: 0 })
    .then((items) => res.json(items.length))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/top5BestSellingItems").get((req, res) => {
  user_orders
    .aggregate([
      { $match: { Status: "Completed" } },
      { $group: { _id: "$ItemName", totalQuantity: { $sum: "$Quantity" } } },
      { $sort: { totalQuantity: -1 } },
      { $limit: 5 },
    ])
    .then((items) => {
      const topItemsLabels = items.map((item) => item._id);
      const topItemsValues = items.map((item) => item.totalQuantity);
      res.json({ topItemsLabels, topItemsValues });
    })
    .catch((err) => res.status(400).json("Error: " + err));
});


router.route("/add").post((req, res) => {
  AddItemToDB(req, res);
});

router.route("/update/:id").put((req, res) => {
  FindAndUpdateItem(req, res);
});

router.route("/delete/:id").delete((req, res) => {
  const ItemId = req.params.id;
  items
    .findOneAndDelete({ ItemId: ItemId })
    .then((item) => res.json(item))
    .catch((err) => res.status(400).json("Error: " + err));
});
router.route("/createRandomItem").get((req, res) => {
  // Find items with quantity > 0
  items
    .find({ CurrentQuantity: { $gt: 0 } })
    .then((availableItems) => {
      if (availableItems.length === 0) {
        res.status(404).json("No available items found");
      } else {
        // Select a random item from the available items
        const randomItem = availableItems[Math.floor(Math.random() * availableItems.length)];

        // Generate a random quantity between 1 and the maximum item quantity
        const randomQuantity = Math.floor(Math.random() * randomItem.CurrentQuantity) + 1;

        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, "0");
        const day = String(currentDate.getDate()).padStart(2, "0");
        const formattedDate = `${year}-${month}-${day}`;

        user_orders
        .findOne({}, { OrderId: 1 }, { sort: { OrderId: -1 } }) // Find the last item by sorting in descending order of OrderId
        .then(async (lastItem) => {
          const orderId = (lastItem ? lastItem.OrderId : 0) + 1;
          
        // Create a new order with the randomly selected item, generated quantity, and calculated total price
        const order = new user_orders({
          OrderId: parseInt(orderId),
          ItemName: randomItem.ItemName,
          PurchaseDate: formattedDate,
          Quantity: randomQuantity,
          Status: "Completed",
          TotalPrice: (randomQuantity * randomItem.Price).toFixed(2),
        });

          res.json(await AddOrderToDB(order));
        })
      }
    })
    .catch((err) => res.status(400).json("Error retrieving available items: " + err));
});


async function AddOrderToDB(order){
  if (await DecreaseItemQuantity(order.ItemName, order.Quantity)) {
    // update the item quantity in stock
    return await order.save();

  } else return null;
}

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

module.exports = router;
