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
    .find({ $expr: { $gt: [{ $subtract: ["$CurrentQuantity", "$MinimumQuantity"] }, 0] } })
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
  user_orders.aggregate([
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


router.route("/getRandomItem").get((req, res) => {
  items
    .find()
    .then((item) => res.json(item))
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

module.exports = router;
