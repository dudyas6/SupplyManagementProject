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

export function GenerateNewOrder(){
  /// Generate random order into DB
  
  // Get random item

  // create SingleOrder object with item ID and Name

  // apply today as PurchaseDate

  // random quantity (1-50)

  // Random Status (Create ENUM)

  // Price - by item price multiple the quantity
  
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

