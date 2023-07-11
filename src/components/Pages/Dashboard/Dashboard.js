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
import { DarkModeContext } from "../../../App";
import { useContext } from "react";

export const DashboardPage = () => {
  const darkMode = useContext(DarkModeContext);
  const donutChartData = {
    options: {
      labels: ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5'],
      colors: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
      legend: {
        position: 'bottom', // Set the legend position to bottom
        offsetY: 5, // Adjust the vertical offset of the legend from the bottom
        itemMargin: {
          horizontal: 5, // Adjust the horizontal spacing between legend items
        },
      },
    },
    series: [10, 20, 15, 5, 30], // Replace these values with your actual data
  };

  return (
    <div className={darkMode ? "dark-mode" : ""}>
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
