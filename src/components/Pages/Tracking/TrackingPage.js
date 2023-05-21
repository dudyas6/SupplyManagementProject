import React from "react";
import { StatisticsCubes } from "../Dashboard/AllPageComponents";
import { Card } from "../../../common/Elements";
import VendorOrderTable from '../Tracking/VendorOrderTable'

export function TrackingPage() {
  return (
    <>
      <Card title="Relevant issues">
        <StatisticsCubes /> {/* Change this later to relevant issues !!! */}
      </Card>

      <Card title="Orders from vendor">
        <VendorOrderTable />
      </Card>

      <Card title="Orders from user - changeeeeeeeeeeeee content">
        <VendorOrderTable />
      </Card>


    </>
  );
}
