import axios from "axios";
import { GetRandomItem } from "./ItemsHandler";

export class Order {
  constructor(OrderId, ItemName, PurchaseDate, Quantity, Status, TotalPrice) {
    this.OrderId = OrderId;
    this.ItemName = ItemName;
    this.PurchaseDate = PurchaseDate;
    this.Quantity = Quantity;
    this.Status = Status;
    this.TotalPrice = TotalPrice;
  }
}

class SingleOrder extends Order {
  constructor(
    OrderId,
    ItemName,
    PurchaseDate,
    Quantity,
    Status,
    TotalPrice,
    IsAddedToWarehouse
  ) {
    super(OrderId, ItemName, PurchaseDate, Quantity, Status, TotalPrice);
    this.IsAddedToWarehouse = IsAddedToWarehouse;
  }
}
export const StatusEnum = {
  PENDING: "Pending",
  INPROGRESS: "In Progress",
  COMPLETED: "Completed",
};

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
  // Get an array of enum values
  const enumValues = Object.values(StatusEnum);
  const randomIndex = Math.floor(Math.random() * enumValues.length);

  // create SingleOrder object with item ID and Name
  const order = new SingleOrder(
    -1,
    randomItem.ItemName,
    formattedDate,
    randomQuantity,
    enumValues[randomIndex],
    calcTotPrice
  );

  return axios
    .post(`http://localhost:3001/orders/vendor/add/`, order)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      console.error(error);
      return null;
    });
}

export function CreateNewVendorOrder(itemName, quantityToOrder, itemPrice) {
  const currentDate = new Date();

  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Month is zero-based, so we add 1 and pad with leading zero if necessary
  const day = String(currentDate.getDate()).padStart(2, "0"); // Pad day with leading zero if necessary

  const formattedDate = `${year}-${month}-${day}`;

  // create SingleOrder object with item ID and Name
  const order = new SingleOrder(
    -1,
    itemName,
    formattedDate,
    quantityToOrder,
    StatusEnum.PENDING,
    quantityToOrder * itemPrice,
    false
  );

  const thenFunction = () => {
    console.log(order);
  };

  return axios
    .post(`http://localhost:3001/orders/vendor/add/`, order)
    .then((res) => {
      thenFunction();
      return res.data;
    })
    .catch((error) => {
      console.error(error);
      return null;
    });
}

export function GetAllOrders() {
  return axios
    .get(`http://localhost:3001/orders/vendor/get/`)
    .then((response) => {
      const data = response.data.map((order) => {
        const item = new SingleOrder(
          order.OrderId,
          order.ItemName,
          order.PurchaseDate,
          order.Quantity,
          order.Status,
          order.TotalPrice,
          order.IsAddedToWarehouse
        );
        return item;
      });
      return data;
    })
    .catch((error) => {
      console.error(error);
    });
}


// StatusEnum - completed pending etc
export function GetWeeklyOrders() {
  return axios
    .get(`http://localhost:3001/orders/vendor/get/Completed`)
    .then((response) => {
      const data = response.data.map((order) => {
        const item = new SingleOrder(
          order.OrderId,
          order.ItemName,
          order.PurchaseDate,
          order.Quantity,
          order.Status,
          order.TotalPrice,
          order.IsAddedToWarehouse
        );
        return item;
      });
      return data;
    })
    .catch((error) => {
      console.error(error);
    });
}


// The function delete an order by ID
export function DeleteOrder(orderId) {
  return axios
    .delete(`http://localhost:3001/orders/vendor/delete/${orderId}`)
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
}

export function AutoChangeAllVendorOrdersStatus() {
  return axios
    .get(`http://localhost:3001/orders/vendor/update-orders/`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });
}

export function GetCompletedAndNotAddedOrders() {
  // Get all completed orders which not added to warehouse yet.
  return axios
    .get(`http://localhost:3001/orders/vendor/get-completed-orders/`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });
}

export function AddCompletedOrdersToWarehouse() {
  // Activate the addition to warehouse for all orders which status == completed
  return axios
    .get(`http://localhost:3001/orders/vendor/completed-orders-change/`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });
}
