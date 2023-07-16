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
import { Card } from "../../../common/Elements";
import { CountItemsUnderMin, CountZeroQuantity, GetTop5BestSelling } from "../../../backend/DataFetching/ItemsHandler";

export function DashboardPage() {
  const [current_previous_percentagePending, setCurrentPreviousPercentagePending] = useState([0]*3);
  const [current_previous_percentageCompleted, setCurrentPreviousPercentageCompleted] = useState([0]*3);
  const [cntItemsUnderMin, setCntItemsUnderMin] = useState(0);
  const [cntItemsZeroQuantity, setCntItemsZeroQuantity] = useState(0);
  const [topItems, setTopItems] = useState(null);

  //top5BestSellingItems
  React.useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const responsePending = await GetWeeklyOrders("Pending"); 
      setCurrentPreviousPercentagePending(responsePending);

      const responseCompleted = await GetWeeklyOrders("Completed"); 
      setCurrentPreviousPercentageCompleted(responseCompleted);

      const responseUnderMin = await CountItemsUnderMin(); 
      setCntItemsUnderMin(responseUnderMin);

      const responseZeroQuantity = await CountZeroQuantity(); 
      setCntItemsZeroQuantity(responseZeroQuantity);

      const { topItemsLabels, topItemsValues } = await GetTop5BestSelling(); 
      setTopItems({ topItemsLabels, topItemsValues });

    } catch (error) {
      console.log(error);
    }
  }

  React.useEffect(()=>{
    console.log(topItems);
  }, [topItems])
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
          bigNumber={current_previous_percentagePending[0]}
          changePercentage={current_previous_percentagePending[2]}
          icon={"pendingOrders"}
        />

<OneRectangleDataStats
        title={"Completed Orders"}
          description={ "This Week"}
          bigNumber={current_previous_percentageCompleted[0]}
          changePercentage={current_previous_percentageCompleted[2]}
          icon={"completedOrders"}
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
          <Card>
          <section className="mt-20">
          <h1>Line chart</h1>
            <StockChart expenses={[1000, 1200, 800, 1500, 2000, 1800]} revenues={[800, 900, 700, 1100, 1500, 1300]} months={["January", "February", "March", "April", "May", "June"]} />
          </section>
          </Card>

          <Card>
            <div className="flex flex-wrap">
              <div className="w-1/2">
                    <h1>Top 5 Best-Selling Items</h1>
                    {topItems && (              
                      <DonutChart topItemsLabels={topItems.topItemsLabels} topItemsValues={topItems.topItemsValues}/>
                    )}
                </div>
                <div className="w-1/2 h-full">
                    <h1>Bar chart</h1>
                    <BarChart underMin={cntItemsUnderMin} equalZero={cntItemsZeroQuantity}/>
                </div>
              
            </div>
          </Card>

        </main>

      </div>
  );
};
