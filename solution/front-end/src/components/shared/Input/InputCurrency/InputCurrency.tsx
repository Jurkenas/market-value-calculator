import React from 'react';
import CurrencyInput, { CurrencyInputProps } from 'react-currency-input-field';
import * as styles from './InputCurrency.module.scss';

interface InputCurrencyProps extends CurrencyInputProps {
  isValid?: boolean;
}

function InputCurrency({ isValid, ...rest }: InputCurrencyProps) {
  const error = !isValid ? styles['error'] : '';

  return (
    <span className={error}>
      <CurrencyInput className="ant-input" {...rest} />
    </span>
  );
}

export default InputCurrency;
