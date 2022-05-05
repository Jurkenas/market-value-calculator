import React from 'react';
import { Table } from 'antd';
import { Column, Vehicle } from '../../Pages/CalculatedValuePageDetailsTable/CalculatedValuePageDetailsTable';

interface DetailsTableProps {
  columns: Column[];
  data: Vehicle[];
}

function DetailsTable({ columns, data }: DetailsTableProps) {
  return <Table columns={columns} dataSource={data} pagination={false} />;
}
export default DetailsTable;
