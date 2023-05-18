const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = 3001; // Choose a port number
const PATH = require("path");

app.use(express.json());
// Serve the client-side code from the 'build' folder
app.use(express.static(PATH.join(__dirname, "build")));

const MONGODB_URI = 'mongodb+srv://root:root@supplymanagement.mkhycx5.mongodb.net/SupplyManagement?retryWrites=true&w=majority';

// define a schema for your data
const itemSchema = new mongoose.Schema({
  ItemId: Number,
  ItemName: String,
  Description: String,
});

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  role: String,
});

// 
const items = mongoose.model("items", itemSchema);
const users = mongoose.model("users", userSchema);

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



// Define a route to get all bugs
app.get("/api/getAllItems", async (req, res) => {
  try {
    const allItems = await items.find({});
    res.json(allItems);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});


// Define a route to get all bugs
app.get("/api/getAllUsers", async (req, res) => {
  try {
    const allUsers = await users.find({});
    res.json(allUsers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});


// Serve the client-side code for all other requests
app.get('*', (req, res) => {
  res.sendFile(PATH.join(__dirname, 'build', 'index.html'));
});


app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });

// var axios = require('axios');
// var data = JSON.stringify({
//     "collection": "items",
//     "database": "SupplyManagement",
//     "dataSource": "SupplyManagement",
//     "projection": {
//         "_id": 1
//     }
// });
            
// var config = {
//     method: 'post',
//     url: 'https://eu-west-2.aws.data.mongodb-api.com/app/data-sjlfd/endpoint/data/v1/action/findOne',
//     headers: {
//       'Content-Type': 'application/json',
//       'Access-Control-Request-Headers': '*',
//       'api-key': '8CddyRYbE2FYO49xv7Ew1LB4nuzuBg44OEOIqZgwJUfZdZE3WdpqsYHCPBeSGupk',
//     },
//     data: data
// };
            
// axios(config)
//     .then(function (response) {
//         console.log(JSON.stringify(response.data));
//     })
//     .catch(function (error) {
//         console.log(error);
//     });