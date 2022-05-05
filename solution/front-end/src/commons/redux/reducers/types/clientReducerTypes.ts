import BigNumber from 'bignumber.js';
import { Client } from '../../../../components/Pages/ClientDiscountPage/ClientDiscountPage';

export interface ClientReducerState {
  clientId?: number;
  discount?: BigNumber;
  isLoading: boolean;
  clients: Client[];
}

export type LOADING_START = {
  type: 'loading-start';
};

export type LOADING_STOP = {
  type: 'loading-stop';
};

export type SET_DISCOUNT = {
  type: 'set-discount';
  payload: { clientId: number; discount: BigNumber };
};

export type SET_CLIENTS = {
  type: 'set-clients';
  payload: { clients: Client[] };
};

export type ClientReducerAction = LOADING_START | LOADING_STOP | SET_DISCOUNT | SET_CLIENTS;
