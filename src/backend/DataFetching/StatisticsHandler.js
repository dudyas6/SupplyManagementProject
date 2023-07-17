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

export function GetAllStatisticsData() {
  return axios
    .get(`http://localhost:3001/statistics/get/`)
    .then((response) => {
        console.log(response.data);
    })
    .catch((error) => {
      console.error(error);
    });
}

export function InsertNewStatisticItem() {
  return axios
    .post(`http://localhost:3001/statistics/add/`)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      console.log(error);
    });
}

export function GetAvgRevenuesExpenses() {
  return axios
    .get(`http://localhost:3001/statistics/avgRE/`)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      console.log(error);
    });
}

