const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const PORT = 3001; // Choose a port number

// Server uses
app.use(express.json());
app.use(cors());

// Routes
const itemsRoute = require("./src/backend/routes/items");
const usersRoute = require("./src/backend/routes/users");
const ordersRoute = require("./src/backend/routes/vendor_orders");

// App Uses
app.use("/items", itemsRoute);
app.use("/users", usersRoute);
app.use("/orders/vendor", ordersRoute);

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

// Serve the client-side code for all other requests
// app.get('*', (req, res) => {
//   res.sendFile(PATH.join(__dirname, 'build', 'index.html'));
// });
