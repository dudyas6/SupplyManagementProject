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

export function InsertNewItem(item, thenFunction) {
  /// The function request to insert new item into DB, and gets a function to execute later
  console.log(item);
  axios
      .post(`http://localhost:3001/items/add/`, item)
      .then(() => {
        thenFunction();
      })
      .catch((error) => {
        console.error(error);
      });
}
