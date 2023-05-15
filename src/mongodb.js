const express = require('express');
const mongoose = require('mongoose');

const app = express();

const PORT = 3001; // Choose a port number

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

// ...

const MONGODB_URI = 'mongodb+srv://<root>:<root>@supplymanagement.mkhycx5.mongodb.net/?retryWrites=true&w=majority';

mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('Error connecting to MongoDB:', error));
