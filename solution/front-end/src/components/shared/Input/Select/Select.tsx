import React from 'react';
import { Select as AntSelect, SelectProps as AntSelectProps } from 'antd';

export type OptionItem = {
  value: string | number;
  label: string | number;
};

interface SelectProps extends AntSelectProps {
  options?: OptionItem[];
}

function Select({ options = [], ...rest }: SelectProps) {
  const { Option } = AntSelect;
  return (
    <AntSelect {...rest}>
      {options.map((option) => (
        <Option value={option.value} key={option.value}>
          {option.label}
        </Option>
      ))}
    </AntSelect>
  );
}

export default Select;
