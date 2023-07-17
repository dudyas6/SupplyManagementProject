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
    .get(`https://supply-api.vercel.app/statistics/get/`)
    .then((response) => {
        return response.data;
    })
    .catch((error) => {
      console.error(error);
    });
}

export function InsertNewStatisticItem() {
  return axios
    .post(`https://supply-api.vercel.app/statistics/add/`)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      console.log(error);
    });
}

export function GetAvgRevenuesExpenses() {
  return axios
    .get(`https://supply-api.vercel.app/statistics/avgRE/`)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      console.log(error);
    });
}

