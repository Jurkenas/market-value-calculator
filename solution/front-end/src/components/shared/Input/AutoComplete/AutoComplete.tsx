import React from 'react';
import { AutoComplete } from 'antd';

const options = [
  { value: 'Burns Bay Road' },
  { value: 'Downing Street' },
  { value: 'Wall Street' },
];

function InputAutoComplete({ ...rest }) {
  console.log('input');
  return (
    <AutoComplete
      style={{ width: '100%' }}
      options={options}
      filterOption={(inputValue, option) =>
        option!.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
      {...rest}
    />
  );
}

export default InputAutoComplete;
