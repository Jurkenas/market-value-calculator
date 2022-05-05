import { HttpReducerAction, HttpReducerState } from './types/httpReducerTypes';

export const defaultState: HttpReducerState = {
  title: '',
  message: '',
};

// eslint-disable-next-line default-param-last
export const httpReducer = (state = defaultState, action: HttpReducerAction): HttpReducerState => {
  switch (action.type) {
    case 'clear-error': {
      return {
        ...state,
        title: '',
        message: '',
      };
    }

    case 'custom-error': {
      return {
        ...state,
        title: action.payload.title,
        message: action.payload.message,
      };
    }

    case 'error-400': {
      return {
        ...state,
        title: 'Error 400',
        message: 'Bad request',
      };
    }

    case 'error-404': {
      return {
        ...state,
        title: 'Error 404',
        message: 'Not found',
      };
    }

    case 'error-500': {
      return {
        ...state,
        title: 'Error 500',
        message: 'Server error',
      };
    }

    default:
      return {
        ...state,
      };
  }
};
