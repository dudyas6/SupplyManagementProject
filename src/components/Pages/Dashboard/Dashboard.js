import React from "react";
import { useState } from "react";
import {
  StatisticsCubes,
  RefillTable,
  BarChart,
  StockChart,
  DonutChart,
  OneRectangleDataStats,
  RectangleDataStats,
} from "./AllPageComponents";
import { Helmet } from "react-helmet";
import { DataStatClass } from "./DataStatClass";
import { GetAllOrders, GetWeeklyOrders, StatusEnum } from "../../../backend/DataFetching/VendorOrdersHandler";


export function DashboardPage() {

  const [pendingOrders, setPendingOrders] = React.useState([]);
  const [completedOrders, setCompletedOrders] = React.useState([]);

  async function fetchData() {
    try {
      console.log("AAAAAA");

      const orders = await GetAllOrders();
      setCompletedOrders(orders);
      console.log(completedOrders);
    } catch (error) {
      console.log(error);
    }
  }

  React.useEffect(() => {
    fetchData();
  }, []);

  return (
      <div>
        <Helmet>
          <title>FastTrack - Dashboard</title>
        </Helmet>
        <main>
          <section className="flex flex-wrap justify-center gap-20"> 
          

          <OneRectangleDataStats
        title={"Pending Orders"}
          description={ "This Week"}
          bigNumber={"100"}
          changePercentage={"10"}
          icon={"completedOrders"}
        />

<OneRectangleDataStats
        title={"Completed Orders"}
          description={ "This Week"}
          bigNumber={"100"}
          changePercentage={"10"}
          icon={"pendingOrders"}
        />

<OneRectangleDataStats
        title={"Some title"}
          description={ "This Week"}
          bigNumber={"200"}
          changePercentage={"10"}
          icon={"pendingOrders"}
        />

<OneRectangleDataStats
        title={"Some title"}
          description={ "This Week"}
          bigNumber={"1020"}
          changePercentage={"-10"}
          icon={"pendingOrders"}
        />
          </section>
          {/* <section>
            <RefillTable />
          </section> */}
          <section className="mt-20">
          <h1>Line chart</h1>
            <StockChart expenses={[1000, 1200, 800, 1500, 2000, 1800]} revenues={[800, 900, 700, 1100, 1500, 1300]} months={["January", "February", "March", "April", "May", "June"]} />
          </section>

          <section className="mt-20">
          <h1>Bar chart</h1>
            <BarChart underMin={20} equalZero={12}/>
          </section>

          <section className="mt-20">
            <h1>Top 5 Best-Selling Items</h1>
            <DonutChart topItemsLabels={['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5']} topItemsValues={[10, 20, 15, 5, 30]}/>
          </section>
        </main>
        {/* ... Footer and other sections */}
      </div>
  );
};
