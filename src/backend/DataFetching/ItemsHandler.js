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
  //http://localhost:3001/
  //https://supply-api.vercel.app/
    .get(`https://supply-api.vercel.app/items/get/`)
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



export function CountItemsUnderMin() {
  return axios
    .get(`https://supply-api.vercel.app/items/countItemsUnderMin`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error(error);
    });
}


export function CountZeroQuantity() {
  return axios
    .get(`https://supply-api.vercel.app/items/countZeroQuantity`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error(error);
    });
}
export function GetTop5BestSelling() {
  return axios
    .get(`https://supply-api.vercel.app/items/top5BestSellingItems`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error(error);
    });
}

export function InsertNewItem(item, thenFunction) {
  console.log(item);
  return axios
    .post(`https://supply-api.vercel.app/items/add/`, item)
    .then((res) => {
      thenFunction();
      return res.data;
    })
    .catch((error) => {
      console.log(error);
    });
}

export async function UpdateItem(itemId, item) {
  return axios
    .put(`https://supply-api.vercel.app/items/update/${itemId}`, item)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      console.log(error);
    });
}

export function DeleteItem(itemId) {
  axios
    .delete(`https://supply-api.vercel.app/items/delete/${itemId}`)
    .then((res) => {
      console.log(res.data);
    })
    .catch((error) => {
      console.log(error);
    });
}


export function GetRandomItem() {
  return axios
    // .get(`https://supply-api.vercel.app/items/getRandomItem/`)
    .get(`https://supply-api.vercel.app/items/getRandomItem/`)
    .then((response) => {
      console.log(response.data);
      return response.data;
      // const item = new SingleItem(
      //   data.ItemImage,
      //   data.ItemId,
      //   data.ItemName,
      //   data.Description,
      //   data.Price,
      //   data.CurrentQuantity,
      //   data.MinimumQuantity
      // );

      // return item;
    })
    .catch((error) => {
      console.error(error);
    });
}
