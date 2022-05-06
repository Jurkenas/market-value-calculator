import React from 'react';
import { AutoComplete, AutoCompleteProps } from 'antd';

function InputAutoComplete(props: AutoCompleteProps) {
  return <AutoComplete style={{ width: '100%' }} {...props} />;
}

export default InputAutoComplete;
