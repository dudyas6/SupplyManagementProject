const router = require("express").Router();
const vendor_order = require("../models/vendor_order.model.js");

router.route("/get").get((req, res) => {
  vendor_order
    .find()
    .then((order) => res.json(order))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  vendor_order
    .findOne({}, { OrderId: 1 }, { sort: { OrderId: -1 } }) // Find the last item by sorting in descending order of OrderId
    .then((lastItem) => {
      const OrderId = (lastItem ? lastItem.OrderId : 0) + 1;
      const ItemName = req.body.ItemName;
      const PurchaseDate = req.body.PurchaseDate;
      const Quantity = req.body.Quantity;
      const Status = req.body.Status;
      const TotalPrice = req.body.TotalPrice;

      const newItem = new vendor_order({
        OrderId,
        ItemName,
        PurchaseDate,
        Quantity,
        Status,
        TotalPrice,
      });

      return newItem.save();
    })
    .then((savedOrder) => { 
      res.json(savedOrder);   // send the saved order object as the response
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route('/delete').delete((req, res) => {
  console.log(req.body);
  const { OrderId } = req.body;
  
  // Perform the deletion operation using your preferred method (e.g., MongoDB, Mongoose, etc.)
  // Replace the following code with your actual deletion logic
  vendor_order.findOneAndDelete({ OrderId:OrderId })
    .then((deletedOrder) => {
      if (!deletedOrder) {
        return res.status(404).json({ error: 'Order not found' });
      }
      res.json({ message: 'Order deleted successfully' });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: 'Internal server error' });
    });
});


module.exports = router;
