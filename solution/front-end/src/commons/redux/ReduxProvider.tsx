import React from 'react';
import { Provider, ProviderProps } from 'react-redux';

interface ReduxProviderProps extends ProviderProps {
  children?: React.ReactNode;
}

function ReduxProvider({ children, ...rest }: ReduxProviderProps) {
  return <Provider {...rest}>{children}</Provider>;
}

export default ReduxProvider;
