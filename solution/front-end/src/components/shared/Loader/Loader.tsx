import React from 'react';
import { Spin } from 'antd';
import * as styles from './Loader.module.scss';

interface LoaderProps {
  isLoading: boolean;
  inline?: boolean;
  tip?: string;
}

function Loader({ isLoading, inline = false, tip = 'Loading...' }: LoaderProps) {
  function isInline() {
    if (inline) {
      return styles['spinner__inline'];
    }
    return styles['spinner'];
  }

  return isLoading ? (
    <div className={isInline()} data-testid="loader">
      <Spin size="large" tip={tip} />
    </div>
  ) : null;
}

export default Loader;
