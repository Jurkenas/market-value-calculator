import React from 'react';
import { Typography, Row, Col, Divider } from 'antd';
import * as styles from './CalculatedValuePage.module.scss';

const { Title } = Typography;

function CalculatedValuePage() {
  return (
    <Row>
      <Col span={14} style={{ margin: 'auto', backgroundColor: 'white', padding: 20 }}>
        <Title className={styles['title']} level={3} data-testid="home-page">
          Paskaičiuota automobilio vertė
        </Title>
        <Divider />
        <Title level={5}>Automobilio modelis: </Title>
        <Title level={5}>Automobilio markė: </Title>
        <Title level={5}>Pagaminimo data: </Title>
        <Title level={5}>Kuro tipas: </Title>
        <Title level={5}>Kėbulo tipas: </Title>
        <Title level={5}>Pavarų dėžė: </Title>
        <Divider />
        <Row
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Row
            style={{
              width: '30%',
              display: 'flex',
              justifyContent: 'right',
            }}
          >
            <Title level={5} style={{ margin: 0 }}>
              Vertė: 10 000 EUR (su PVM)
            </Title>
            <Title level={5} style={{ margin: 0, marginTop: '2px' }}>
              8625 EUR (be PVM)
            </Title>
          </Row>
        </Row>
      </Col>
    </Row>
  );
}
export default CalculatedValuePage;
