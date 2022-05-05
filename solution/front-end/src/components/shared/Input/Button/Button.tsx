import React from 'react';
import { Button as AntButton, ButtonProps } from 'antd';

function Button(props: ButtonProps) {
  return <AntButton {...props} />;
}

export default Button;
