import React, { useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';
import { BigNumber } from 'bignumber.js';
import { Modal, Table } from 'antd';
import { useAppDispatch, useAppSelector } from '../../../commons/redux/store';
import Loader from '../../shared/Loader/Loader';
import * as styles from './MarketValueCalculatorPage.module.scss';
import CalculatorForm from '../../shared/Form/CalculatorForm/CalculatorForm';
import Success from '../../shared/Success/Success';
import Button from '../../shared/Input/Button/Button';

export type Client = {
  clientId?: number;
  discount?: BigNumber;
};

type Car = {
  key: number;
  price: number;
  url: string;
  description: string;
};

type SearchParameter = {
  yearFrom: number;
  yearTo: number;
  make: string;
  model: string;
};

export type MarketValueData = {
  averagePrice: number;
  searchParams: SearchParameter;
  carList: Car[];
};

function ClientDiscountPage() {
  const rootState = useAppSelector((state) => state);
  const globalDispatch = useAppDispatch();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [marketValueData, setMarketValueData] = useState<MarketValueData>();
  const [averagePrice, setAveragePrice] = useState<number>();
  const [selectedRowKeys, setSelectedRowKeys] = useState<number[]>();
  const [selectedRows, setSelectedRows] = useState<Car[]>();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleClose = () => {
    setIsModalVisible(false);
  };

  const getAllDiscountedClients = () => {
    axios
      .get('/api/car-value/call-data')
      .then((res) => res.data)
      .then(() => {
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
      .post('/api/car-value/call-data', {
        ...values,
      })
      .then((res) => {
        setMarketValueData(res.data);
        globalDispatch({ type: 'loading-stop' });
      })
      .catch((error: AxiosError) => {
        globalDispatch({ type: `error-${error.response?.status}` });
        globalDispatch({ type: 'loading-stop' });
      });
  };

  const calculatePrice = (rows: Car[]) => {
    let price = 0;
    // eslint-disable-next-line no-restricted-syntax
    for (const row of rows) {
      price += row.price;
    }
    // eslint-disable-next-line no-unsafe-optional-chaining
    return Math.round(price / rows.length);
  };

  useEffect(() => {
    if (selectedRows) {
      setAveragePrice(calculatePrice(selectedRows));
    }
  }, [selectedRows]);

  useEffect(() => {
    if (marketValueData) {
      setSelectedRowKeys(marketValueData.carList.map((value) => value.key));
      setSelectedRows(marketValueData.carList);
    }
  }, [marketValueData]);

  const rowSelection = {
    onChange: (keys: React.Key[], rows: Car[]) => {
      setSelectedRowKeys(keys.map((key) => +key));
      setSelectedRows(rows);
    },
    getCheckboxProps: (record: Car) => ({
      name: record.key.toString(),
    }),
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
      <Modal
        title="Vertės detalizacija"
        visible={isModalVisible}
        onOk={handleClose}
        onCancel={handleClose}
      >
        {averagePrice ? <h2>{`Vidutinė rinkos vertė: ${averagePrice}`}</h2> : null}
        <Table
          rowSelection={{
            selectedRowKeys,
            type: 'checkbox',
            ...rowSelection,
          }}
          dataSource={marketValueData?.carList}
          columns={[
            {
              title: 'Kaina',
              dataIndex: 'price',
              key: 'price',
            },
            {
              title: 'Aprašymas',
              dataIndex: 'description',
              key: 'description',
            },
            {
              title: 'Skelbimo nuoroda',
              dataIndex: 'url',
              key: 'url',
              render: (text) => (
                <a href={text} target="_blank" rel="noreferrer">
                  Skelbimas
                </a>
              ),
            },
          ]}
        />
      </Modal>
      {marketValueData ? (
        <>
          <Success data={marketValueData} />
          <Button type="primary" onClick={() => setMarketValueData(undefined)}>
            Skaičiuoti dar kartą
          </Button>
          <Button type="primary" onClick={showModal}>
            Vertės detalizacija
          </Button>
        </>
      ) : (
        <CalculatorForm handleSubmit={handleFormSubmit} />
      )}
    </div>
  );
}

export default ClientDiscountPage;
