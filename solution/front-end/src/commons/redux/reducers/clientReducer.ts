import { ClientReducerAction, ClientReducerState } from './types/clientReducerTypes';

export const defaultState: ClientReducerState = {
  clientId: undefined,
  discount: undefined,
  isLoading: true,
  clients: [],
};

// eslint-disable-next-line default-param-last
export const clientReducer = (
  state = defaultState,
  action: ClientReducerAction
): ClientReducerState => {
  switch (action.type) {
    case 'loading-start': {
      return {
        ...state,
        isLoading: true,
      };
    }

    case 'loading-stop': {
      return {
        ...state,
        isLoading: false,
      };
    }

    case 'set-discount': {
      return {
        ...state,
        clientId: action.payload.clientId,
        discount: action.payload.discount,
      };
    }

    case 'set-clients': {
      return {
        ...state,
        clients: action.payload.clients,
      };
    }

    default:
      return {
        ...state,
      };
  }
};
