import React from 'react';
import { Typography, Row, Col, Divider } from 'antd';
import { Link } from 'react-router-dom';
import InputAutoComplete from '../../shared/Input/AutoComplete/AutoComplete';
import * as styles from './HomePage.module.scss';
import Button from '../../shared/Input/Button/Button';

const { Title } = Typography;

function HomePage() {
  return (
    <Row>
      <Col className={styles['col2']} span={14}>
        <Title className={styles['title']} level={3} data-testid="home-page">
          Paskaičiuokite automobilio vertę
        </Title>
        <Divider />
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
          <Col span={24} className={styles['col']}>
            <Link to="/paskaiciuotaverte">
              <Button>Skaičiuoti</Button>
            </Link>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}
export default HomePage;
