export interface HttpReducerState {
    title: string;
    message: string;
}

export type CLEAR_ERROR = {
    type: 'clear-error';
};

export type CUSTOM_ERROR = {
    type: 'custom-error';
    payload: { title: string; message: string };
};

export type ERROR_400 = {
    type: 'error-400';
    payload: { message: string };
};

export type ERROR_404 = {
    type: 'error-404';
    payload: { message: string };
};

export type ERROR_500 = {
    type: 'error-500';
    payload: { message: string };
};

export type HttpReducerAction = CLEAR_ERROR | CUSTOM_ERROR | ERROR_400 | ERROR_404 | ERROR_500;
