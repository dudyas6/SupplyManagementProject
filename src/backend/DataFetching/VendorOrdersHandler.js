import React from "react";
import axios from "axios";
class SingleOrder {
  constructor(ItemID, ItemName, PurchaseDate, Quantity, Status, TotalPrice) {
    this.ItemID = ItemID;
    this.ItemName = ItemName;
    this.PurchaseDate = PurchaseDate;
    this.Quantity = Quantity;
    this.Status = Status;
    this.TotalPrice = TotalPrice;
  }
}
export const StatusEnum = {
  PENDING: 'Pending',
  INPROGRESS: 'In Progress',
  COMPLETED: 'Completed',
};


export function GenerateNewOrder(){
  /// Generate random order into DB
  // apply today as PurchaseDate

  const currentDate = new Date();

  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Month is zero-based, so we add 1 and pad with leading zero if necessary
  const day = String(currentDate.getDate()).padStart(2, "0"); // Pad day with leading zero if necessary
  
  const formattedDate = `${year}-${month}-${day}`;

  // Get random item

  // Get Random quantity...
  const max = 100.0;
  const min = 2.2;
  const randomQuantity = Math.ceil(Math.random() * (max/2 - min) + min);
  const randomPPQ = Math.random() * (max - min) + min; // Price Per Quantity

  // Get an array of enum values
  const enumValues = Object.values(StatusEnum);
  const randomIndex = Math.floor(Math.random() * enumValues.length);

  // create SingleOrder object with item ID and Name
  const order = new SingleOrder(-1, "Random Order", formattedDate, randomQuantity, enumValues[randomIndex], (randomQuantity*randomPPQ).toFixed(2));

  const thenFunction = () => {console.log(order);}
   axios
       .post(`http://localhost:3001/orders/vendor/add/`, order)
       .then(() => {
         thenFunction();
       })
       .catch((error) => {
         console.error(error);
       });
}
export function GetAllOrders() {
  return axios
    .get(`http://localhost:3001/orders/vendor/get/`)
    .then((response) => {
      const data = response.data.map((order) => {
        const item = new SingleOrder(
          order.ItemID,
          order.ItemName,
          order.PurchaseDate,
          order.Quantity,
          order.Status,
          order.TotalPrice
        );
        return item;
      });
      return data;
    })
    .catch((error) => {
      console.error(error);
    });
}


