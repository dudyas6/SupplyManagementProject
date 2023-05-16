// const express = require('express');
// const mongoose = require('mongoose');

// const app = express();
// const PORT = 3001; // Choose a port number


// const MONGODB_URI = 'mongodb+srv://root:root@supplymanagement.mkhycx5.mongodb.net/?retryWrites=true&w=majority';

// mongoose
//   .connect(MONGODB_URI, 
//     { 
//       useNewUrlParser: true, 
//       useUnifiedTopology: true 
//     })
//   .then(() => console.log('Connected to MongoDB'))
//   .catch((error) => console.error('Error connecting to MongoDB:', error));

// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));

// app.listen(PORT, () => {
//   console.log(`Server listening on ${PORT}`);
// });


var axios = require('axios');
var data = JSON.stringify({
    "collection": "items",
    "database": "SupplyManagement",
    "dataSource": "SupplyManagement",
    "projection": {
        "_id": 1
    }
});
            
var config = {
    method: 'post',
    url: 'https://eu-west-2.aws.data.mongodb-api.com/app/data-sjlfd/endpoint/data/v1/action/findOne',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Request-Headers': '*',
      'api-key': '8CddyRYbE2FYO49xv7Ew1LB4nuzuBg44OEOIqZgwJUfZdZE3WdpqsYHCPBeSGupk',
    },
    data: data
};
            
axios(config)
    .then(function (response) {
        console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
        console.log(error);
    });