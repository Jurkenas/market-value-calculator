import React from 'react';
import 'antd/dist/antd.css';
import { Alert, Layout as AntLayout } from 'antd';
import { BrowserHistory } from 'history';
import { useAppDispatch, useAppSelector } from '../../../commons/redux/store';
import * as styles from './Layout.module.scss';
import Menu, { MenuItem } from '../Menu/Menu';

interface LayoutProps {
  menuItems: MenuItem[];
  history: BrowserHistory;
  children?: React.ReactNode;
}

function Layout({ menuItems, children, history }: LayoutProps) {
  const { Header, Content, Footer } = AntLayout;

  const rootState = useAppSelector((state) => state);
  const dispatch = useAppDispatch();

  return (
    <AntLayout className={styles['layout']}>
      <Header>
        <Menu theme="dark" mode="horizontal" menuItems={menuItems} history={history} />
        {rootState.http.title || rootState.http.message ? (
          <Alert
            message={rootState.http.title}
            description={rootState.http.message}
            className={styles['alert']}
            type="error"
            showIcon
            closable
            onClose={() => dispatch({ type: 'clear-error' })}
          />
        ) : null}
      </Header>
      <Content className={styles['content']}>{children}</Content>
      <Footer style={{ textAlign: 'center' }}>Hakatonas ©2022</Footer>
    </AntLayout>
  );
}

export default Layout;
