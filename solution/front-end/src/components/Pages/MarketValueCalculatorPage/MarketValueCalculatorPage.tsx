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

// const mockResponse: MarketValueData = {
//   carList: [
//     {
//       price: 3499,
//       url: 'https://autogidas.lt//skelbimas/bmw-530-d-dizel--2004-m-0135225425.html',
//       description:
//         '3.0 l., Dyzelinas, 2004 m, Automatinė, 160 kW, 311 000 km., Sedanas, Estija, Talinas',
//     },
//     {
//       price: 2500,
//       url: 'https://autogidas.lt//skelbimas/bmw-530-e39-dyzelinas--2002-m-0135217103.html',
//       description:
//         '3.0 l., Dyzelinas, 2002 m, Automatinė, 142 kW, 293 000 km., Universalas, Vilnius',
//     },
//     {
//       price: 3000,
//       url: 'https://autogidas.lt//skelbimas/bmw-530-e60-dyzelinas--2005-m-0135216152.html',
//       description: '3.0 l., Dyzelinas, 2005 m, Automatinė, 160 kW, Universalas, Tauragė',
//     },
//     {
//       price: 3500,
//       url: 'https://autogidas.lt//skelbimas/bmw-530-dyzelinas--2004-m-sedanas-0135214451.html',
//       description: '3.0 l., Dyzelinas, 2004 m, Automatinė, 160 kW, Sedanas, Šiauliai',
//     },
//     {
//       price: 4250,
//       url: 'https://autogidas.lt//skelbimas/bmw-530-dyzelinas--2005-m-universalas-0135211292.html',
//       description:
//         '3.0 l., Dyzelinas, 2005 m, Automatinė, 160 kW, 300 000 km., Universalas, Vilnius',
//     },
//     {
//       price: 5300,
//       url: 'https://autogidas.lt//skelbimas/bmw-530-dyzelinas--2007-m-universalas-0135226952.html',
//       description:
//         '3.0 l., Dyzelinas, 2007 m, Automatinė, 170 kW, 385 000 km., Universalas, Klaipėda',
//     },
//     {
//       price: 0,
//       url: 'https://autogidas.lt//skelbimas/bmw-530-e39-dyzelinas--2001-m-0135222353.html',
//       description: '3.0 l., Dyzelinas, 2001 m, Automatinė, 142 kW, 345 000 km., Sedanas, Alytus',
//     },
//     {
//       price: 0,
//       url: 'https://autogidas.lt//skelbimas/bmw-530-e39-dyzelinas--2000-m-0135181241.html',
//       description: '3.0 l., Dyzelinas, 2000 m, Automatinė, 135 kW, Sedanas, Klaipėda',
//     },
//     {
//       price: 0,
//       url: 'https://autogidas.lt//skelbimas/bmw-530-e39-dyzelinas--2000-m-0135217046.html',
//       description: '3.0 l., Dyzelinas, 2000 m, Automatinė, Sedanas, Utena',
//     },
//     {
//       price: 3000,
//       url: 'https://autogidas.lt//skelbimas/bmw-530-e60-d-dyzelinas--2003-m-0135221375.html',
//       description: '3.0 l., Dyzelinas, 2003 m, Mechaninė, 160 kW, Sedanas, Šiauliai',
//     },
//     {
//       price: 3000,
//       url: 'https://autogidas.lt//skelbimas/bmw-530-e60-dyzelinas--2003-m-0135220052.html',
//       description: '3.0 l., Dyzelinas, 2003 m, Mechaninė, 160 kW, Sedanas, Klaipėda',
//     },
//     {
//       price: 0,
//       url: 'https://autogidas.lt//skelbimas/bmw-530-e60-dyzelinas--2005-m-0135212150.html',
//       description: '3.0 l., Dyzelinas, 2005 m, Automatinė, 160 kW, Universalas, Joniškis',
//     },
//     {
//       price: 3500,
//       url: 'https://autogidas.lt//skelbimas/bmw-530-e60-dyzelinas--2004-m-0135231569.html',
//       description: '3.0 l., Dyzelinas, 2004 m, Automatinė, 160 kW, Sedanas, Šiauliai',
//     },
//     {
//       price: 4150,
//       url: 'https://autogidas.lt//skelbimas/bmw-530-e60-dyzelinas--2005-m-0135209159.html',
//       description:
//         '3.0 l., Dyzelinas, 2005 m, Automatinė, 160 kW, 332 500 km., Universalas, Klaipėda',
//     },
//     {
//       price: 4350,
//       url: 'https://autogidas.lt//skelbimas/bmw-530-dyzelinas--2004-m-universalas-0135229706.html',
//       description:
//         '3.0 l., Dyzelinas, 2004 m, Automatinė, 190 kW, 305 000 km., Universalas, Kaunas',
//     },
//     {
//       price: 5900,
//       url: 'https://autogidas.lt//skelbimas/bmw-530-benzinas--2004-m-sedanas-0135160370.html',
//       description:
//         '3.0 l., Benzinas, 2004 m, Mechaninė, 200 kW, 380 000 km., Vairas dešinėje, Sedanas, Latvija, Liepoja',
//     },
//     {
//       price: 0,
//       url: 'https://autogidas.lt//skelbimas/bmw-530-dyzelinas--2003-m-universalas-0135224438.html',
//       description: '3.0 l., Dyzelinas, 2003 m, Automatinė, Universalas, Panevėžys',
//     },
//     {
//       price: 1000,
//       url: 'https://autogidas.lt//skelbimas/bmw-530-dyzelinas--2002-m-sedanas-0135221156.html',
//       description: '3.0 l., Dyzelinas, 2002 m, Mechaninė, 142 kW, Sedanas, Klaipėda',
//     },
//     {
//       price: 0,
//       url: 'https://autogidas.lt//skelbimas/bmw-530-dyzelinas--2000-m-sedanas-0135225230.html',
//       description: '3.0 l., Dyzelinas, 2000 m, Mechaninė, 135 kW, Sedanas, Šalčininkai',
//     },
//     {
//       price: 4000,
//       url: 'https://autogidas.lt//skelbimas/bmw-530-e60-dyzelinas--2004-m-0135228365.html',
//       description: '3.0 l., Dyzelinas, 2004 m, Mechaninė, 160 kW, 375 794 km., Universalas, Alytus',
//     },
//     {
//       price: 6500,
//       url: 'https://autogidas.lt//skelbimas/bmw-530-dyzelinas--2007-m-sedanas-0135223415.html',
//       description: '3.0 l., Dyzelinas, 2007 m, Automatinė, 173 kW, Sedanas, Vilnius',
//     },
//     {
//       price: 780,
//       url: 'https://autogidas.lt//skelbimas/bmw-530-dyzelinas--2000-m-universalas-0135148541.html',
//       description: '3.0 l., Dyzelinas, 2000 m, Automatinė, 135 kW, Universalas, Mažeikiai',
//     },
//     {
//       price: 930,
//       url: 'https://autogidas.lt//skelbimas/bmw-530-e39-dyzelinas--2000-m-0135207875.html',
//       description: '3.0 l., Dyzelinas, 2000 m, Mechaninė, Sedanas, Šiauliai',
//     },
//     {
//       price: 0,
//       url: 'https://autogidas.lt//skelbimas/bmw-530-e39-dyzelinas--2000-m-0135215681.html',
//       description: '3.0 l., Dyzelinas, 2000 m, Mechaninė, Universalas, Kaunas',
//     },
//     {
//       price: 990,
//       url: 'https://autogidas.lt//skelbimas/bmw-530-dyzelinas--2000-m-universalas-0135150509.html',
//       description: '3.0 l., Dyzelinas, 2000 m, Automatinė, 503 744 km., Universalas, Panevėžys',
//     },
//     {
//       price: 998,
//       url: 'https://autogidas.lt//skelbimas/bmw-530-e39-dyzelinas--2001-m-0135038792.html',
//       description:
//         '3.0 l., Dyzelinas, 2001 m, Mechaninė, 142 kW, 350 000 km., Universalas, Klaipėda',
//     },
//     {
//       price: 1050,
//       url: 'https://autogidas.lt//skelbimas/bmw-530-e39-dyzelinas--2001-m-0135214841.html',
//       description: '3.0 l., Dyzelinas, 2001 m, Mechaninė, 142 kW, Universalas, Kelmė',
//     },
//     {
//       price: 1050,
//       url: 'https://autogidas.lt//skelbimas/bmw-530-dyzelinas--2003-m-universalas-0135204263.html',
//       description: '3.0 l., Dyzelinas, 2003 m, Mechaninė, 142 kW, Universalas, Jonava',
//     },
//     {
//       price: 1099,
//       url: 'https://autogidas.lt//skelbimas/bmw-530-e39-dizel--2001-m-0135170030.html',
//       description: '3.0 l., Dyzelinas, 2001 m, Automatinė, 142 kW, 374 000 km., Sedanas, Vilnius',
//     },
//     {
//       price: 1150,
//       url: 'https://autogidas.lt//skelbimas/bmw-530-e39-dyzelinas--2000-m-0135137987.html',
//       description: '3.0 l., Dyzelinas, 2000 m, Automatinė, 135 kW, Universalas, Ignalina',
//     },
//   ],
//   averagePrice: 2847.65,
//   searchParams: {
//     yearFrom: 2000,
//     yearTo: 2007,
//     make: 'BMW',
//     model: '530',
//   },
// };

function ClientDiscountPage() {
  const rootState = useAppSelector((state) => state);
  const globalDispatch = useAppDispatch();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [marketValueData, setMarketValueData] = useState<MarketValueData>();
  const [selectedRowKeys, setSelectedRowKeys] = useState<Car[]>();
  // const [marketValueData, setMarketValueData] = useState<MarketValueData>(mockResponse);
  // const [selectedRowKeys, setSelectedRowKeys] = useState<Car[]>(mockResponse.carList);

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

  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: Car[]) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
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
        <Table
          rowSelection={{
            type: 'checkbox',
            ...rowSelection,
          }}
          // eslint-disable-next-line no-param-reassign
          // eslint-disable-next-line no-return-assign
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
