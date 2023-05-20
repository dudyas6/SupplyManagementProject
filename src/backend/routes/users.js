const router = require("express").Router();
const users = require("../models/user.model.js");

router.route("/get").get((req, res) => {
    users
      .find()
      .then((users) => res.json(users))
      .catch((err) => res.status(400).json("Error: " + err));
  });
  
  module.exports = router;