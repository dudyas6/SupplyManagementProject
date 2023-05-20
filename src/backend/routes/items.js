const router = require("express").Router();
const items = require("../models/item.model.js");

router.route("/get").get((req, res) => {
  items
    .find()
    .then((items) => res.json(items))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;