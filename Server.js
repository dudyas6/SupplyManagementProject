const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const port = process.env.PORT || 3000;
const app = express();

app.use(express.json());

// Serve the client-side code from the 'build' folder
app.use(express.static(path.join(__dirname, "build")));

const uri =
  "mongodb+srv://root:root@supplymanagement.mkhycx5.mongodb.net/?retryWrites=true&w=majority";

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB:", error.message);
  });

// define a schema for your data
const itemSchema = new mongoose.Schema({
  ItemId: Number,
  ItemName: String,
  Description: String
});

// // define a model for your data
const Item = mongoose.model("Item", itemSchema);

// Define a route to get all bugs
app.get("/api/getAllItems", async (req, res) => {
  try {
    const allItems = await Item.find({});
    console.log(res)
    res.json(allItems);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// // Define a route to add a new bug
// app.post("/api/addBug", async (req, res) => {
//   try {
//     const newBug = new Bug(req.body);
//     await newBug.save();
//     res.json({ message: "Bug added successfully" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// });

// // Define a route to delete a bug by _id
// app.delete("/api/getAllBugs/:id", (req, res) => {
//   const id = req.params.id;
//   Bug.findByIdAndDelete(id)
//     .then((deletedBug) => {
//       if (!deletedBug) {
//         res.status(404).send(`Bug with ID ${id} not found`);
//       } else {
//         res.status(200).send(`Bug with ID ${id} deleted successfully`);
//       }
//     })
//     .catch((err) => {
//       res.status(500).send(err);
//     });
// });

// // Define a route to edit a bug by _id
// app.put("/api/getAllBugs/:id", async (req, res) => {
//   const id = req.params.id;
//   try {
//     const updatedBug = await Bug.findByIdAndUpdate(id, req.body, {
//       new: true,
//       useFindAndModify: false,
//     });
//     if (!updatedBug) {
//       res.status(404).send(`Bug with ID ${id} not found`);
//     } else {
//       res.json(updatedBug);
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// });

// Serve the client-side code for all other requests
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});