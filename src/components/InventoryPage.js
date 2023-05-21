import React from "react";
import Table from "../Table";
import { StatisticsCubes } from "./Dashboard/AllPageComponents";
import { Card } from "../common/Elements";

export function InventoryPage() {
  return (
    <>
      <Card title="Relevant issues">
        <StatisticsCubes /> {/* Change this later to relevant issues !!! */}
      </Card>

      <Card title="All inventory items">
        <Table />
      </Card>
    </>
  );
}
