import React from "react";
import { StatisticsCubes, RefillTable, StockChart,RectangleDataStats} from "./AllPageComponents";
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
            <RectangleDataStats/>
          </section>
          {/* <section>
            <StatisticsCubes />
          </section> */}
          {/* <section>
            <RefillTable />
          </section> */}
          <section>
            <StockChart />
          </section>
        </main>
        {/* ... Footer and other sections */}
      </div>
    </div>
  );
};
