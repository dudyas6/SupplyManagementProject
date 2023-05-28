
import axios from "axios";

export class SingleItem {
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
  return axios
      .post(`http://localhost:3001/items/add/`, item)
      .then((res) => {
        thenFunction();
        return res.data;
      })
      .catch((error) => {
        console.error(error);
      });
}

export function UpdateItem(itemId, item) {
  axios
    .put(`http://localhost:3001/items/update/${itemId}`, item) 
    .then(response => {
      console.log(response.data);
    })
    .catch(error => {
      console.log(error);
    });
}

export function DeleteItem(itemId) {
  axios
  .delete(`http://localhost:3001/items/delete/${itemId}`) 
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.log(error);
  });
}