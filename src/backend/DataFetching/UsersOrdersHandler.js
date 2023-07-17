import axios from "axios";
import { Order } from "./VendorOrdersHandler";


/// Create random order from vendor - can be deleted later
export async function GenerateNewOrder() {

  return axios
  .get(`http://localhost:3001/items/createRandomItem`)
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
    .get(`http://localhost:3001/orders/users/get/`)
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
//     .delete(`http://localhost:3001/orders/vendor/delete/${orderId}`)
//     .then((res) => {
//       console.log(res.data);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// }

