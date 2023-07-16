import React from "react";
import Chart from "react-apexcharts";

export const StatisticsCubes = () => {
  return (
    <div className="flex flex-wrap justify-center">
      <div className="w-40 h-40 m-4 bg-blue-500 rounded-md shadow-md hover:bg-blue-600">
        <div className="flex flex-col items-center justify-center h-full">
          <span className="text-3xl font-bold text-white">$199.4</span>
          <span className="text-base text-gray-200">Total Cost</span>
        </div>
      </div>

      <div className="w-40 h-40 m-4 bg-green-500 rounded-md shadow-md hover:bg-green-600">
        <div className="flex flex-col items-center justify-center h-full">
          <span className="text-3xl font-bold text-white">256</span>
          <span className="text-base text-gray-200">Items in Stock</span>
        </div>
      </div>

      <div className="w-40 h-40 m-4 bg-yellow-500 rounded-md shadow-md hover:bg-yellow-600">
        <div className="flex flex-col items-center justify-center h-full">
          <span className="text-3xl font-bold text-white">36</span>
          <span className="text-base text-gray-200">Pending Orders</span>
        </div>
      </div>

      <div className="w-40 h-40 m-4 bg-red-500 rounded-md shadow-md hover:bg-red-600">
        <div className="flex flex-col items-center justify-center h-full">
          <span className="text-3xl font-bold text-white">18</span>
          <span className="text-base text-gray-200">Completed Orders</span>
        </div>
      </div>
    </div>
  );
};

export const RefillTable = () => {
  return (
    <table className="table text-grey-darkest">
      <thead className="text-white bg-grey-dark text-normal">
        <tr>
          <th scope="col">#</th>
          <th scope="col">Item</th>
          <th scope="col">Last Stock</th>
          <th scope="col">Current Stock</th>
          <th scope="col">Change</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">1</th>
          <td>Product A</td>
          <td>100</td>
          <td>85</td>
          <td>
            <span className="text-red-500">
              <i className="fas fa-arrow-down"></i>15%
            </span>
          </td>
        </tr>
        <tr>
          <th scope="row">2</th>
          <td>Product B</td>
          <td>250</td>
          <td>300</td>
          <td>
            <span className="text-green-500">
              <i className="fas fa-arrow-up"></i>20%
            </span>
          </td>
        </tr>
        <tr>
          <th scope="row">3</th>
          <td>Product C</td>
          <td>50</td>
          <td>40</td>
          <td>
            <span className="text-red-500">
              <i className="fas fa-arrow-down"></i>10%
            </span>
          </td>
        </tr>
        <tr>
          <th scope="row">4</th>
          <td>Product D</td>
          <td>120</td>
          <td>130</td>
          <td>
            <span className="text-green-500">
              <i className="fas fa-arrow-up"></i>8%
            </span>
          </td>
        </tr>
        <tr>
          <th scope="row">5</th>
          <td>Product E</td>
          <td>80</td>
          <td>75</td>
          <td>
            <span className="text-red-500">
              <i className="fas fa-arrow-down"></i>6%
            </span>
          </td>
        </tr>
      </tbody>
    </table>
  );
};


