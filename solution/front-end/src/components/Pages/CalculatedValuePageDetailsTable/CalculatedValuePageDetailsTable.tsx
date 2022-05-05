import React from 'react';
import { Col, Row, Typography } from 'antd';
import DetailsTable from '../../shared/Table/Table';
import * as styles from './CalculatedValuePageDetailsTable.module.scss';

export type Column = {
  title: string;
  dataIndex: string;
  key: string;
};

export type Vehicle = {
  description: string;
  price: number;
  url: string;
};

const { Title } = Typography;

const columns: Column[] = [
  {
    title: 'Apibūdinimas',
    dataIndex: 'description',
    key: 'description',
  },
  {
    title: 'Kaina',
    dataIndex: 'price',
    key: 'price',
  },
  {
    title: 'URL',
    dataIndex: 'url',
    key: 'url',
  },
];

const data: Vehicle[] = [
  {
    description: 'Audi A100, kažkas, kažkas',
    price: 10000,
    url: 'kažkoks linkas',
  },
  {
    description: 'Audi A100, kažkas, kažkas',
    price: 10000,
    url: 'kažkoks linkas',
  },
  {
    description: 'Audi A100, kažkas, kažkas',
    price: 10000,
    url: 'kažkoks linkas',
  },
  {
    description: 'Audi A100, kažkas, kažkas',
    price: 10000,
    url: 'kažkoks linkas',
  },
  {
    description: 'Audi A100, kažkas, kažkas',
    price: 10000,
    url: 'kažkoks linkas',
  },
];

function CalculatedValuePageDetailsTable() {
  return (
    <Row>
      <Col span={14} className={styles['col']}>
        <Title
          className={styles['title']}
          level={3}
          data-testid="caltulated-value-details-table-page"
        >
          Detali informacija
        </Title>
        <DetailsTable columns={columns} data={data} />
      </Col>
    </Row>
  );
}
export default CalculatedValuePageDetailsTable;
