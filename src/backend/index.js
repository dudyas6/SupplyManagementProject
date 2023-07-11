const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const PORT = 3001; // Choose a port number
const cron = require('node-cron');
const vendor_order = require("./models/vendor_order.model.js");

// Server uses
app.use(express.json());
app.use(cors({
  origin: "https://supply-api.vercel.app",
}));

// Routes
const itemsRoute = require("./routes/items");
const usersRoute = require("./routes/users");
const vendorOrdersRoute = require("./routes/vendor_orders");
const usersOrdersRoute = require("./routes/users_orders");

// App Uses
app.use("/items", itemsRoute);
app.use("/users", usersRoute);
app.use("/orders/vendor", vendorOrdersRoute);
app.use("/orders/users", usersOrdersRoute);

// Serve the client-side code from the 'build' folder
// app.use(express.static(PATH.join(__dirname, "build")));

const MONGODB_URI =
  "mongodb+srv://root:root@supplymanagement.mkhycx5.mongodb.net/SupplyManagement?retryWrites=true&w=majority";

mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB:", error.message);
  });

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

// The function do some tasks every 24h
const AutoTasks = () =>{
  // define the time -> every day at 06am. (minute-hour-day-month-year)
  cron.schedule('0 06 * * *', () => {

  // change status for al orders from vendor_order table
  ChangeOrderFromVendorStatus();
  
  // TODO: change status for all orders from users_order table
  
  });
  
}


function ChangeOrderFromVendorStatus() {
  // The function changes status for all orders from vendor_order table.
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
      .then(() => console.log("Orders updated successfully"))
      .catch((err) => console.log("Error updating orders: " + err));
  })
  .catch((err) => console.log("Error fetching orders: " + err));
}

AutoTasks();
