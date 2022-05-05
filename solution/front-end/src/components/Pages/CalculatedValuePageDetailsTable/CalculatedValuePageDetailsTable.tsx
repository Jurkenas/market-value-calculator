import React from 'react';
import { Col, Row, Typography } from 'antd';
import DetailsTable from '../../shared/Table/Table';
import * as styles from './CalculatedValuePageDetailsTable.module.scss';

const { Title } = Typography;
const columns = [
  {
    title: 'Apibūdinimas',
    dataIndex: 'apibūdinimas',
    key: 'apibūdinimas',
  },
  {
    title: 'Kaina',
    dataIndex: 'kaina',
    key: 'kaina',
  },
  {
    title: 'URL',
    dataIndex: 'url',
    key: 'url',
  },
];

const data = [
  {
    apibūdinimas: 'Audi A100, kažkas, kažkas',
    kaina: 10000,
    url: 'kažkoks linkas',
  },
  {
    apibūdinimas: 'Audi A100, kažkas, kažkas',
    kaina: 10000,
    url: 'kažkoks linkas',
  },
  {
    apibūdinimas: 'Audi A100, kažkas, kažkas',
    kaina: 10000,
    url: 'kažkoks linkas',
  },
  {
    apibūdinimas: 'Audi A100, kažkas, kažkas',
    kaina: 10000,
    url: 'kažkoks linkas',
  },
  {
    apibūdinimas: 'Audi A100, kažkas, kažkas',
    kaina: 10000,
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
