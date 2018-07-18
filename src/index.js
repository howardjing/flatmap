import React from 'react';
import ReactDOM from 'react-dom';
import Double from './double';
import AddOne from './add-one';
import Ceiling from './ceiling';

ReactDOM.render(<Double />, document.querySelector('#double'));
ReactDOM.render(<AddOne />, document.querySelector('#add-one'));
ReactDOM.render(<Ceiling />, document.querySelector('#ceiling'));
