import React from "react";
import { StatisticsCubes, RefillTable, StockGraph } from "./AllPageComponents";
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
          <StatisticsCubes />
        </section>
        <section>
          <RefillTable />
        </section>
        <section>
          <StockGraph />
        </section>
      </main>
      {/* ... Footer and other sections */}
    </div>
  );
};
