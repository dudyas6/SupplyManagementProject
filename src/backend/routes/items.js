const router = require("express").Router();
const items = require("../models/item.model.js");

function AddItemToDB(req, res) {
  return items
    .findOne({}, {}, { sort: { ItemId: -1 } }) // Find the last item by sorting in descending order of ItemId
    .then(async (lastItem) => {
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
