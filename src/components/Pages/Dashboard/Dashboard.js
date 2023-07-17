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
import { GetAvgRevenuesExpenses, GetAllStatisticsData } from "../../../backend/DataFetching/StatisticsHandler";
const moment = require('moment');

export function DashboardPage() {
  const [current_previous_percentagePending, setCurrentPreviousPercentagePending] = useState([0]*3);
  const [current_previous_percentageCompleted, setCurrentPreviousPercentageCompleted] = useState([0]*3);
  const [cntItemsUnderMin, setCntItemsUnderMin] = useState(0);
  const [cntItemsZeroQuantity, setCntItemsZeroQuantity] = useState(0);
  const [graphRevExp, setGraphRevExp] = useState(null);
  const [topItems, setTopItems] = useState(null);
  const [avgRevExp, setAvgRevExp] = useState(null);
  
  
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

      const { avgRevenue, avgExpenses } = await GetAvgRevenuesExpenses(); 
      setAvgRevExp({ avgRevenue, avgExpenses });
      
      const { revenues, expenses } = await GetAllStatisticsData(); 
      setGraphRevExp({revenues, expenses});

    } catch (error) {
      console.log(error);
    }
  }

  function getMonthNames() {
    const monthNames = [];
    const currentDate = moment();
    currentDate.subtract(6, 'month');
    
    for (let i = 6; i >= 0; i--) {
      monthNames.push(currentDate.format('MMMM'));
      currentDate.add(1, 'month');
    }
  
    return monthNames;
  }
  
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
        title={"Average Revenues"}
          description={ "This Month"}
          bigNumber={avgRevExp ? avgRevExp.avgRevenue.toFixed() : 0}
          changePercentage={null}
          icon={"trendingUp"}
        />

<OneRectangleDataStats
        title={"Average Expanses"}
          description={ "This Month"}
          bigNumber={avgRevExp ? avgRevExp.avgExpenses.toFixed(): 0} 
          changePercentage={null}
          icon={"trendingDown"}
        />
          </section>
          {/* <section>
            <RefillTable />
          </section> */}
          <Card>
          <section className="mt-20">
          <h1>Revenues-Expenses 6 months</h1>
          {
            graphRevExp && (            
            <StockChart expenses={graphRevExp.expenses} revenues={graphRevExp.revenues} months={getMonthNames()} />
            )
          }
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
                    <h1>Items statistics</h1>
                    <BarChart underMin={cntItemsUnderMin} equalZero={cntItemsZeroQuantity}/>
                </div>
              
            </div>
          </Card>

        </main>

      </div>
  );
};
