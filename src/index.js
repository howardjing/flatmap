import React from 'react';
import ReactDOM from 'react-dom';
import Double from './double';

const AddOne = () =>
  <div>ADDDONNN</div>

ReactDOM.render(<Double />, document.querySelector('#double'));
ReactDOM.render(<AddOne />, document.querySelector('#add-one'));
