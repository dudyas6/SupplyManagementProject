import React from "react";
import axios from "axios";

class SingleItem {
    constructor(
      ItemImage,
      ItemId,
      ItemName,
      Description,
      Price,
      CurrentQuantity,
      MinimumQuantity
    ) {
      this.ItemImage = ItemImage;
      this.ItemId = ItemId;
      this.ItemName = ItemName;
      this.Description = Description;
      this.Price = Price;
      this.CurrentQuantity = CurrentQuantity;
      this.MinimumQuantity = MinimumQuantity;
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

export function GetAllItems() {
    return axios
      .get(`http://localhost:3001/items/get/`)
      .then((response) => {
        const data = response.data.map((product) => {
          const item = new SingleItem(
            product.ItemImage,
            product.ItemId,
            product.ItemName,
            product.Description,
            product.Price,
            product.CurrentQuantity,
            product.MinimumQuantity
          );
          return item;
        });
        return data;
      })
      .catch((error) => {
        console.error(error);
      });
  }

