const router = require("express").Router();
const items = require("../models/item.model.js");

export function FindAndUpdateItem(itemName, quantity) {
  // The function search for the item and update its quantity on DB.
  var isItemFound = false;
  items
    .find({ ItemName: itemName })
    .then((items) => {
      items.forEach((item) => {
        // the name should be unique but for now...
        item.Quantity += quantity;
        item.save();
        isItemFound = true;
      });
    })
    .catch((err) => console.log("Error: " + err));
  if (!isItemFound) {
    // should create new item since item is not found
  }
}

router.route("/get").get((req, res) => {
  items
    .find()
    .then((items) => res.json(items))
    .catch((err) => res.status(400).json("Error: " + err));
});

function AddItem(itemToAdd) {
  return items
    .findOne({}, {}, { sort: { ItemId: -1 } }) // Find the last item by sorting in descending order of ItemId
    .then((lastItem) => {
      itemToAdd.ItemId = lastItem.ItemId + 1;
      const savedItem = itemToAdd.save();
      return savedItem;
    })

    .catch((err) => {
      return "Error: " + err;
    });
}

router.route("/add").post((req, res) => {
  const ItemImage = req.body.ItemImage;
  const ItemName = req.body.ItemName;
  const Description = req.body.Description;
  const Price = req.body.Price;
  const CurrentQuantity = req.body.CurrentQuantity;
  const MinimumQuantity = req.body.MinimumQuantity;

  const newItem = new items({
    ItemId: -1,
    ItemImage,
    ItemName,
    Description,
    Price,
    CurrentQuantity,
    MinimumQuantity,
  });

  const result = AddItem(newItem);
  res.json(result);

});

router.route("/update/:id").put((req, res) => {
  const ItemId = req.params.id;
  const updatedItem = req.body;
  items
    .findOneAndUpdate({ ItemId: ItemId }, updatedItem, { new: true })
    .then((item) => res.json(item))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/delete/:id").delete((req, res) => {
  const ItemId = req.params.id;
  items
    .findOneAndDelete({ ItemId: ItemId })
    .then((item) => res.json(item))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
