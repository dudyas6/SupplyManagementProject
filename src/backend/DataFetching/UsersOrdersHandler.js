import axios from "axios";
import { GetRandomItem } from "./ItemsHandler";
import { Order,StatusEnum } from "./VendorOrdersHandler";


/// Create random order from vendor - can be deleted later
export async function GenerateNewOrder() {
  /// Generate random order into DB
  // apply today as PurchaseDate

  const currentDate = new Date();

  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Month is zero-based, so we add 1 and pad with leading zero if necessary
  const day = String(currentDate.getDate()).padStart(2, "0"); // Pad day with leading zero if necessary

  const formattedDate = `${year}-${month}-${day}`;

  // Get random item
  var randomItem = await GetRandomItem();
  if (randomItem === null || randomItem === undefined)
    randomItem = "Random order";
  // Get Random quantity...
  const max = 100.0;
  const min = 2.2;
  const randomQuantity = Math.ceil(Math.random() * (max / 2 - min) + min);
  const randomPPQ = Math.random() * (max - min) + min; // Price Per Quantity
  const calcTotPrice = (randomQuantity * randomPPQ).toFixed(2);

  // create SingleOrder object with item ID and Name
  const order = new Order(
    -1,
    randomItem.ItemName,
    formattedDate,
    randomQuantity,
    StatusEnum.COMPLETED,
    calcTotPrice
  );

  return axios
    .post(`https://supply-management-api.vercel.app/orders/users/add/`, order)
    .then(async (res) => {
      return res.data;
    })
    .catch((error) => {
      console.error(error);
      return null;
    });
}
export function GetOrderOfAllUsers() {
  return axios
    .get(`https://supply-management-api.vercel.app/orders/users/get/`)
    .then((response) => {
      const data = response.data.map((order) => {
        const item = new Order(
          order.OrderId,
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

// // The function delete an order by ID
// export function DeleteOrder(orderId) {
//   return axios
//     .delete(`https://supply-management-api.vercel.app/orders/vendor/delete/${orderId}`)
//     .then((res) => {
//       console.log(res.data);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// }

