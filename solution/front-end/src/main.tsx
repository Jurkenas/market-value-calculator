import React from 'react';
import ReactDOM from 'react-dom';
import routing from './routing';

const root = <React.StrictMode>{routing}</React.StrictMode>;

// eslint-disable-next-line no-undef
ReactDOM.render(root, document.getElementById('root'));
