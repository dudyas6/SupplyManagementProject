import React from "react";
import {
  StatisticsCubes,
  RefillTable,
  BarChart,
  StockChart,
  DonutChart,
  RectangleDataStats,
} from "./AllPageComponents";
import { Helmet } from "react-helmet";

export const DashboardPage = () => {

  return (
      <div>
        <Helmet>
          <title>FastTrack - Dashboard</title>
        </Helmet>
        {/* ... Header and other sections */}
        <main>
          <section>
            <RectangleDataStats />
          </section>
          {/* <section>
            <StatisticsCubes />
          </section> */}
          {/* <section>
            <RefillTable />
          </section> */}
          <section className="mt-20">
          <h1>Line chart</h1>

            <StockChart />
          </section>

          <section className="mt-20">
          <h1>Bar chart</h1>
            <BarChart />
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
