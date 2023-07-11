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

import { useContext } from "react";

export const DashboardPage = () => {
  return (
    <div>
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
            <DonutChart options={donutChartData.options} series={donutChartData.series}/>
          </section>
        </main>
        {/* ... Footer and other sections */}
      </div>
    </div>
  );
};
