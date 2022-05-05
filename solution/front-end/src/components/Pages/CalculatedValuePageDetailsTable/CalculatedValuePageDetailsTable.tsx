import React from 'react';
import { Col, Row, Typography } from 'antd';
import DetailsTable from '../../shared/Table/Table';
import * as styles from './CalculatedValuePageDetailsTable.module.scss';

const { Title } = Typography;
const columns = [
  {
    title: 'Modelis',
    dataIndex: 'modelis',
    key: 'modelis',
  },
  {
    title: 'Kaina',
    dataIndex: 'kaina',
    key: 'kaina',
  },
  {
    title: 'kW',
    dataIndex: 'kW',
    key: 'kW',
  },
  {
    title: 'Variklio tipas',
    dataIndex: 'variklis',
    key: 'variklis',
  },
  {
    title: 'Kilometražas',
    dataIndex: 'kilometražas',
    key: 'kilometražas',
  },
];

const data = [
  {
    modelis: 'Audi A100',
    kaina: 10000,
    kW: 32,
    variklis: 1.8,
    kilometražas: '123k',
  },
  {
    modelis: 'Audi A100',
    kaina: 10000,
    kW: 32,
    variklis: 1.8,
    kilometražas: '123k',
  },
  {
    modelis: 'Audi A100',
    kaina: 10000,
    kW: 32,
    variklis: 1.8,
    kilometražas: '123k',
  },
  {
    modelis: 'Audi A100',
    kaina: 10000,
    kW: 32,
    variklis: 1.8,
    kilometražas: '123k',
  },
  {
    modelis: 'Audi A100',
    kaina: 10000,
    kW: 32,
    variklis: 1.8,
    kilometražas: '123k',
  },
];

function CalculatedValuePageDetailsTable() {
  return (
    <Row>
      <Col span={14} style={{ margin: 'auto', backgroundColor: 'white', marginTop: 10 }}>
        <Title className={styles['title']} level={3} data-testid="home-page">
          Detali informacija
        </Title>
        <DetailsTable columns={columns} data={data} />
      </Col>
    </Row>
  );
}
export default CalculatedValuePageDetailsTable;
