const router = require("express").Router();
const items = require("../models/item.model.js");

router.route("/get").get((req, res) => {
  items
    .find()
    .then((items) => res.json(items))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  items
    .findOne({}, {}, { sort: { ItemId: -1 } }) // Find the last item by sorting in descending order of ItemId
    .then((lastItem) => {
      const lastItemId = lastItem ? lastItem.ItemId : 0;
      const ItemImage = req.body.ItemImage;
      const ItemName = req.body.ItemName;
      const Description = req.body.Description;
      const Price = req.body.Price;
      const CurrentQuantity = req.body.CurrentQuantity;
      const MinimumQuantity = req.body.MinimumQuantity;
      const newItemId = lastItemId + 1;

      const newItem = new items({
        ItemId: newItemId,
        ItemImage,
        ItemName,
        Description,
        Price,
        CurrentQuantity,
        MinimumQuantity,
      });

      return newItem.save();
    })
    .then((savedItem) => { 
      res.json(savedItem);   // send the saved item object as the response
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/update/:id").put((req, res) => {
  const ItemId = req.params.id;
  const updatedItem = req.body;
  items
    .findOneAndUpdate({ ItemId: ItemId }, updatedItem, { new: true })
    .then((item) => res.json(item))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
