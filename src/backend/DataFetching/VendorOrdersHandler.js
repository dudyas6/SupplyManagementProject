import axios from "axios";
class SingleOrder {
  constructor(OrderId, ItemName, PurchaseDate, Quantity, Status, TotalPrice) {
    this.OrderId = OrderId;
    this.ItemName = ItemName;
    this.PurchaseDate = PurchaseDate;
    this.Quantity = Quantity;
    this.Status = Status;
    this.TotalPrice = TotalPrice;
  }
}
export const StatusEnum = {
  PENDING: "Pending",
  INPROGRESS: "In Progress",
  COMPLETED: "Completed",
};

/// Create random order from vendor - can be deleted later
export function GenerateNewOrder() {
  /// Generate random order into DB
  // apply today as PurchaseDate

  const currentDate = new Date();

  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Month is zero-based, so we add 1 and pad with leading zero if necessary
  const day = String(currentDate.getDate()).padStart(2, "0"); // Pad day with leading zero if necessary

  const formattedDate = `${year}-${month}-${day}`;

  // Get random item

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
    "Random Order",
    formattedDate,
    randomQuantity,
    enumValues[randomIndex],
    calcTotPrice,
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

export function CreateNewVendorOrder( itemName, quantityToOrder, itemPrice){

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
    quantityToOrder*itemPrice,
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

// The function delete an order by ID
export function DeleteOrder(orderId, thenFunc) {
  return axios
    .delete(`http://localhost:3001/orders/vendor/delete/${orderId}`)
    .then((res) => {
      thenFunc();
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });
}
