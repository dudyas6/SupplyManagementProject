import React from "react";
import { StatisticsCubes, RefillTable, StockGraph } from "./AllPageComponents";
export const DashboardPage = () => {
    return (
      <div>
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
  
  