import React, { useState, useEffect } from 'react';
import { Input as AntInput, InputProps } from 'antd';

interface InputNumberProps extends InputProps {
  // eslint-disable-next-line no-unused-vars
  onValueChange: (value?: number) => void;
}

function InputNumber({ onValueChange, ...rest }: InputNumberProps) {
  const [inputValue, setInputValue] = useState<string>('');

  useEffect(() => {
    if (inputValue) {
      if (inputValue === '') {
        onValueChange(undefined);
      } else {
        onValueChange(+inputValue);
      }
    }
  }, [inputValue]);

  return (
    <AntInput
      value={inputValue}
      autoComplete="off"
      onChange={(event) => {
        const numberRegexp = /^[0-9]+$/;
        if (event.target.value === '' || numberRegexp.test(event.target.value)) {
          setInputValue(event.target.value);
        }
      }}
      {...rest}
    />
  );
}

export default InputNumber;
