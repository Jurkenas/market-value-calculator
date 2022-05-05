import React, { useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';
import { BigNumber } from 'bignumber.js';
import { Modal, Table } from 'antd';
import { useAppDispatch, useAppSelector } from '../../../commons/redux/store';
import Loader from '../../shared/Loader/Loader';
import * as styles from './ClientDiscountPage.module.scss';
import ClientDiscountForm from '../../shared/Form/ClientDiscount/ClientDiscountForm';
import Button from '../../shared/Input/Button/Button';

export type Client = {
  clientId?: number;
  discount?: BigNumber;
};

function ClientDiscountPage() {
  const rootState = useAppSelector((state) => state);
  const globalDispatch = useAppDispatch();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleClose = () => {
    setIsModalVisible(false);
  };

  const getAllDiscountedClients = () => {
    axios
      .get('/api/client/discount/all')
      .then((res) => res.data)
      .then((res) => {
        globalDispatch({ type: 'set-clients', payload: { clients: res } });
        globalDispatch({ type: 'loading-stop' });
      })
      .catch((error: AxiosError) => {
        globalDispatch({ type: `error-${error.response?.status}` });
        globalDispatch({ type: 'loading-stop' });
      });
  };

  const handleFormSubmit = (values: Client) => {
    globalDispatch({ type: 'loading-start' });
    axios
      .post('/api/client/discount', {
        ...values,
      })
      .then(() => {
        getAllDiscountedClients();
        globalDispatch({ type: 'loading-stop' });
      })
      .catch((error: AxiosError) => {
        globalDispatch({ type: `error-${error.response?.status}` });
        globalDispatch({ type: 'loading-stop' });
      });
  };

  useEffect(() => {
    getAllDiscountedClients();
  }, []);

  if (rootState.client.isLoading) {
    return (
      <div className={styles['container']} data-testid="client-discount-page-loader">
        <Loader isLoading inline tip="Loading..." />
      </div>
    );
  }

  return (
    <div className={styles['container']} data-testid="client-discount-page">
      <Modal title="All clients" visible={isModalVisible} onOk={handleClose} onCancel={handleClose}>
        <Table
          dataSource={rootState.client.clients}
          columns={[
            {
              title: 'Client ID',
              dataIndex: 'clientId',
              key: 'clientId',
            },
            {
              title: 'Discounted price in € (euros)',
              dataIndex: 'discount',
              key: 'discount',
            },
          ]}
        />
      </Modal>
      <ClientDiscountForm handleSubmit={handleFormSubmit} />
      <Button type="ghost" onClick={showModal}>
        All clients
      </Button>
    </div>
  );
}

export default ClientDiscountPage;