export function OneRectangleDataStats({ title, description, bigNumber, changePercentage, icon}) {
  changePercentage = parseInt(changePercentage);
  const isPositiveChange = changePercentage > 0;

  return (
    <div className="flex items-center rounded-lg shadow-lg bg-white p-4">
      {/* Order icon */}
      <div className="flex items-center justify-center bg-purple-500 rounded-full w-12 h-12">
        {icon === "pendingOrders" && (
          <svg className="w-6 h-6 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
          <path stroke="currentColor" stroke-linejoin="round" stroke-width="2" d="M10 6v4l3.276 3.276M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
        </svg>
        )}
        {icon === "completedOrders" && (
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
          )}
      </div>
      {/* Content */}
      <div className="ml-4">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-sm text-gray-500">{description}</p>
        <div className="flex items-center mt-2">
          <span className="text-4xl font-bold">{bigNumber}</span>
          <div className="flex items-center ml-2">
            {changePercentage === 0 ? (
              <span className="text-black text-sm font-semibold ml-1">{changePercentage}%</span>
            ) : (
              <>
                {isPositiveChange ? (
                  <>
                    <span className="text-green-500 text-sm font-semibold ml-1">{changePercentage}%</span>
                    <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                    </svg>
                  </>
                ) : (
                  <>
                    <span className="text-red-500 text-sm font-semibold ml-1">{changePercentage}%</span>
                    <svg className="w-4 h-4 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                  </>
                )}
              </>
            )}
          </div>
        </div>
        <div className="h-2 bg-gray-200 rounded-full mt-2">
          <div className="h-full bg-purple-500 rounded-full" style={{ width: '70%' }}></div>
        </div>
      </div>
    </div>
  );
}

export function RectangleDataStats({ dataStatsArr }) {
  console.log(dataStatsArr)
  return (
    <div className="flex flex-wrap justify-center gap-20">
      {dataStatsArr.map((dataStat, index) => (
        <OneRectangleDataStats
          key={index}
          title={dataStat.title}
          description={dataStat.description}
          bigNumber={dataStat.bigNumber}
          changePercentage={dataStat.changePercentage}
          icon={dataStat.icon}
        />
      ))}
    </div>
  );
}





export function StockChart({revenues, expenses, months}){
  const chartData = {
    series: [
      {
        name: "Revenues",
        data: revenues,//[1000, 1200, 800, 1500, 2000, 1800],
        color: "#47bf81", // green
  
      },
      {
        name: "Expenses",
        data: expenses, //[800, 900, 700, 1100, 1500, 1300],
        color: "#e84a6a", // light-red
      },
    ],
    options: {
      chart: {
        id: "stock-chart",
      },
      xaxis: {
        categories: months,//["January", "February", "March", "April", "May", "June"],
      },
      yaxis: [
        {
          title: {
            text: "Revenues",
          },
        },
        {
          opposite: true,
          title: {
            text: "Expenses",
          },
        },
      ],
      stroke: {
        curve: "smooth",
      },
    },
  };
  return (
    <Chart
      options={chartData.options}
      series={chartData.series}
      type="line"
      height={400}
    />
  );
};
/////////////////////



export const BarChart = ({underMin, equalZero}) => {
  
const barChartData = {
  series: [
    {
      name: "Items with 0 Quantity",
      data: [0, equalZero], 
    },
    {
      name: "Items under Min Quantity",
      data: [underMin,0], 
    }
  ],
  options: {
    chart: {
      type: "bar",
      height: 400,
    },
    plotOptions: {
      bar: {
        horizontal: false, 
        columnWidth: "55%",
        endingShape: "rounded",
      },
    },
    dataLabels: {
      enabled: true,
    },
    xaxis: {
      categories: ["Items under Min Quantity", "Items with 0 Quantity"],
      
    },
    yaxis: {
      title: {
        text: "Quantity",
      },
    },
    colors: ["#ff0000", "#ffa500"], 

  },
};
  return (
    <Chart
      options={barChartData.options}
      series={barChartData.series}
      type="bar"
    />
  );
};


//////////////////////


export const DonutChart = ({topItemsLabels, topItemsValues}) => {
  const donutChartData = {
    options: {
      labels: topItemsLabels,
      colors: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
      legend: {
        position: 'bottom', // Set the legend position to bottom
        offsetY: 5, // Adjust the vertical offset of the legend from the bottom
        itemMargin: {
          horizontal: 5, // Adjust the horizontal spacing between legend items
        },
      },
    },
    series: topItemsValues, // Replace these values with your actual data
  };
  return (
      <Chart
        options={donutChartData.options}
        series={donutChartData.series}
        type="donut"
        height={500}
      />
  );
};