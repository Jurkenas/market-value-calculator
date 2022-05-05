import React from 'react';
import { Table } from 'antd';

function DetailsTable({ columns, data }) {
  return <Table columns={columns} dataSource={data} pagination={false} />;
}
export default DetailsTable;
