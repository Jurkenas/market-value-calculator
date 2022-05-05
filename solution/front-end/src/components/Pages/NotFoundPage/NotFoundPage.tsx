import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../shared/Input/Button/Button';
import * as styles from './NotFoundPage.module.scss';

function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className={styles['container']} data-testid="not-found-page">
      <span className={styles['logo']}>🫣</span>
      <h1>Sorry!</h1>
      <h2>Sorry, we couldn&apos;t find the page You were looking for</h2>
      <Button type="primary" className={styles['return']} onClick={() => navigate(-1)}>
        Go back
      </Button>
    </div>
  );
}

export default NotFoundPage;
