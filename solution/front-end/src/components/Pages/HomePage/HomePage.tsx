import React from 'react';
import { Typography } from 'antd';
import * as styles from './HomePage.module.scss';

const { Title } = Typography;

function HomePage() {
  return (
    <Title className={styles['title']} level={2} data-testid="home-page">
      Paskaičiuokite automobilio vertę
    </Title>
  );
}
export default HomePage;
