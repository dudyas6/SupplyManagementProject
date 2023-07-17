const router = require("express").Router();
const statistics = require("../models/statistic.model.js");
const vendor_order = require("../models/vendor_order.model.js");
const users_orders = require("../models/users_order.model.js");
const moment = require("moment");

function AddItemToDB(statisticToAdd) {
  console.log("Adding Statistic to DB");
  console.log(statisticToAdd);
  return statistics
    .findOne({}, {}, { sort: { ItemId: -1 } }) // Find the last item by sorting in descending order of ItemId
    .then(async (lastItem) => {
      const addedStatisticsItem = new statistics({
        Id: lastItem ? lastItem.Id + 1 : 0,
        Revenue: statisticToAdd.Revenue,
        Expense: statisticToAdd.Expense,
        Date: statisticToAdd.Date,
      });
      await addedStatisticsItem.save();
    });
}

function GetDataFromDB(req, res) {
  const finalResult = {
    revenues: [],
    expenses: [],
  };
  const today = moment().format("YYYY-MM");
  const promises = [];

  for (let i = 0; i <= 6; i++) {
    const date = moment(today).subtract(i, "month").format("YYYY-MM");
    const promise = statistics
      .find({ Date: date })
      .then(async (result) => {
        if (result.length === 0) {
          const statisticToAdd = await createNewStatistic(date);
          await AddItemToDB(statisticToAdd);
          return {
            date,
            revenue: statisticToAdd.Revenue,
            expense: statisticToAdd.Expense,
          };
        } else {
          return {
            date,
            revenue: result[0].Revenue,
            expense: result[0].Expense,
          };
        }
      })
      .catch((error) => {
        console.log(error);
        return null;
      });

    promises.push(promise);
  }

  Promise.allSettled(promises)
    .then((results) => {
      results.forEach((result) => {
        if (result.status === "fulfilled") {
          finalResult.revenues.push(result.value.revenue);
          finalResult.expenses.push(result.value.expense);
        }
      });
      finalResult.revenues.reverse();
      finalResult.expenses.reverse();
      res.json(finalResult);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send("An error occurred");
    });
}

const createNewStatistic = async (date) => {
  try {
    const monthlyExpenseRes = await GetMonthlyOrders(date, "vendor");
    const monthlyRevenueRes = await GetMonthlyOrders(date, "user");

    const totalExpenses = monthlyExpenseRes.reduce((sum, order) => {
      if (order.TotalPrice !== null) {
        return sum + order.TotalPrice;
      }
      return sum;
    }, 0);
    const totalRevenues = monthlyRevenueRes.reduce((sum, order) => {
      if (order.TotalPrice !== null) {
        return sum + order.TotalPrice;
      }
      return sum;
    }, 0);

    const statisticsToAdd = new statistics({
      Id: -1,
      Revenue: totalRevenues,
      Expense: totalExpenses,
      Date: date,
    });
    return statisticsToAdd;
  } catch (error) {
    console.error("Error creating new statistic:", error);
  }
};

function GetMonthlyOrders(date, type) {
  try {
    const startOfMonth = moment(date).startOf("month").format("YYYY-MM-DD");
    const endOfMonth = moment(date).endOf("month").format("YYYY-MM-DD");
    if (type === "vendor") {
      return vendor_order
        .find({
          PurchaseDate: { $gte: startOfMonth, $lte: endOfMonth },
        })
        .then((result) => {
          return result;
        });
    } else {
      return users_orders
        .find({
          PurchaseDate: { $gte: startOfMonth, $lte: endOfMonth },
        })
        .then((result) => {
          return result;
        });
    }
  } catch (error) {
    console.error("Error fetching orders:", error);
  }
}

function GetAvgRE(req, res){
  const today = moment();
  const startOfMonth = today.clone().startOf('month').format('YYYY-MM-DD');
  const endOfMonth = today.clone().endOf('month').format('YYYY-MM-DD');

  // Calculate average revenue
  users_orders.aggregate([
    {
      $match: {
        PurchaseDate: { $gte: startOfMonth, $lte: endOfMonth },
        Status: "Completed"
      }
    },
    {
      $group: {
        _id: null,
        avgRevenue: { $avg: "$TotalPrice" }
      }
    }
  ])
    .then((revenueResult) => {
      const avgRevenue = revenueResult.length > 0 ? revenueResult[0].avgRevenue : 0;

      vendor_order.aggregate([
        {
          $match: {
            PurchaseDate: { $gte: startOfMonth, $lte: endOfMonth },
          }
        },
        {
          $group: {
            _id: null,
            avgExpenses: { $avg: "$TotalPrice" }
          }
        }
      ])
        .then((expensesResult) => {
          const avgExpenses = expensesResult.length > 0 ? expensesResult[0].avgExpenses : 0;
          res.json({ avgRevenue, avgExpenses });
        })
        .catch((err) => {
          console.error("Error calculating average expenses:", err);
          res.status(400).json("Error calculating average expenses.");
        });
    })
    .catch((err) => {
      console.error("Error calculating average revenue:", err);
      res.status(400).json("Error calculating average revenue.");
    });
}

router.route("/get").get((req, res) => {
  GetDataFromDB(req, res);
});

router.route("/avgRE").get((req, res) => {
  GetAvgRE(req, res);
});

router.route("/add").post((req, res) => {
  AddItemToDB(req, res);
});

router.route("/delete/:id").delete((req, res) => {
  statistics
    .findOneAndDelete({})
    .then((item) => res.json(item))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
