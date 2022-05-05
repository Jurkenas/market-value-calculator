import React from 'react';
import { Typography, Row, Col } from 'antd';
import InputAutoComplete from '../../shared/Input/AutoComplete/AutoComplete';
import * as styles from './HomePage.module.scss';
import Button from '../../shared/Input/Button/Button';

const { Title } = Typography;

function HomePage() {
  return (
    <Row>
      <Col span={18} style={{ margin: 'auto' }}>
        <Title className={styles['title']} level={2} data-testid="home-page">
          Paskaičiuokite automobilio vertę
        </Title>
        <Row>
          <Title level={5}>Pagrindiniai automobilio duomenys </Title>
        </Row>
        <Row>
          <label htmlFor="model">Automobilio modelis: </label>
          <Col span={24}>
            <InputAutoComplete name="model" />
          </Col>
        </Row>
        <Row>
          <label htmlFor="brand">Automobilio markė: </label>
          <Col span={24}>
            <InputAutoComplete name="brand" />
          </Col>
        </Row>
        <Row>
          <Col
            span={24}
            style={{
              display: 'flex',
              justifyContent: 'center',
              margin: 'auto',
              marginTop: '5px',
            }}
          >
            <Button>Skaičiuoti</Button>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}
export default HomePage;
