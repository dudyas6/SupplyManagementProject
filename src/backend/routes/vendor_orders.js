const router = require("express").Router();
const vendor_order = require("../models/vendor_order.model.js");

router.route("/get").get((req, res) => {
  vendor_order
      .find()
      .then((order) => res.json(order))
      .catch((err) => res.status(400).json("Error: " + err));
  });
  
  module.exports = router;